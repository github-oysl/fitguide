// 筛选只匹配主要训练肌肉，避免辅助肌肉让结果失去针对性。
(function (scope) {
  const categories = {all:'全部部位', chest:'胸', back:'背', shoulders:'肩', arms:'手臂', legs:'臀腿', core:'核心'};
  const muscles = {
    chest:['胸大肌','chest'], 'upper-chest':['上胸侧重','chest'],
    lats:['背阔肌','back'], 'mid-back':['中背／菱形肌','back'],
    'front-delt':['肩前束','shoulders'], 'side-delt':['肩中束','shoulders'], 'rear-delt':['肩后束','shoulders'],
    biceps:['肱二头肌','arms'], brachialis:['肱肌／肱桡肌','arms'], triceps:['肱三头肌','arms'], 'triceps-long':['三头肌长头侧重','arms'],
    quads:['股四头肌／大腿前侧','legs'], hamstrings:['腘绳肌／大腿后侧','legs'], 'glute-max':['臀大肌','legs'], 'glute-med':['臀中肌／臀外侧','legs'], calves:['小腿','legs'],
    abs:['腹直肌','core'], obliques:['腹斜肌／抗旋转','core']
  };
  function filterExercises(items, state) {
    const query=(state.query||'').trim().toLowerCase();
    return items.filter(item =>
      (state.category==='all'||item.category===state.category||item.muscles.some(id=>muscles[id]?.[1]===state.category)) &&
      (state.muscle==='all'||item.muscles.includes(state.muscle)||(state.muscle==='triceps'&&item.muscles.includes('triceps-long'))||(state.muscle==='chest'&&item.muscles.includes('upper-chest'))) &&
      (state.equipment==='all'||(state.equipment==='cable-station'?['cable','pulldown','row'].includes(item.equipment):item.equipment===state.equipment)) &&
      (!query||[item.name,item.primary,item.secondary,item.attachment,item.cue,item.en,...item.muscles.map(id=>muscles[id]?.[0]||'')].join(' ').toLowerCase().includes(query))
    );
  }
  scope.GYM_TRAINING={categories,muscles,filterExercises};
})(typeof window==='undefined'?globalThis:window);
