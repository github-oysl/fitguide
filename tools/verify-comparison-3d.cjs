// 校验动作对比模块中 3D 动画正误演示与真人标准示范双模切换，以及向大模型传递正误先验知识的完整性
// 运行：node tools/verify-comparison-3d.cjs
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');

const ROOT = path.resolve(__dirname, '..');

(async () => {
  const { validateInput, buildRequest, SYSTEM_PROMPT } = await import('../comparison/guidance.mjs');

  // 1. 验证 guidance.mjs 系统提示词
  assert.ok(SYSTEM_PROMPT.includes('正向标准'), 'SYSTEM_PROMPT 应包含正向标准说明');
  assert.ok(SYSTEM_PROMPT.includes('常见错误'), 'SYSTEM_PROMPT 应包含常见错误模式排查');

  // 2. 验证 payload 组装包含正向要领与负向易错特征
  const sampleInput = {
    report: {
      version: 1,
      exerciseId: 'barbell-squat',
      templateVersion: 'exercise-projection-v1',
      duration: 8.5,
      quality: { usable: true, coverage: 0.95 },
      repCount: 2,
      metrics: [
        { id: 'elbowRange', label: '膝关节幅度', unit: '°', value: 92, reference: 95, tolerance: 20, status: 'similar', confidence: 0.95 },
        { id: 'armDrift', label: '每次动作时长', unit: '秒', value: 3.2, reference: 3.0, tolerance: 1, status: 'similar', confidence: 0.95 },
        { id: 'torsoSway', label: '躯干角度变化', unit: '°', value: 14, reference: 8, tolerance: 10, status: 'different', confidence: 0.95 }
      ],
      segments: [
        { start: 0.5, peak: 2.2, end: 4.1, differences: [] },
        { start: 4.2, peak: 6.1, end: 8.2, differences: ['torsoSway'] }
      ],
      exerciseName: '杠铃深蹲',
      primary: '股四头肌、臀大肌',
      cue: '屈髋屈膝同时下蹲，全脚掌着地。',
      steps: ['双脚与肩同宽站立，核心收紧', '屈髋屈膝下蹲至大腿与地面平行', '全脚掌发力蹬伸还原'],
      mistake: '避免前脚掌过度发力导致脚跟离地，不要弓背或膝盖内扣。',
      has3D: true
    },
    frames: [
      { time: 0.5, dataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRg==' },
      { time: 2.2, dataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRg==' }
    ]
  };

  const validated = validateInput(sampleInput);
  assert.equal(validated.report.exerciseName, '杠铃深蹲');
  assert.equal(validated.report.cue, '屈髋屈膝同时下蹲，全脚掌着地。');
  assert.equal(validated.report.mistake, '避免前脚掌过度发力导致脚跟离地，不要弓背或膝盖内扣。');
  assert.equal(validated.report.has3D, true);
  assert.equal(validated.report.steps.length, 3);

  const request = buildRequest(sampleInput, { model: 'gpt-4o' });
  const textPrompt = request.messages[1].content[0].text;
  assert.ok(textPrompt.includes('动作名称：杠铃深蹲'), 'Prompt 应包含中文动作名称');
  assert.ok(textPrompt.includes('动作要领口诀（正例标准）：屈髋屈膝同时下蹲，全脚掌着地。'), 'Prompt 应包含正向口诀');
  assert.ok(textPrompt.includes('常见易错模式（重点排查）：避免前脚掌过度发力导致脚跟离地'), 'Prompt 应包含负向易错排查模式');
  assert.ok(textPrompt.includes('动作执行步骤：'), 'Prompt 应包含分步骤动作说明');
  assert.ok(textPrompt.includes('该动作包含 3D 解剖正误教学演示。'), 'Prompt 应包含 3D 解剖演示标记');
  assert.equal(request.messages[1].content[1].type, 'text');
  assert.equal(request.messages[1].content[2].type, 'image_url');

  // 3. 验证向后兼容性（没有提供元数据时，依然合法）
  const minimalInput = {
    report: {
      version: 1,
      exerciseId: 'cable-curl-with-bar',
      templateVersion: 'curl-side-v1',
      duration: 5,
      quality: { usable: true, coverage: 0.9 },
      repCount: 1,
      metrics: [
        { id: 'elbowRange', value: 90, reference: 100, status: 'similar', confidence: 0.9 },
        { id: 'armDrift', value: 0.5, reference: 0.1, status: 'different', confidence: 0.9 },
        { id: 'torsoSway', value: 5, reference: 3, status: 'similar', confidence: 0.9 }
      ],
      segments: [{ start: 0, peak: 2, end: 4, differences: ['armDrift'] }]
    },
    frames: [{ time: 2, dataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRg==' }]
  };
  const minimalValidated = validateInput(minimalInput);
  assert.equal(minimalValidated.report.exerciseId, 'cable-curl-with-bar');
  assert.equal(minimalValidated.report.exerciseName, undefined);
  const minimalRequest = buildRequest(minimalInput, { model: 'gpt-4o' });
  assert.ok(minimalRequest.messages[1].content[0].text.startsWith('以下是待分析的代码报告'));

  // 4. 验证 ui.mjs 中双模切换 HTML 结构与逻辑声明
  const uiJs = fs.readFileSync(path.join(ROOT, 'comparison', 'ui.mjs'), 'utf8');
  assert.ok(uiJs.includes('reference-mode-switcher'), 'ui.mjs 应包含 reference-mode-switcher');
  assert.ok(uiJs.includes('setReferenceMode'), 'ui.mjs 应包含 setReferenceMode 函数');
  assert.ok(uiJs.includes('exercise.video3D'), 'ui.mjs 应支持播放 exercise.video3D');
  assert.ok(uiJs.includes('richReport'), 'ui.mjs 应向 generateGuidance 传递包含丰富元数据的 richReport');
  assert.ok(uiJs.includes('exerciseName:exercise.name'), 'richReport 应包含 exerciseName');
  assert.ok(uiJs.includes('mistake:exercise.mistake'), 'richReport 应包含 mistake 易错点');

  // 5. 验证 CSS 样式
  const css = fs.readFileSync(path.join(ROOT, 'comparison', 'comparison.css'), 'utf8');
  assert.ok(css.includes('.reference-mode-switcher'), 'comparison.css 应包含 .reference-mode-switcher');

  console.log('  ✓ guidance.mjs 正误先验知识与大模型 Prompt 组装验证通过');
  console.log('  ✓ 向后兼容性测试通过（无元数据时回退标准文本）');
  console.log('  ✓ ui.mjs 双模切换控件（真人标准 vs 3D 正误）与 richReport 传递验证通过');
  console.log('  ✓ comparison.css 设计规范验证通过');
  console.log('\n动作对比 3D 正误演示与大模型比对设置校验：全部通过！');
})().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
