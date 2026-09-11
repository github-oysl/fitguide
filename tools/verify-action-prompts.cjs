const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..', 'docs', 'equipment-review', 'action-prompts');
const blocked = new Set(['calf-raise-in-leg-press.md', 'seated-dip-machine.md']);
const files = fs.readdirSync(root)
  .filter(name => name.endsWith('.md') && !name.startsWith('_') && name !== 'README.md' && !blocked.has(name))
  .sort();

const failures = [];
let v2Count = 0;
const forbidden = ['横构图 3:2', '叠加简体中文', '红色引线', '绿色对号', '红色叉号'];

function promptBlocks(section) {
  return [...section.matchAll(/```text\s*\n([\s\S]*?)```/g)].map(match => match[1]);
}

for (const name of files) {
  const text = fs.readFileSync(path.join(root, name), 'utf8');
  // v2 使用角色式章节和 force 锚点，交给对应的工作流校验器检查。
  if (/^- 提示词版本：2\s*$/m.test(text)) {
    v2Count++;
    continue;
  }
  const correctStart = text.indexOf('## 二、正确动作多图提示词');
  const errorStart = text.indexOf('## 三、错误对比多图提示词');
  if (correctStart < 0 || errorStart < 0 || errorStart <= correctStart) {
    failures.push(`${name}: 缺少新版二/三节标题`);
    continue;
  }

  const correct = text.slice(correctStart, errorStart);
  const errors = text.slice(errorStart);
  const correctHeadings = [...correct.matchAll(/^### 正确\s*0?([1-5])\s*·/gm)];
  const errorHeadings = [...errors.matchAll(/^### 错误\s*0?([1-4])\s*·/gm)];
  const correctBlocks = promptBlocks(correct);
  const errorBlocks = promptBlocks(errors);

  if (correctHeadings.length < 2 || correctHeadings.length > 5) failures.push(`${name}: 正确图数量 ${correctHeadings.length}，应为 2–5`);
  if (errorHeadings.length < 1 || errorHeadings.length > 4) failures.push(`${name}: 错误图数量 ${errorHeadings.length}，应为 1–4`);
  if (correctBlocks.length !== correctHeadings.length) failures.push(`${name}: 正确标题/代码块数量不一致`);
  if (errorBlocks.length !== errorHeadings.length) failures.push(`${name}: 错误标题/代码块数量不一致`);

  const blocks = [...correctBlocks, ...errorBlocks];
  blocks.forEach((block, index) => {
    for (const token of ['1:1', 'Logo', '水印']) {
      if (!block.includes(token)) failures.push(`${name}: 提示词 ${index + 1} 缺少 ${token}`);
    }
    if (!/(8%|百分之八)/.test(block)) failures.push(`${name}: 提示词 ${index + 1} 缺少 8% 安全边距`);
    if (!/(12%|百分之十二)/.test(block)) failures.push(`${name}: 提示词 ${index + 1} 缺少底部 12% 留白`);
    if (!/(禁止|不得|不要)[^。\n]*文字/.test(block)) failures.push(`${name}: 提示词 ${index + 1} 未明确禁止图中文字`);
    for (const phrase of forbidden) {
      if (block.includes(phrase)) failures.push(`${name}: 提示词 ${index + 1} 仍含旧要求“${phrase}”`);
    }
  });

  correctBlocks.slice(1).forEach((block, index) => {
    if (!/正确\s*0?1/.test(block)) failures.push(`${name}: 正确图 ${index + 2} 未引用正确 01 锚点`);
  });
  errorBlocks.forEach((block, index) => {
    if (!/正确\s*0?1/.test(block)) failures.push(`${name}: 错误图 ${index + 1} 未引用正确 01 锚点`);
  });

  const pageCopyCount = (correct.match(/^页面配文：/gm) || []).length + (errors.match(/^页面配文：/gm) || []).length;
  if (pageCopyCount !== blocks.length) failures.push(`${name}: 页面配文 ${pageCopyCount} 条，提示词 ${blocks.length} 条`);
}

if (v2Count) {
  const {spawnSync} = require('node:child_process');
  const result = spawnSync(process.execPath, [path.join(__dirname, 'verify-image-workflow.cjs')], {stdio: 'inherit'});
  if (result.error || result.status !== 0) failures.push('v2 工作流校验失败');
}

if (failures.length) {
  console.error(failures.join('\n'));
  console.error(`\n动作提示词校验失败：${failures.length} 项`);
  process.exitCode = 1;
} else {
  console.log(`动作提示词校验通过：${files.length - v2Count} 个旧版多图动作符合锚点、1:1 与无图中文字约束；${v2Count} 个 v2 动作通过工作流校验。`);
}
