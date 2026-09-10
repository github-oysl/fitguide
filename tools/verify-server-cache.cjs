// 校验 server.mjs 的传输层优化：压缩协商、条件请求（304）、缓存头、Range 语义。
// 直接在进程内用模拟的 req/res 调用请求处理函数，不依赖网络与浏览器。
// 运行：node tools/verify-server-cache.cjs
const assert = require('node:assert/strict');
const {Writable} = require('node:stream');
const {gunzipSync, brotliDecompressSync} = require('node:zlib');
const path = require('node:path');
const fs = require('node:fs');
const {pathToFileURL} = require('node:url');

const ROOT = path.resolve(__dirname, '..');

function request(handler, {method = 'GET', url = '/', headers = {}} = {}) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    const res = new Writable({
      write(chunk, _enc, cb) { chunks.push(chunk); cb(); }
    });
    const state = {status: 0, headers: null, destroyed: false, headersSent: false};
    res.writeHead = (status, h) => { state.status = status; state.headers = h; state.headersSent = true; return res; };
    res.destroy = () => { state.destroyed = true; chunks.length = 0; return res; };
    Object.defineProperty(res, 'destroyed', {get: () => state.destroyed});
    Object.defineProperty(res, 'headersSent', {get: () => state.headersSent});
    res.on('finish', () => resolve({status: state.status, headers: state.headers, body: Buffer.concat(chunks)}));
    res.on('error', reject);
    handler({method, url, headers}, res).catch(reject);
  });
}

function decode(res) {
  const enc = res.headers['Content-Encoding'];
  if (enc === 'gzip') return gunzipSync(res.body);
  if (enc === 'br') return brotliDecompressSync(res.body);
  return res.body;
}

(async () => {
  const {createApp} = await import(pathToFileURL(path.join(ROOT, 'server.mjs')).href);
  const handler = createApp().listeners('request')[0];
  const checks = [];
  const check = (name, fn) => checks.push([name, fn]);

  const style = fs.readFileSync(path.join(ROOT, 'style.css'));

  check('br 优先于 gzip，且解码后与源文件一致', async () => {
    const res = await request(handler, {url: '/style.css', headers: {'accept-encoding': 'gzip, deflate, br'}});
    assert.equal(res.status, 200);
    assert.equal(res.headers['Content-Encoding'], 'br');
    assert.equal(res.headers['Vary'], 'Accept-Encoding');
    assert.equal(Number(res.headers['Content-Length']), res.body.length);
    assert.ok(decode(res).equals(style));
  });

  check('仅支持 gzip 时回退 gzip', async () => {
    const res = await request(handler, {url: '/style.css', headers: {'accept-encoding': 'gzip'}});
    assert.equal(res.headers['Content-Encoding'], 'gzip');
    assert.ok(decode(res).equals(style));
  });

  check('q=0 视为拒绝压缩', async () => {
    const res = await request(handler, {url: '/style.css', headers: {'accept-encoding': 'gzip;q=0, br;q=0'}});
    assert.equal(res.headers['Content-Encoding'], undefined);
    assert.ok(res.body.equals(style));
  });

  check('客户端不支持压缩时原样返回', async () => {
    const res = await request(handler, {url: '/style.css'});
    assert.equal(res.headers['Content-Encoding'], undefined);
    assert.equal(Number(res.headers['Content-Length']), style.length);
  });

  check('压缩后实际传输字节显著小于原文', async () => {
    const res = await request(handler, {url: '/style.css', headers: {'accept-encoding': 'br,gzip'}});
    assert.ok(res.body.length < style.length * 0.35, `${res.body.length} vs ${style.length}`);
  });

  check('全部文本资源可压缩且内容无损', async () => {
    const files = ['index.html', 'style.css', 'teachers-day.css', 'plans.js', 'guide.js', 'dashboard.js', 'data.js', 'extra-data.js', 'activity-data.js', 'checkin-stats.js', 'training.js', 'free-activity.js', 'teachers-day.js', 'comparison/comparison.css'];
    for (const f of files) {
      const res = await request(handler, {url: `/${f}`, headers: {'accept-encoding': 'br,gzip'}});
      assert.equal(res.status, 200, f);
      assert.ok(decode(res).equals(fs.readFileSync(path.join(ROOT, f))), f);
    }
  });

  check('图片与视频不压缩，直接给强缓存', async () => {
    for (const f of ['assets/leg-press.jpg', 'assets/leg-press.mp4']) {
      const res = await request(handler, {url: `/${f}`, headers: {'accept-encoding': 'br,gzip'}});
      assert.equal(res.headers['Content-Encoding'], undefined, f);
      assert.match(res.headers['Cache-Control'], /max-age=604800/, f);
      assert.equal(Number(res.headers['Content-Length']), fs.statSync(path.join(ROOT, f)).size, f);
    }
  });

  check('文本资源带 no-cache 与 ETag/Last-Modified', async () => {
    const res = await request(handler, {url: '/plans.js', headers: {'accept-encoding': 'gzip'}});
    assert.equal(res.headers['Cache-Control'], 'no-cache');
    assert.match(res.headers['ETag'], /^W\//);
    assert.ok(!Number.isNaN(Date.parse(res.headers['Last-Modified'])));
  });

  check('If-None-Match 命中返回 304 且无正文', async () => {
    const first = await request(handler, {url: '/plans.js', headers: {'accept-encoding': 'gzip'}});
    const second = await request(handler, {url: '/plans.js', headers: {'accept-encoding': 'gzip', 'if-none-match': first.headers['ETag']}});
    assert.equal(second.status, 304);
    assert.equal(second.body.length, 0);
  });

  check('If-None-Match 支持多值与 * ', async () => {
    const first = await request(handler, {url: '/plans.js', headers: {'accept-encoding': 'gzip'}});
    const multi = await request(handler, {url: '/plans.js', headers: {'if-none-match': `W/"deadbeef", ${first.headers['ETag']}`}});
    assert.equal(multi.status, 304);
    const star = await request(handler, {url: '/plans.js', headers: {'if-none-match': '*'}});
    assert.equal(star.status, 304);
  });

  check('ETag 变化（文件被改动）后不再回 304', async () => {
    const first = await request(handler, {url: '/index.html', headers: {'accept-encoding': 'gzip'}});
    const stale = await request(handler, {url: '/index.html', headers: {'accept-encoding': 'gzip', 'if-none-match': 'W/"1-1"'}});
    assert.equal(stale.status, 200);
    assert.notEqual(first.headers['ETag'], 'W/"1-1"');
  });

  check('If-Modified-Since 等价于未修改时返回 304', async () => {
    const first = await request(handler, {url: '/data.js', headers: {'accept-encoding': 'gzip'}});
    const res = await request(handler, {url: '/data.js', headers: {'if-modified-since': first.headers['Last-Modified']}});
    assert.equal(res.status, 304);
  });

  check('媒体文件同样支持条件请求', async () => {
    const first = await request(handler, {url: '/assets/leg-press.jpg'});
    const res = await request(handler, {url: '/assets/leg-press.jpg', headers: {'if-none-match': first.headers['ETag']}});
    assert.equal(res.status, 304);
    assert.equal(res.body.length, 0);
  });

  check('Range 请求返回 206 且不做压缩', async () => {
    const target = 'assets/leg-press.mp4';
    const size = fs.statSync(path.join(ROOT, target)).size;
    const res = await request(handler, {url: `/${target}`, headers: {range: 'bytes=0-99', 'accept-encoding': 'br,gzip'}});
    assert.equal(res.status, 206);
    assert.equal(res.headers['Content-Encoding'], undefined);
    assert.equal(res.headers['Content-Range'], `bytes 0-99/${size}`);
    assert.equal(res.body.length, 100);
  });

  check('HEAD 返回头部但不含正文', async () => {
    const res = await request(handler, {method: 'HEAD', url: '/style.css', headers: {'accept-encoding': 'br,gzip'}});
    assert.equal(res.status, 200);
    assert.equal(res.headers['Content-Encoding'], 'br');
    assert.equal(res.body.length, 0);
    assert.ok(Number(res.headers['Content-Length']) > 0);
  });

  check('安全性未被破坏：越权路径仍 404', async () => {
    for (const bad of ['/../server.mjs', '/%2e%2e/server.mjs', '/.gitignore', '/package.json', '/docs/24-exercises.md']) {
      const res = await request(handler, {url: bad});
      assert.equal(res.status, 404, bad);
    }
  });

  check('非法方法与非法 Range 仍被拒绝', async () => {
    assert.equal((await request(handler, {method: 'POST', url: '/index.html'})).status, 405);
    assert.equal((await request(handler, {url: '/assets/leg-press.mp4', headers: {range: 'bytes=999999-'}})).status, 416);
  });

  let passed = 0, failed = 0;
  for (const [name, fn] of checks) {
    try { await fn(); console.log(`  ✓ ${name}`); passed++; }
    catch (error) { console.error(`  ✗ ${name}\n    ${error.message}`); failed++; }
  }
  console.log(`\n传输层校验：${passed} 通过 / ${failed} 失败`);
  process.exit(failed ? 1 : 0);
})();
