(function () {
  'use strict';
  const sources = {
    intensity: ['CDC · 如何判断运动强度', 'https://www.cdc.gov/physical-activity-basics/measuring/index.html'],
    warmup: ['美国心脏协会 · 热身与冷身', 'https://www.heart.org/en/healthy-living/exercise-and-physical-activity/fitness-basics/warm-up-cool-down'],
    treadmill: ['Horizon · 跑步机操作与安全手册（英文 PDF）', 'https://cdn.horizonfitness.rocks/support/treadmill_guide.pdf'],
    rope: ['ACE · 跳绳入门（英文图文 PDF）', 'https://acewebcontent.azureedge.net/assets/education-resources/lifestyle/fitfacts/pdfs/fitfacts/itemid_36.pdf'],
    core: ['Mayo Clinic · 卷腹视频与文字步骤', 'https://www.mayoclinic.org/healthy-lifestyle/fitness/multimedia/abdominal-crunch/vid-20084664']
  };
  const guides = [
    {name:'跑步机快走／慢跑', kind:'有氧 · 记录时长或距离', resources:[['跑步机安全图解', 'treadmill'], ['Mayo Clinic 快走视频脚本', 'mayoWalk']], steps:[
      '先熟悉停止按钮和安全夹，把安全夹固定在衣服上；按现场机型说明站位，以低速启动，不能跳上高速运行的跑带。',
      '用轻松步行热身 5–10 分钟，再逐渐调到适合自己的快走或慢跑速度。身体朝前，不边跑边回头。',
      '用说话测试判断强度：中等强度通常能说话，但唱歌困难；只能说几句话就要换气时，通常已是较高强度。',
      '结束前减速走 5–10 分钟，让呼吸逐步恢复；跑带停稳后再离开。'], mistake:'不要照搬别人的速度；出现疼痛、眩晕或明显异常气短时停止。', refs:['treadmill','intensity','warmup']},
    {name:'跑步机爬坡', kind:'有氧 · 记录时长，坡度可写备注', resources:[['跑步机安全图解', 'treadmill'], ['CDC 强度判断', 'intensity']], steps:[
      '先阅读上面的跑步机操作要点，以轻松步行热身，再开始坡度走。',
      '实践建议：从能稳定行走的低坡度起步，每次只小幅调整速度或坡度中的一项，观察呼吸和步态。',
      '实践建议：如果需要持续拉住扶手才能跟上，就降低坡度或速度；上下机、调整或需要稳定身体时可扶稳。',
      '以说话测试控制强度，不强求固定坡度和时长；结束前逐步降低坡度与速度，轻松走完冷身。'], mistake:'坡度进阶步骤是基于操作安全与强度原则整理的实践建议，不是统一的训练处方。现场坡度单位与限制以机型说明为准。', refs:['treadmill','intensity','warmup']},
    {name:'跳绳', kind:'有氧 · 时长、总次数均可选填', resources:[['ACE 跳绳动作图', 'rope'], ['ACE 跳绳入门 PDF', 'rope']], steps:[
      '选择合适长度的轻绳和有缓冲的运动鞋，确认周围与头顶有足够空间。',
      '肩膀放松，肘部靠近身体，用手腕转绳，头抬起、背部保持自然伸直。',
      '膝盖微屈，低低跳起让绳通过，轻落地，不用大幅甩臂或跳得很高。',
      '先熟悉节奏，累了就停下来走动休息；逐步增加能稳定完成的运动量。开始与结束都留出轻松活动的时间。'], mistake:'跳绳可能很快达到较高强度，不必追求连续不间断；膝踝疼痛时停止。', refs:['rope','intensity','warmup']},
    {name:'居家核心：卷腹', kind:'核心力量 · 可记录组数与总次数', resources:[['Mayo Clinic 视频示范', 'core'], ['Mayo Clinic 动作说明', 'coreText']], steps:[
      '仰卧，膝盖弯曲，双脚稳稳踩地、约与髋同宽；收紧腹部。',
      '双臂交叉放在胸前，缓慢抬起头部和肩部，不需要坐到直立。',
      '保持动作受控，再慢慢回落；自然呼吸，不憋气，不用双手拉头颈。',
      '按能保持规范的次数记录。若实际做的是仰卧起坐，请把打卡名称改成仰卧起坐，二者动作幅度不同。'], mistake:'这是卷腹示范，不是完整仰卧起坐教程。颈部或腰部疼痛时停止。', refs:['core']}
  ];
  sources.mayoWalk = ['Mayo Clinic · 走路与坚持（视频脚本）', 'https://newsnetwork.mayoclinic.org/n7-mcnn/7bcc9724adf7b803/uploads/2022/01/Mayo-Clinic-Minute-Script-Exercising-in-the-new-year.pdf'];
  sources.coreText = ['Mayo Clinic · 卷腹动作说明', 'https://www.mayoclinic.org/healthy-lifestyle/fitness/multimedia/abdominal-crunch/vid-20084664'];
  document.getElementById('activity-guides').innerHTML = guides.map(g => `<details class="activity-guide"><summary><b>${g.name}</b><small>${g.kind}</small></summary><ol>${g.steps.map(s => `<li>${s}</li>`).join('')}</ol><p class="guide-caution">${g.mistake}</p><div class="guide-resources"><span>示例资料</span>${(g.resources || []).map(([label,key]) => `<a href="${sources[key][1]}" target="_blank" rel="noopener noreferrer"><i aria-hidden="true">${key === 'mayoWalk' || key === 'core' ? '▶' : '▧'}</i>${label} ↗</a>`).join('')}</div><div class="guide-sources">${g.refs.map(key => `<a href="${sources[key][1]}" target="_blank" rel="noopener noreferrer">${sources[key][0]} ↗</a>`).join('')}</div><p><a class="text-link" href="#free-activity">练完去打卡 ↗</a></p></details>`).join('') + '<p class="storage-note">资料核对：2026-09-08 · 中文内容为要点整理，原文版权归各来源所有。</p>';
})();
