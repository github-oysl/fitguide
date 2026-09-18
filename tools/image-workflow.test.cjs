// 检查真实文档的反例变更能否被拒绝；不调用生图、不读取实拍、不依赖系统日期。
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {parseVariants, validateAction, validateRepository} = require('./verify-image-workflow.cjs');
const root = path.resolve(__dirname, '..');
const dir = path.join(root, 'docs/equipment-review/action-prompts');
const catalog = JSON.parse(fs.readFileSync(path.join(dir, '_catalog.json'), 'utf8'));

// 从公开文档读取独立副本，修改测试输入不会改动工作区。
function fixture(id = 'cable-row-seated-narrow-grip') {
  return {text: fs.readFileSync(path.join(dir, id + '.md'), 'utf8'), entry: structuredClone(catalog.actions.find(a => a.action_id === id))};
}

// 确认每个故意注入的错误被对应检查拒绝，而不是依赖无关失败。
function rejects(f, pattern) {
  const errors = validateAction(f.text, f.entry);
  assert.ok(errors.some(e => pattern.test(e)), errors.join('\n') || '错误输入意外通过');
}

test('全量公开文档通过，动作与变式数量从目录计算', () => {
  const result = validateRepository(root);
  assert.deepEqual(result.errors, []);
  assert.equal(result.actions, catalog.actions.length);
  assert.equal(result.variants, catalog.actions.flatMap(a => a.variants).length);
});

test('没有原始照片的检出仍能校验', t => {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'fitguide-image-docs-'));
  t.after(() => fs.rmSync(temp, {recursive: true, force: true}));
  fs.cpSync(path.join(root, 'docs'), path.join(temp, 'docs'), {
    recursive: true,
    filter: source => fs.statSync(source).isDirectory() || /\.(md|json)$/.test(source)
  });
  for (const file of ['data.js', 'extra-data.js']) fs.copyFileSync(path.join(root, file), path.join(temp, file));
  assert.equal(fs.existsSync(path.join(temp, '健身房器械图片')), false);
  assert.deepEqual(validateRepository(temp).errors, []);
});

test('旧版本、未展开块和禁止文字规则不能回流', () => {
  for (const [replace, pattern] of [
    [s => s.replace('- 提示词版本：2', '- 提示词版本：1'), /必须声明v2/],
    [s => s.replace('```text\n', '```text\n<公共约束全文>。'), /占位符/],
    [s => s.replace('```text\n', '```text\n附上实拍：。'), /实拍输入为空/],
    [s => s.replace('```text\n', '```text\n禁止任何图内文字。'), /禁止全部文字/],
    [s => s.replace('```text\n', '```text\n使用正确01锚点。'), /残留旧版/]
  ]) {
    const f = fixture(); f.text = replace(f.text); rejects(f, pattern);
  }
});

test('分机型证据表不能遗漏或串用其他工位', () => {
  const f = fixture('leg-press');
  const variants = f.entry.variants;
  assert.ok(variants.length > 1);
  f.text = f.text.replace('### 证据配置 · ' + variants[1].variant_id, '### 证据配置 · absent');
  rejects(f, /缺少本配置证据项/);
  const g = fixture('leg-press');
  g.text = g.text.replace('| 工位键 | ' + variants[1].station_key + ' |', '| 工位键 | ' + variants[0].station_key + ' |');
  rejects(g, /证据表工位键与目录不一致/);
});

test('配置不能缺角色、重复角色或将错误编号跳号', () => {
  for (const [replacement, pattern] of [['#### force ·', /重复角色/], ['#### missing ·', /缺少角色：start/]]) {
    const f = fixture(); f.text = f.text.replace('#### start ·', replacement); rejects(f, pattern);
  }
  const f = fixture(); f.text = f.text.replace('#### error-02 ·', '#### error-03 ·'); rejects(f, /编号必须连续/);
});

test('阶段重复和图文口令漂移均被拒绝', () => {
  const f = fixture();
  const cards = parseVariants(f.text)[0].cards;
  const force = cards.find(c => c.role === 'force').body.match(/^阶段事实：(.+)$/m)[1];
  const start = cards.find(c => c.role === 'start').body.match(/^阶段事实：(.+)$/m)[1];
  f.text = f.text.replaceAll(start, force); rejects(f, /正确阶段完全重复/);
  const g = fixture(); g.text = g.text.replace(/^页面配文：.+$/m, '页面配文：不匹配的口令'); rejects(g, /口令与页面文案不一致/);
});

test('阻塞配置的任一提示词缺执行门槛不能通过', () => {
  const f = fixture('lat-pulldown-with-pronated-grip');
  assert.equal(f.entry.variants[0].evidence_status, 'blocked-evidence');
  f.text = f.text.replace('执行门槛：blocked-evidence，当前不可调用', '可以直接生成');
  rejects(f, /缺少明确禁止调用门槛/);
});

test('自重的空机可不适用，未知专机不能借此跳过', () => {
  assert.deepEqual(validateAction(fixture('plank').text, fixture('plank').entry), []);
  const f = fixture('lateral-raise-machine');
  f.entry.variants[0].roles.find(r => r.role === 'equipment').status = 'not-applicable';
  rejects(f, /只有无器械的equipment可以不适用/);
});

test('参考照片不能只列在文件表格却从实际提示词中漏掉', () => {
  const f = fixture(); const photo = f.entry.variants[0].photos[0].path;
  f.text = f.text.replace(/```text\n([\s\S]*?)```/, block => block.replaceAll(photo, '缺失照片'));
  rejects(f, /未附配置所需实拍/);
});

test('图片状态和角色状态不能冒充已完成', () => {
  const f = fixture(); f.entry.image_status = 'complete'; rejects(f, /不能冒充已生成/);
  const g = fixture(); g.entry.variants[0].roles[0].status = 'complete'; rejects(g, /不能假定图片已完成/);
});
