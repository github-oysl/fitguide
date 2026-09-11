// Checks v2 documentation contracts; does not certify generated images.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const promptsDir = path.join(root, 'docs/equipment-review/action-prompts');
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');
const errors = [];
const requiredDocs = [
  'docs/image-generation-workflow.md',
  'docs/image-generation-prompts.md',
  'docs/image-generation-notes.md',
  'docs/image-generation-plan.md',
  'docs/equipment-review/action-prompts/_TEMPLATE.md',
  'docs/equipment-review/action-prompts/README.md'
];
for (const file of requiredDocs) {
  if (!fs.existsSync(path.join(root, file))) errors.push('Missing document: ' + file);
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
const names = fs.readdirSync(promptsDir).filter(name =>
  name.endsWith('.md') && !name.startsWith('_') && name !== 'README.md'
).sort();
const plan = read('docs/image-generation-plan.md');
const planned = [...plan.matchAll(/\[([^\]]+)\]\(equipment-review\/action-prompts\/([^()]+)\.md\)/g)]
  .filter(match => match[1] === match[2]).map(match => match[2]);
const expectedIds = names.map(name => name.slice(0, -3));
for (const id of expectedIds) {
  if (planned.filter(item => item === id).length !== 1) errors.push(id + ': plan must contain exactly one action row');
}
for (const id of planned) {
  if (!expectedIds.includes(id)) errors.push(id + ': plan references absent action');
}
const migrated = [];
const legacy = [];
for (const name of names) {
  const text = fs.readFileSync(path.join(promptsDir, name), 'utf8');
  if (!/^- 提示词版本：2\s*$/m.test(text)) {
    legacy.push(name);
    continue;
  }
  migrated.push(name);
  for (const field of ['动作 ID', '器械 ID', '工位 / 变式', '适配状态', '提示词状态', '图片状态', '资料核对日期']) {
    if (!text.includes('- ' + field + '：')) errors.push(name + ': missing field ' + field);
  }
  const section = text.split('## 三、图片提示词')[1]?.split('## 四、')[0];
  if (!section) { errors.push(name + ': missing prompt section'); continue; }
  const cards = [...section.matchAll(/^### ([a-z]+(?:-[0-9]+)?) ·[^\n]*\n([\s\S]*?)(?=^### |$(?![\s\S]))/gm)];
  const roles = cards.map(match => match[1]);
  for (const role of ['force', 'equipment', 'start', 'end', 'muscles']) {
    if (roles.filter(item => item === role).length !== 1) errors.push(name + ': expected role once: ' + role);
  }
  if (roles[0] !== 'force') errors.push(name + ': first generated role must be force');
  if (!roles.some(role => /^error-\d+$/.test(role))) errors.push(name + ': missing error example');
  if (new Set(roles).size !== roles.length) errors.push(name + ': duplicate role');
  for (const [, role, body] of cards) {
    const blocks = [...body.matchAll(/```text\s*\n([\s\S]*?)```/g)];
    const notApplicable = role === 'equipment' && body.includes('not-applicable');
    if (!notApplicable && blocks.length !== 1) errors.push(name + '/' + role + ': expected one prompt');
    for (const [, prompt] of blocks) {
      if (!prompt.includes('1:1')) errors.push(name + '/' + role + ': missing square format');
      if (!prompt.includes('Logo') || !prompt.includes('水印')) errors.push(name + '/' + role + ': missing asset constraints');
      if (role !== 'force' && !prompt.includes('force')) errors.push(name + '/' + role + ': missing force reference');
      if (role === 'force' && !prompt.includes('箭头')) errors.push(name + ': force lacks visible guidance');
      if (/禁止任何文字|禁止任何图中文字/.test(prompt)) errors.push(name + '/' + role + ': obsolete blanket text ban');
    }
    if (!body.includes('验收点：')) errors.push(name + '/' + role + ': missing visual acceptance criteria');
  }
}
for (const file of [...requiredDocs, ...migrated.map(name => 'docs/equipment-review/action-prompts/' + name)]) {
  const text = read(file);
  for (const match of text.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const target = match[1];
    if (/^(?:https?:|#)/.test(target)) continue;
    const clean = decodeURIComponent(target.split('#')[0]);
    const resolved = path.resolve(path.dirname(path.join(root, file)), clean);
    if (!fs.existsSync(resolved)) errors.push(file + ': broken local document link ' + target);
  }
}
if (!migrated.includes('lat-pulldown-with-pronated-grip.md')) errors.push('Missing migrated example');
if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('文档校验通过：' + names.length + ' 个动作均列入计划；v2 ' + migrated.length + ' 个，待迁移 ' + legacy.length + ' 个。');
  console.log('本检查只验证文档结构和队列覆盖，不验证图片、原机证据或动作技术。');
}
