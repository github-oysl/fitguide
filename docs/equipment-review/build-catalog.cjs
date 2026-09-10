const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const context = {window: {}};
vm.createContext(context);
for (const file of ['data.js', 'extra-data.js']) vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
const items = context.window.GYM_DATA;
if (items.length !== 24 || new Set(items.map(x => x.id)).size !== 24) throw new Error('Expected 24 unique strength exercises');
const mapping = ['A1/A2 + A5','C1/C2','C3','C4','B3','B1/B2','A3','A4 + A6','A1/A2 + A6','B4','A1/A2 + A5 + A6','B5','A1/A2 + A5','B6','A1/A2 + A5','A1/A2 + A5','A1/A2 + A6','A1/A2 + A5','A1/A2 + A5','A1/A2 + A5','A1/A2 + A5','A1/A2 + A5','C5','C1/C2（需核对机型是否允许提踵）'];
const catalog = [
['A1','宽距龙门架','两侧立柱间距大，中间留有站位'],['A2','紧凑双滑轮训练器','两组可调滑轮靠近，通常呈窄门形或夹角形'],['A3','高位下拉工位','头顶出线、长杆、座椅和大腿压垫'],['A4','低位坐姿划船工位','低位出线、长凳、前方左右踏板'],['A5','绳索附件Ⅰ','单手 D 把手、双头绳索，分别核对'],['A6','绳索附件Ⅱ与训练凳','短直杆、曲杆、V 把手、可调上斜凳，分别核对'],
['B1','长臂把手式夹胸机','手握把手，长摆臂从上方连接'],['B2','前臂垫式蝴蝶机','前臂靠竖直软垫，与把手式不同'],['B3','坐姿推胸机','把手在胸侧向前推，核对是否独立摆臂'],['B4','胸垫式固定划船机','胸前有支撑垫，把手向躯干方向拉'],['B5','坐姿推肩机','靠背座椅，把手从肩部向上推'],['B6','上臂垫式侧平举机','两侧上臂垫随手臂向外抬起'],
['C1','45°挂片腿举机','倾斜导轨、移动滑车、杠铃片挂杆和安全挡'],['C2','水平坐姿腿举机','接近水平蹬伸，配重插销式；确认座椅还是踏板移动'],['C3','坐姿腿屈伸机','小腿前方滚垫，用于伸膝'],['C4','坐姿腿弯举机','大腿压垫与脚踝附近滚垫，用于屈膝'],['C5','坐姿髋外展机','双腿外侧抵垫，向外打开'],['C6','俯卧腿弯举机（辨认对照）','趴卧式；不是当前坐姿腿弯举的直接替代图']];
let out = '# 24 个力量动作｜内容整理与器械确认\n\n';
out += '> 整理自当前项目 `data.js` 与 `extra-data.js`，不包含另外的有氧／居家动作。以下训练文字为现有内容原样整理，尚未针对新机型重新审核。生成图用于器械外形辨认，不是实物照片、品牌型号确认或结构操作依据。\n\n';
out += '## 器械确认图\n\n- [A：绳索工位与附件](equipment-a.png)\n- [B：上肢固定器械](equipment-b.png)\n- [C：下肢固定器械](equipment-c.png)\n\n';
out += '请按编号反馈，例如：`A2 接近；B1 有，B2 没有；C2 接近，但移动的是座椅`。不相似可直接写“不像”，不要勉强选择。确认外形后还要核对把手、靠垫、调节位置和运动路线，才能统一后续教学图。\n\n';
out += '| 编号 | 器械／附件 | 重点辨认 | 确认结果 |\n|---|---|---|---|\n';
for (const row of catalog) out += `| ${row.join(' | ')} | 待确认 |\n`;
out += '\n## 动作总览\n\n| 序号 | 动作 | 器械图编号 |\n|---|---|---|\n';
items.forEach((x,i)=>out+=`| ${String(i+1).padStart(2,'0')} | ${x.name} | ${mapping[i]} |\n`);
out += '\n## 动作详细内容\n\n';
items.forEach((x,i)=>{
out += `### ${String(i+1).padStart(2,'0')} · ${x.name}\n\n- 动作 ID：\`${x.id}\`\n- 英文：${x.en}\n- 主要训练：${x.primary}\n- 辅助肌群：${x.secondary}\n- 现有器械／附件：${x.attachment}\n- 待确认器械图：${mapping[i]}\n- 现有场地标注（待重新确认）：${x.availability}\n- 一句话提示：${x.cue}\n- 原有训练建议：${x.sets}；休息 ${x.rest}\n\n**现有动作步骤**\n\n`;
x.steps.forEach((step,j)=>out+=`${j+1}. ${step}\n`);
out += `\n**现有常见错误**\n\n${x.mistake}\n\n**素材与来源**\n\n- 本地图片：\`assets/${x.id}.jpg\`\n- 本地视频：\`assets/${x.id}.mp4\`\n- 原有资料链接（本轮未重新核验）：${x.source}\n`;
if(x.video) out += `- 原有外部演示：${x.video}\n`;
out += '\n**新素材制作状态**：器械待确认；确认后选择准备、发力、还原关键帧，统一人物、器械结构、握法和视角。错误对照图每张只突出一个问题，动态节奏问题另用视频或动画。\n\n';
});
out += '## 后续素材一致性要求\n\n1. 每种确认过的器械建立一张基准图和结构说明，共用该器械的动作引用同一基准。\n2. 外观新旧不作为动作匹配依据；优先确认结构、附件、运动路线与身体支撑位置。\n3. 图片和视频的器械或动作方式不同，先标记为待替换，不混成同一组教学。\n4. 准备、发力、还原使用相同人物、服装、器械、座椅设定和观察方向。\n5. 生成图需核对器械连接、人体接触点和动作准确性后才可用于教学。\n6. 本轮不覆盖现有媒体文件，不修改动作库界面。\n';
fs.writeFileSync(path.join(__dirname,'24-exercises.md'),out);
console.log(`Wrote ${items.length} exercises`);
