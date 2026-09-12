// 校验全量v2文档与队列契约；不读取被忽略媒体，也不认证动作或生成图片。
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const relativeDir = 'docs/equipment-review/action-prompts';
const requiredDocs = [
  'docs/image-generation-workflow.md', 'docs/image-generation-prompts.md',
  'docs/image-generation-notes.md', 'docs/image-generation-plan.md',
  'docs/image-generation-audit.md', `${relativeDir}/_TEMPLATE.md`, `${relativeDir}/README.md`
];
const knownRoles = /^(force|equipment|start|end|muscles|error-\d{2})$/;
const obsolete = /正确\s*0?1(?:锚点|[，、。]|图)|(?:禁止|不得|不要)[^。\n]{0,25}(?:任何|一切|所有)?(?:图内|图片内|图中)?文字[^。\n]*(?:箭头|红叉)|禁止任何图中文字/;
const placeholder = /<[^>\n]+>|\{\{[^}]+\}\}|\$\{|<公共|公共约束全文|同上|待填写|TODO|TBD/;

// 提取配置和角色，保持每个角色只属于它自己的变式。
function parseVariants(text) {
  const section = text.split('## 三、图片提示词\n')[1]?.split('## 四、')[0] || '';
  return [...section.matchAll(/^### 配置 · ([a-z0-9-]+)\s*\n([\s\S]*?)(?=^### 配置 · |$(?![\s\S]))/gm)].map(([, id, body]) => ({
    id, body,
    cards: [...body.matchAll(/^#### ([a-z0-9-]+) · ([^\n]+)\n([\s\S]*?)(?=^#### |$(?![\s\S]))/gm)].map(([, role, title, body]) => ({role, title, body}))
  }));
}

// 对单个动作执行纯文本检查，供命令行和隔离的回归用例共用。
function validateAction(text, entry) {
  const errors = [];
  const fail = message => errors.push(`${entry.action_id}: ${message}`);
  if (!/^- 提示词版本：2\s*$/m.test(text)) fail('必须声明v2，旧稿不再放行');
  for (const field of ['动作 ID', '器械 ID', '工位 / 变式', '适配状态', '提示词状态', '图片状态', '现有数据', '资料核对日期']) {
    if (!new RegExp('^- ' + field + '：.+$', 'm').test(text)) fail('缺少字段：' + field);
  }
  if (!text.includes('- 动作 ID：`' + entry.action_id + '`')) fail('动作ID与文件名不一致');
  const isBlocked = entry.variants.some(v => v.evidence_status === 'blocked-evidence');
  if (!text.includes('- 适配状态：' + (isBlocked ? 'blocked-evidence' : 'ready') + '\n')) fail('文件证据状态与配置汇总不一致');
  if (entry.prompt_status !== 'migrated-v2') fail('目录提示词状态不是migrated-v2');
  const imageLabels = {unproduced: '未生成', 'historical-unreviewed': '历史样图待复核；本轮未生成'};
  if (!imageLabels[entry.image_status] || !text.includes('- 图片状态：' + imageLabels[entry.image_status] + '\n')) fail('当前图片状态不一致，不能冒充已生成/complete');
  if (!text.includes('- 现有数据：' + (entry.data_source ? '`' + entry.data_source + '`' : '建议新增') + '\n')) fail('数据归属与目录不一致');
  for (const label of ['主照片', '补充照片', '外形不变量', '人与器械关系', '机械关系', '附件与模式', '不确定项', '相机', '同组固定条件', '示范侧 / 镜像', '复用范围']) {
    if (!text.includes('| ' + label + ' |')) fail('缺少证据项：' + label);
  }
  const variants = parseVariants(text);
  const evidenceSection = text.split('## 二、器械与空间约束\n')[1]?.split('## 三、图片提示词')[0] || '';
  const evidence = [...evidenceSection.matchAll(/^### 证据配置 · ([a-z0-9-]+)\s*\n([\s\S]*?)(?=^### 证据配置 · |$(?![\s\S]))/gm)];
  if (evidence.length !== entry.variants.length || new Set(evidence.map(m => m[1])).size !== evidence.length) fail('证据表必须按配置唯一建档');
  const ids = variants.map(v => v.id);
  if (new Set(ids).size !== ids.length) fail('重复配置');
  if (ids.length !== entry.variants.length || ids.some(id => !entry.variants.some(v => v.variant_id === id))) fail('文档配置与目录不一致');
  for (const expected of entry.variants) {
    const v = variants.find(v => v.id === expected.variant_id);
    if (!v) { fail('缺少配置：' + expected.variant_id); continue; }
    const vf = message => fail(v.id + ' / ' + message);
    const proof = evidence.find(m => m[1] === expected.variant_id)?.[2] || '';
    for (const label of ['主照片', '补充照片', '外形不变量', '人与器械关系', '机械关系', '附件与模式', '不确定项', '相机', '同组固定条件', '示范侧 / 镜像', '复用范围']) {
      if (!proof.includes('| ' + label + ' |')) vf('缺少本配置证据项：' + label);
    }
    for (const [label, value] of [['工位键', expected.station_key], ['证据状态', expected.evidence_status]]) {
      if (!proof.includes('| ' + label + ' | ' + value + ' |')) vf('证据表' + label + '与目录不一致');
    }
    for (const photo of expected.photos) if (!proof.includes(photo.path)) vf('证据表未列来源照片：' + photo.photo);
    if (!['ready', 'blocked-evidence'].includes(expected.evidence_status)) vf('非法证据状态');
    if (!['dynamic', 'static', 'cyclic'].includes(expected.mode)) vf('非法阶段类型');
    if (!expected.gap || expected.gap.length < 8) vf('缺少具体证据边界');
    for (const [label, value] of [['工位键', expected.station_key], ['证据状态', expected.evidence_status], ['阶段类型', expected.mode]]) {
      if (!v.body.includes('- ' + label + '：' + value + '\n')) vf(label + '与目录不一致');
    }
    const roles = v.cards.map(c => c.role);
    if (roles[0] !== 'force') vf('必须先定义force');
    if (new Set(roles).size !== roles.length) vf('重复角色');
    for (const r of ['force', 'equipment', 'start', 'end', 'muscles']) if (!roles.includes(r)) vf('缺少角色：' + r);
    if (!roles.some(r => /^error-\d{2}$/.test(r))) vf('缺少单一错误图');
    if (roles.some(r => !knownRoles.test(r))) vf('存在未知角色');
    const catalogRoles = expected.roles.map(r => r.role);
    if (new Set(catalogRoles).size !== catalogRoles.length || roles.length !== catalogRoles.length || roles.some(r => !catalogRoles.includes(r))) vf('角色目录与文档不一致');
    const errorRoles = roles.filter(r => /^error-/.test(r));
    errorRoles.forEach((r, i) => {if (r !== `error-${String(i + 1).padStart(2, '0')}`) vf('错误角色编号必须连续');});
    const facts = [];
    for (const c of v.cards) {
      const cf = message => vf(c.role + '：' + message);
      const blocks = [...c.body.matchAll(/```text\s*\n([\s\S]*?)```/g)].map(m => m[1]);
      const status = expected.roles.find(r => r.role === c.role)?.status;
      const na = status === 'not-applicable';
      if (!['not-applicable', 'unproduced'].includes(status)) cf('角色状态不能假定图片已完成');
      if (na) {
        if (c.role !== 'equipment' || expected.equipment_id !== 'none' || expected.photos.length) cf('只有无器械的equipment可以不适用');
        if (blocks.length || !c.body.includes('角色状态：not-applicable')) cf('不适用角色不得含生成提示词');
      } else if (blocks.length !== 1) cf('必须恰好一段完整text提示词');
      if (expected.equipment_id === 'none' && c.role === 'equipment' && !na) cf('自重动作不应生成机器');
      if (!c.body.includes('验收点：') || !c.body.includes('页面配文：')) cf('缺少验收点或可编辑文案');
      for (const prompt of blocks) {
        for (const token of ['1:1', '8%', '12%', 'Logo', '水印', '只输出一张']) if (!prompt.includes(token)) cf('缺少约束：' + token);
        if (placeholder.test(prompt)) cf('存在未展开占位符或同上引用');
        if (/实拍[：:]\s*[。；]/.test(prompt)) cf('实拍输入为空，应说明无器械或缺证阻塞');
        if (obsolete.test(prompt)) cf('残留旧版禁文字/正确01锚点规则');
        if (c.role !== 'equipment' && /(?:禁止|不得|不要|无)(?:任何|一切|所有)?(?:图内|图中|图片内)?文字[，。；、]/.test(prompt)) cf('教学角色不能禁止全部文字');
        if (expected.evidence_status === 'blocked-evidence' && !prompt.includes('执行门槛：blocked-evidence，当前不可调用')) cf('阻塞配置缺少明确禁止调用门槛');
        if (c.role !== 'force' && !prompt.includes('force')) cf('缺少force引用');
        if (c.role === 'force' && (!prompt.includes('箭头') || !prompt.includes('绿色'))) cf('缺少可见方向/稳定指导');
        if (c.role !== 'muscles') for (const p of expected.photos) if (!prompt.includes(p.path)) cf('未附配置所需实拍：' + p.photo);
        if (c.role.startsWith('error-') && (!prompt.includes('仅示范一个错误') || !prompt.includes('红圈'))) cf('错误图缺少单一偏差或标识');
        if (['start', 'force', 'end'].includes(c.role)) {
          const fact = c.body.match(/^阶段事实：(.+)$/m)?.[1];
          if (!fact) cf('缺少可观察阶段事实');
          else {
            facts.push(fact.replace(/[\s，。；：、]/g, ''));
            if (!prompt.includes(fact)) cf('阶段事实未完整展开到提示词');
          }
          const cue = c.body.match(/^页面配文：(.+)$/m)?.[1];
          if (!cue || !prompt.includes('底部口令逐字写“' + cue + '”')) cf('图内口令与页面文案不一致');
        }
      }
    }
    if (facts.length === 3 && new Set(facts).size !== 3) vf('正确阶段完全重复');
    const totalBlocks = [...v.body.matchAll(/```text\s*\n/g)].length;
    const assignedBlocks = v.cards.reduce((n,c)=>n+[...c.body.matchAll(/```text\s*\n/g)].length,0);
    if (totalBlocks !== assignedBlocks) vf('存在未归属角色的提示词');
  }
  return errors;
}

// 通过公开目录核对媒体引用；校验可在无实拍的干净检出中运行。
function validateRepository(repoRoot = root) {
  const read = p => fs.readFileSync(path.join(repoRoot, p), 'utf8');
  const errors = [];
  for (const f of requiredDocs) if (!fs.existsSync(path.join(repoRoot, f))) errors.push('缺少文档：' + f);
  if (errors.length) return {errors};
  const catalog = JSON.parse(read(`${relativeDir}/_catalog.json`));
  if (catalog.schema_version !== 2 || catalog.generation_enabled !== false) errors.push('本轮目录必须为v2且暂停生成');
  const photos = JSON.parse(read('docs/equipment-review/photo-audit/photo-manifest.json'));
  const names = fs.readdirSync(path.join(repoRoot, relativeDir)).filter(n => n.endsWith('.md') && !n.startsWith('_') && n !== 'README.md').sort();
  const ids = names.map(n => n.slice(0, -3));
  const entries = catalog.actions;
  if (new Set(entries.map(a => a.action_id)).size !== entries.length || entries.length !== ids.length || entries.some(a => !ids.includes(a.action_id))) errors.push('目录动作与文件必须一一对应');
  const ctx = {window: {}};
  vm.createContext(ctx);
  const sourceById = {};
  for (const f of ['data.js', 'extra-data.js', 'activity-data.js']) {
    vm.runInContext(read(f), ctx);
    for (const a of ctx.window.GYM_DATA) sourceById[a.id] ??= f;
  }
  const plan = read('docs/image-generation-plan.md');
  const planned = [...plan.matchAll(/^\| \[([^\]]+)\]\(equipment-review\/action-prompts\/([^()]+)\.md\) \|([^\n]+)$/gm)];
  for (const id of ids) if (planned.filter(m => m[1] === id && m[2] === id).length !== 1) errors.push(id + '：计划必须恰好一行');
  if (planned.length !== ids.length) errors.push('计划存在额外行或缺行');
  for (const entry of entries) {
    if ((sourceById[entry.action_id] || null) !== entry.data_source) errors.push(entry.action_id + '：运行时数据归属不一致');
    for (const v of entry.variants) {
      if (new Set(v.photos.map(p=>p.photo)).size !== v.photos.length) errors.push(entry.action_id + '：重复照片');
      for (const p of v.photos) {
        const original = photos.find(x => x.photo === p.photo);
        if (!original || p.path !== '健身房器械图片/' + original.file) errors.push(entry.action_id + '：照片路径或编号无效');
      }
      if (v.equipment_id !== 'none' && !v.photos.length && v.evidence_status === 'ready') errors.push(entry.action_id + '：没有实拍不能放行机器');
    }
    errors.push(...validateAction(read(`${relativeDir}/${entry.action_id}.md`), entry));
    const row = planned.find(m => m[1] === entry.action_id)?.[3] || '';
    const state = entry.variants.some(v => v.evidence_status === 'blocked-evidence') ? 'blocked-evidence' : 'ready';
    if (!row.includes('v2迁移完成') || !row.includes(state) || !row.includes('暂停生成')) errors.push(entry.action_id + '：计划状态不一致');
  }
  for (const f of [...requiredDocs, ...names.map(n => `${relativeDir}/${n}`)]) {
    for (const m of read(f).matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      if (/^(?:https?:|#)/.test(m[1])) continue;
      const target = decodeURIComponent(m[1].split('#')[0]);
      if (!fs.existsSync(path.resolve(repoRoot, path.dirname(f), target))) errors.push(f + '：本地文档链接失效 ' + target);
    }
  }
  return {errors, actions: ids.length, variants: entries.reduce((n,a)=>n+a.variants.length,0), ready: entries.flatMap(a=>a.variants).filter(v=>v.evidence_status==='ready').length};
}

function main() {
  try {
    const result = validateRepository();
    if (result.errors.length) { console.error(result.errors.join('\n')); process.exitCode = 1; }
    else {
      console.log(`v2全量校验通过：${result.actions}个动作，${result.variants}套配置；图示证据ready ${result.ready}套，blocked-evidence ${result.variants-result.ready}套。`);
      console.log('本轮暂停生成；校验不证明动作技术、原机认证或图片合格。');
    }
  } catch (error) { console.error('文档校验失败：' + error.message); process.exitCode = 1; }
}
if (require.main === module) main();
module.exports = {parseVariants, validateAction, validateRepository, main};
