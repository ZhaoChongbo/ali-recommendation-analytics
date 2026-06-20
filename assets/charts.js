// assets/charts.js — Ali Mobile Recommendation Analytics Dashboard
// All charts use ECharts with SVG renderer, colors derived from CSS variables
(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var ink2 = style.getPropertyValue('--ink2').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg = style.getPropertyValue('--bg').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var bg3 = style.getPropertyValue('--bg3').trim();
  var bg4 = style.getPropertyValue('--bg4').trim();
  var success = style.getPropertyValue('--success').trim();
  var danger = style.getPropertyValue('--danger').trim();

  // ==========================================
  // Chart 1: User Behavior Coverage (Funnel)
  // ==========================================
  var chart1 = echarts.init(document.getElementById('chart-funnel-coverage'), null, { renderer: 'svg' });
  chart1.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, backgroundColor: bg3, borderColor: rule, textStyle: { color: ink } },
    grid: { left: 80, right: 60, top: 20, bottom: 30 },
    xAxis: { type: 'value', max: 10000, axisLabel: { color: muted, fontSize: 11 }, splitLine: { lineStyle: { color: rule } }, axisLine: { lineStyle: { color: rule } } },
    yAxis: {
      type: 'category',
      data: ['浏览', '购买', '加购', '收藏'],
      axisLabel: { color: ink2, fontSize: 12, fontWeight: 700 },
      axisLine: { lineStyle: { color: rule } }
    },
    series: [{
      type: 'bar',
      data: [
        { value: 10000, itemStyle: { color: accent } },
        { value: 8886, itemStyle: { color: success } },
        { value: 8614, itemStyle: { color: accent2 } },
        { value: 6730, itemStyle: { color: '#6366f1' } }
      ],
      barWidth: 24,
      label: { show: true, position: 'right', color: ink2, fontSize: 11, fontFamily: 'JetBrainsMono', formatter: function(p) { return p.value + ' (' + (p.value/100).toFixed(1) + '%)'; } },
      itemStyle: { borderRadius: [0, 4, 4, 0] }
    }]
  });
  window.addEventListener('resize', function() { chart1.resize(); });

  // ==========================================
  // Chart 2: Category Conversion (Top5)
  // ==========================================
  var chart2 = echarts.init(document.getElementById('chart-category-conversion'), null, { renderer: 'svg' });
  chart2.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, backgroundColor: bg3, borderColor: rule, textStyle: { color: ink }, formatter: function(p) { return '品类 ' + p[0].name + '<br/>转化率: ' + p[0].value + '%'; } },
    grid: { left: 80, right: 60, top: 20, bottom: 30 },
    xAxis: { type: 'value', max: 25, axisLabel: { color: muted, fontSize: 11, formatter: '{value}%' }, splitLine: { lineStyle: { color: rule } }, axisLine: { lineStyle: { color: rule } } },
    yAxis: {
      type: 'category',
      data: ['5399', '6513', '5232', '6344', '1863'],
      axisLabel: { color: ink2, fontSize: 12, fontWeight: 700 },
      axisLine: { lineStyle: { color: rule } }
    },
    series: [{
      type: 'bar',
      data: [
        { value: 12.26, itemStyle: { color: accent + '99' } },
        { value: 13.22, itemStyle: { color: accent + 'bb' } },
        { value: 19.21, itemStyle: { color: accent2 } },
        { value: 19.87, itemStyle: { color: accent2 } },
        { value: 20.88, itemStyle: { color: success } }
      ],
      barWidth: 18,
      label: { show: true, position: 'right', color: ink2, fontSize: 11, fontFamily: 'JetBrainsMono', formatter: '{c}%' },
      itemStyle: { borderRadius: [0, 4, 4, 0] }
    }]
  });
  window.addEventListener('resize', function() { chart2.resize(); });

  // ==========================================
  // Chart 3: Daily Browse/Purchase & Conversion
  // ==========================================
  var dates = ['11/18','11/19','11/20','11/21','11/22','11/23','11/24','11/25','11/26','11/27','11/28','11/29','11/30','12/01','12/02','12/03','12/04','12/05','12/06','12/07','12/08','12/09','12/10','12/11','12/12','12/13','12/14','12/15','12/16','12/17','12/18'];
  var browseData = [6340,6418,6332,6275,6184,6371,6511,6346,6353,6357,6185,6220,6378,6543,6547,6581,6528,6364,6438,6420,6560,6563,6649,6892,7718,6774,6668,6784,6726,6636,6576];
  var purchaseData = [1539,1511,1492,1330,1411,1436,1524,1497,1487,1527,1442,1377,1534,1657,1585,1697,1585,1493,1452,1403,1551,1429,1442,1449,3897,1549,1506,1627,1650,1570,1552];
  var convData = [24.27,23.54,23.56,21.20,22.82,22.54,23.41,23.59,23.41,24.02,23.31,22.14,24.05,25.32,24.21,25.79,24.28,23.46,22.55,21.85,23.64,21.77,21.69,21.02,50.49,22.87,22.59,23.98,24.53,23.66,23.60];

  var chart3 = echarts.init(document.getElementById('chart-daily-trend'), null, { renderer: 'svg' });
  chart3.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, backgroundColor: bg3, borderColor: rule, textStyle: { color: ink } },
    legend: { data: ['浏览', '购买', '转化率'], bottom: 0, textStyle: { color: muted, fontSize: 11 } },
    grid: { left: 70, right: 70, top: 20, bottom: 50 },
    xAxis: { type: 'category', data: dates, axisLabel: { color: muted, fontSize: 10, rotate: 45, interval: 2 }, axisLine: { lineStyle: { color: rule } } },
    yAxis: [
      { type: 'value', name: '人数', nameTextStyle: { color: muted, fontSize: 10 }, axisLabel: { color: muted, fontSize: 10 }, splitLine: { lineStyle: { color: rule } }, axisLine: { lineStyle: { color: rule } } },
      { type: 'value', name: '转化率(%)', nameTextStyle: { color: muted, fontSize: 10 }, axisLabel: { color: muted, fontSize: 10, formatter: '{value}%' }, splitLine: { show: false }, axisLine: { lineStyle: { color: rule } } }
    ],
    series: [
      { name: '浏览', type: 'line', data: browseData, smooth: true, lineStyle: { color: accent, width: 2 }, itemStyle: { color: accent }, symbol: 'none', areaStyle: { color: 'rgba(59,130,246,0.08)' } },
      { name: '购买', type: 'line', data: purchaseData, smooth: true, lineStyle: { color: accent2, width: 2 }, itemStyle: { color: accent2 }, symbol: 'none' },
      { name: '转化率', type: 'line', yAxisIndex: 1, data: convData, smooth: true, lineStyle: { color: success, width: 2, type: 'dashed' }, itemStyle: { color: success }, symbol: 'circle', symbolSize: 4 }
    ]
  });
  window.addEventListener('resize', function() { chart3.resize(); });

  // ==========================================
  // Chart 4: Decision Cycle ECDF
  // ==========================================
  var ecdfDays = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
  var ecdfVals = [34.58,45.89,52.55,59.12,64.89,69.51,73.01,76.43,79.18,81.14,83.44,85.40,87.62,89.39,90.55,92.06,92.77,93.92,95.07,95.65,96.49,97.43,97.83,98.36,98.98,99.16,99.29,99.56,99.60,99.82,100.00];

  var chart4 = echarts.init(document.getElementById('chart-decision-cycle'), null, { renderer: 'svg' });
  chart4.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, backgroundColor: bg3, borderColor: rule, textStyle: { color: ink }, formatter: function(p) { return '决策天数: ' + p[0].axisValue + '天<br/>累积用户占比: ' + p[0].value + '%'; } },
    grid: { left: 55, right: 30, top: 20, bottom: 30 },
    xAxis: { type: 'category', data: ecdfDays, name: '天数', nameTextStyle: { color: muted }, axisLabel: { color: muted, fontSize: 10, interval: 4 }, axisLine: { lineStyle: { color: rule } } },
    yAxis: { type: 'value', name: '累积占比(%)', nameTextStyle: { color: muted }, axisLabel: { color: muted, fontSize: 10, formatter: '{value}%' }, splitLine: { lineStyle: { color: rule } }, axisLine: { lineStyle: { color: rule } } },
    series: [{
      type: 'line', data: ecdfVals, smooth: true, lineStyle: { color: accent, width: 2.5 }, itemStyle: { color: accent }, symbol: 'none',
      areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(59,130,246,0.2)' }, { offset: 1, color: 'rgba(59,130,246,0.02)' }] } },
      markLine: {
        silent: true, symbol: 'none',
        lineStyle: { color: muted, type: 'dashed', width: 1 },
        label: { color: muted, fontSize: 10, fontFamily: 'JetBrainsMono' },
        data: [
          { xAxis: 2, label: { formatter: 'P50: 2天' } },
          { xAxis: 7, label: { formatter: 'P75: 7天' } },
          { xAxis: 14, label: { formatter: 'P90: 14天' } }
        ]
      }
    }]
  });
  window.addEventListener('resize', function() { chart4.resize(); });

  // ==========================================
  // Chart 5: User Segment Radar
  // ==========================================
  var chart5 = echarts.init(document.getElementById('chart-user-segment'), null, { renderer: 'svg' });
  chart5.setOption({
    animation: false,
    tooltip: { appendToBody: true, backgroundColor: bg3, borderColor: rule, textStyle: { color: ink } },
    legend: { data: ['新用户', '老用户', '高频用户', '低频用户'], bottom: 0, textStyle: { color: muted, fontSize: 10 } },
    radar: {
      center: ['50%', '45%'],
      radius: '65%',
      indicator: [
        { name: '浏览活跃度', max: 100 },
        { name: '加购倾向', max: 100 },
        { name: '收藏倾向', max: 100 },
        { name: '购买转化', max: 100 },
        { name: '品类广度', max: 100 }
      ],
      axisName: { color: muted, fontSize: 10 },
      splitArea: { areaStyle: { color: [bg3, bg4] } },
      splitLine: { lineStyle: { color: rule } },
      axisLine: { lineStyle: { color: rule } }
    },
    series: [{
      type: 'radar',
      data: [
        { value: [85, 35, 30, 25, 40], name: '新用户', lineStyle: { color: accent }, areaStyle: { color: 'rgba(59,130,246,0.15)' }, itemStyle: { color: accent } },
        { value: [55, 70, 68, 65, 75], name: '老用户', lineStyle: { color: success }, areaStyle: { color: 'rgba(16,185,129,0.15)' }, itemStyle: { color: success } },
        { value: [90, 78, 72, 75, 80], name: '高频用户', lineStyle: { color: accent2 }, areaStyle: { color: 'rgba(245,158,11,0.15)' }, itemStyle: { color: accent2 } },
        { value: [30, 25, 22, 20, 35], name: '低频用户', lineStyle: { color: muted }, areaStyle: { color: 'rgba(100,116,139,0.1)' }, itemStyle: { color: muted } }
      ],
      symbol: 'circle', symbolSize: 4
    }]
  });
  window.addEventListener('resize', function() { chart5.resize(); });

  // ==========================================
  // Chart 6: Feature Importance
  // ==========================================
  var featureNames = ['商品热度', '商品加购数', '商品浏览数', '有无交互', '用户-商品加购', '用户-商品浏览', '最近活跃天数', '是否加购过', '是否收藏过', '商品购买率'];
  var featureVals = [0.1382, 0.1246, 0.1204, 0.0880, 0.0814, 0.0578, 0.0542, 0.0346, 0.0337, 0.0301];

  var chart6 = echarts.init(document.getElementById('chart-feature-importance'), null, { renderer: 'svg' });
  chart6.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, backgroundColor: bg3, borderColor: rule, textStyle: { color: ink }, formatter: function(p) { return p[0].name + '<br/>重要性: ' + (p[0].value * 100).toFixed(2) + '%'; } },
    grid: { left: 120, right: 60, top: 10, bottom: 20 },
    xAxis: { type: 'value', axisLabel: { color: muted, fontSize: 10, formatter: function(v) { return (v * 100).toFixed(0) + '%'; } }, splitLine: { lineStyle: { color: rule } }, axisLine: { lineStyle: { color: rule } } },
    yAxis: { type: 'category', data: featureNames.reverse(), axisLabel: { color: ink2, fontSize: 10 }, axisLine: { lineStyle: { color: rule } }, inverse: true },
    series: [{
      type: 'bar',
      data: featureVals.reverse().map(function(v, i) {
        return { value: v, itemStyle: { color: i < 3 ? accent2 : accent + 'aa', borderRadius: [0, 4, 4, 0] } };
      }),
      barWidth: 16,
      label: { show: true, position: 'right', color: muted, fontSize: 10, fontFamily: 'JetBrainsMono', formatter: function(p) { return (p.value * 100).toFixed(1) + '%'; } }
    }]
  });
  window.addEventListener('resize', function() { chart6.resize(); });

  // ==========================================
  // Chart 7: Model Comparison (XGBoost vs LR)
  // ==========================================
  var chart7 = echarts.init(document.getElementById('chart-model-comparison'), null, { renderer: 'svg' });
  chart7.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, backgroundColor: bg3, borderColor: rule, textStyle: { color: ink } },
    legend: { data: ['XGBoost', 'Logistic Regression'], bottom: 0, textStyle: { color: muted, fontSize: 11 } },
    grid: { left: 50, right: 30, top: 20, bottom: 48 },
    xAxis: { type: 'category', data: ['AUC', 'F1', 'AP'], axisLabel: { color: ink2, fontSize: 12, fontWeight: 700 }, axisLine: { lineStyle: { color: rule } } },
    yAxis: { type: 'value', min: 0.6, max: 1.0, axisLabel: { color: muted, fontSize: 10 }, splitLine: { lineStyle: { color: rule } }, axisLine: { lineStyle: { color: rule } } },
    series: [
      { name: 'XGBoost', type: 'bar', data: [0.9448, 0.7475, 0.8621], barWidth: 24, itemStyle: { color: accent, borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', color: ink2, fontSize: 11, fontFamily: 'JetBrainsMono', formatter: '{c}' } },
      { name: 'Logistic Regression', type: 'bar', data: [0.8442, 0.6330, 0.7100], barWidth: 24, itemStyle: { color: muted, borderRadius: [4, 4, 0, 0] }, label: { show: true, position: 'top', color: muted, fontSize: 11, fontFamily: 'JetBrainsMono', formatter: '{c}' } }
    ]
  });
  window.addEventListener('resize', function() { chart7.resize(); });

  // ==========================================
  // Chart 8: Forest Plot (Causal ATE)
  // ==========================================
  var chart8 = echarts.init(document.getElementById('chart-forest-plot'), null, { renderer: 'svg' });
  chart8.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, backgroundColor: bg3, borderColor: rule, textStyle: { color: ink }, formatter: function(p) {
      var d = p[0].data; return d.name + '<br/>ATE: ' + d.value[1].toFixed(2) + 'pp<br/>95% CI: [' + d.value[0].toFixed(2) + ', ' + d.value[2].toFixed(2) + ']';
    }},
    grid: { left: 80, right: 40, top: 20, bottom: 30 },
    xAxis: { type: 'value', name: 'ATE (pp)', nameTextStyle: { color: muted }, axisLabel: { color: muted, fontSize: 10 }, splitLine: { lineStyle: { color: rule } }, axisLine: { lineStyle: { color: rule } }, min: -5, max: 15 },
    yAxis: { type: 'category', data: ['收藏→购买', '加购→购买'], axisLabel: { color: ink2, fontSize: 12, fontWeight: 700 }, axisLine: { lineStyle: { color: rule } } },
    series: [
      {
        type: 'custom',
        renderItem: function(params, api) {
          var catIdx = api.value(3);
          var y = api.coord([0, catIdx])[1];
          var xStart = api.coord([api.value(0), catIdx])[0];
          var xEnd = api.coord([api.value(2), catIdx])[0];
          var xMid = api.coord([api.value(1), catIdx])[0];
          var color = api.value(4) === 'sig' ? success : muted;
          return {
            type: 'group',
            children: [
              { type: 'rect', shape: { x: xStart, y: y - 8, width: xEnd - xStart, height: 16 }, style: { fill: color, opacity: 0.3 } },
              { type: 'circle', shape: { cx: xMid, cy: y, r: 5 }, style: { fill: color } },
              { type: 'line', shape: { x1: xStart, y1: y, x2: xEnd, y2: y }, style: { stroke: color, lineWidth: 2 } }
            ]
          };
        },
        data: [
          { name: '收藏→购买', value: [-0.49, 4.11, 8.82, 1, 'not_sig'] },
          { name: '加购→购买', value: [2.35, 6.76, 10.58, 0, 'sig'] }
        ]
      },
      { type: 'scatter', data: [[0, 0], [0, 1]], symbolSize: 0, markLine: { silent: true, symbol: 'none', lineStyle: { color: rule, type: 'dashed', width: 1 }, data: [{ xAxis: 0, label: { formatter: 'ATE=0', color: muted, fontSize: 10 } }] } }
    ]
  });
  window.addEventListener('resize', function() { chart8.resize(); });

  // ==========================================
  // Chart 9: Sensitivity Analysis
  // ==========================================
  var chart9 = echarts.init(document.getElementById('chart-sensitivity'), null, { renderer: 'svg' });
  chart9.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, backgroundColor: bg3, borderColor: rule, textStyle: { color: ink } },
    grid: { left: 140, right: 40, top: 20, bottom: 30 },
    xAxis: { type: 'value', name: 'ATE (pp)', nameTextStyle: { color: muted }, axisLabel: { color: muted, fontSize: 10 }, splitLine: { lineStyle: { color: rule } }, axisLine: { lineStyle: { color: rule } }, min: 0, max: 12 },
    yAxis: { type: 'category', data: ['卡尺0.02+有放回', '卡尺0.02+无放回', '卡尺0.01+有放回', '卡尺0.01+无放回'], axisLabel: { color: ink2, fontSize: 10 }, axisLine: { lineStyle: { color: rule } } },
    series: [{
      type: 'bar',
      data: [6.82, 6.76, 6.65, 6.71],
      barWidth: 18,
      itemStyle: { color: accent, borderRadius: [0, 4, 4, 0] },
      label: { show: true, position: 'right', color: ink2, fontSize: 11, fontFamily: 'JetBrainsMono', formatter: '{c} pp' },
      markLine: { silent: true, symbol: 'none', lineStyle: { color: accent2, type: 'dashed', width: 1 }, label: { formatter: '均值: 6.74pp', color: accent2, fontSize: 10 }, data: [{ type: 'average', name: '均值' }] }
    }]
  });
  window.addEventListener('resize', function() { chart9.resize(); });

  // ==========================================
  // Chart 10: Strategy Priority Matrix
  // ==========================================
  var chart10 = echarts.init(document.getElementById('chart-strategy-matrix'), null, { renderer: 'svg' });
  chart10.setOption({
    animation: false,
    tooltip: { appendToBody: true, backgroundColor: bg3, borderColor: rule, textStyle: { color: ink }, formatter: function(p) { return p.data[3]; } },
    grid: { left: 55, right: 30, top: 30, bottom: 30 },
    xAxis: { type: 'value', name: '实施难度 →', nameTextStyle: { color: muted }, axisLabel: { color: muted, fontSize: 10 }, splitLine: { lineStyle: { color: rule } }, axisLine: { lineStyle: { color: rule } }, min: 0, max: 10 },
    yAxis: { type: 'value', name: '业务影响 →', nameTextStyle: { color: muted }, axisLabel: { color: muted, fontSize: 10 }, splitLine: { lineStyle: { color: rule } }, axisLine: { lineStyle: { color: rule } }, min: 0, max: 10 },
    series: [{
      type: 'scatter',
      symbolSize: function(val) { return val[2] * 5; },
      data: [
        [2, 9, 10, '加购助推\n难度:低 影响:高', accent],
        [4, 7, 7, '决策干预\n难度:中 影响:中高', accent2],
        [6, 8, 8, '大促蓄水\n难度:中高 影响:高', accent2],
        [3, 6, 6, '品类推荐\n难度:低 影响:中', success],
        [8, 5, 5, '冷启动特征\n难度:高 影响:中', muted]
      ],
      itemStyle: { color: function(p) { return p.data[4]; }, opacity: 0.8 },
      label: { show: true, position: 'top', color: ink2, fontSize: 10, fontWeight: 700, formatter: function(p) { return p.data[3].split('\n')[0]; } },
      markArea: {
        silent: true,
        data: [
          [{ xAxis: 0, yAxis: 5, itemStyle: { color: 'rgba(16,185,129,0.05)' } }, { xAxis: 5, yAxis: 10 }],
          [{ xAxis: 5, yAxis: 5, itemStyle: { color: 'rgba(245,158,11,0.05)' } }, { xAxis: 10, yAxis: 10 }]
        ]
      }
    }]
  });
  window.addEventListener('resize', function() { chart10.resize(); });

  // ==========================================
  // Chart 11: User Segmentation Strategy
  // ==========================================
  var chart11 = echarts.init(document.getElementById('chart-user-strategy'), null, { renderer: 'svg' });
  chart11.setOption({
    animation: false,
    tooltip: { trigger: 'item', appendToBody: true, backgroundColor: bg3, borderColor: rule, textStyle: { color: ink }, formatter: '{b}: {c} 人 ({d}%)' },
    legend: { bottom: 0, textStyle: { color: muted, fontSize: 10 } },
    series: [{
      type: 'pie',
      radius: ['45%', '75%'],
      center: ['50%', '45%'],
      itemStyle: { borderRadius: 4, borderColor: bg, borderWidth: 3 },
      label: { color: ink2, fontSize: 10, formatter: '{b}\n{d}%' },
      data: [
        { value: 2800, name: '核心用户', itemStyle: { color: success } },
        { value: 2200, name: '潜力用户', itemStyle: { color: accent } },
        { value: 3100, name: '沉睡用户', itemStyle: { color: muted } },
        { value: 1900, name: '流失预警', itemStyle: { color: danger } }
      ]
    }]
  });
  window.addEventListener('resize', function() { chart11.resize(); });

  // ==========================================
  // Chart 12: Roadmap Gantt
  // ==========================================
  var chart12 = echarts.init(document.getElementById('chart-roadmap'), null, { renderer: 'svg' });
  var ganttTasks = ['Phase 1: 商品属性特征', 'Phase 2: 在线学习', 'Phase 3: AB实验', 'Phase 4: 全量上线'];
  var ganttData = [
    { name: 'Phase 1', value: [0, 3], itemStyle: { color: accent } },
    { name: 'Phase 2', value: [2, 5], itemStyle: { color: accent2 } },
    { name: 'Phase 3', value: [4, 8], itemStyle: { color: success } },
    { name: 'Phase 4', value: [7, 10], itemStyle: { color: danger } }
  ];
  chart12.setOption({
    animation: false,
    tooltip: { appendToBody: true, backgroundColor: bg3, borderColor: rule, textStyle: { color: ink }, formatter: function(p) { return p.name + '<br/>周期: 第' + p.value[0] + '周 - 第' + p.value[1] + '周'; } },
    grid: { left: 140, right: 30, top: 20, bottom: 30 },
    xAxis: { type: 'value', name: '周次', nameTextStyle: { color: muted }, axisLabel: { color: muted, fontSize: 10 }, splitLine: { lineStyle: { color: rule } }, axisLine: { lineStyle: { color: rule } }, min: 0, max: 12 },
    yAxis: { type: 'category', data: ganttTasks.reverse(), axisLabel: { color: ink2, fontSize: 10 }, axisLine: { lineStyle: { color: rule } } },
    series: [{
      type: 'custom',
      renderItem: function(params, api) {
        var catIdx = api.value(3);
        var y = api.coord([0, catIdx])[1];
        var xStart = api.coord([api.value(0), catIdx])[0];
        var xEnd = api.coord([api.value(1), catIdx])[0];
        var color = api.value(4);
        return {
          type: 'rect',
          shape: { x: xStart, y: y - 10, width: xEnd - xStart, height: 20 },
          style: { fill: color, borderRadius: 4, opacity: 0.85 }
        };
      },
      data: [
        { name: 'Phase 1', value: [0, 3, 3, accent], itemStyle: { color: accent } },
        { name: 'Phase 2', value: [2, 5, 2, accent2], itemStyle: { color: accent2 } },
        { name: 'Phase 3', value: [4, 8, 1, success], itemStyle: { color: success } },
        { name: 'Phase 4', value: [7, 10, 0, danger], itemStyle: { color: danger } }
      ],
      encode: { x: [0, 1], y: 3 }
    }]
  });
  window.addEventListener('resize', function() { chart12.resize(); });

  // ==========================================
  // Chart 13: DAG (Causal Graph)
  // ==========================================
  var chart13 = echarts.init(document.getElementById('chart-dag'), null, { renderer: 'svg' });
  chart13.setOption({
    animation: false,
    tooltip: { appendToBody: true, backgroundColor: bg3, borderColor: rule, textStyle: { color: ink } },
    series: [{
      type: 'graph',
      layout: 'force',
      force: { repulsion: 400, edgeLength: [120, 200], gravity: 0.1 },
      roam: false,
      draggable: false,
      data: [
        { name: '加购行为', symbolSize: 50, itemStyle: { color: accent2 }, label: { show: true, color: ink2, fontSize: 12, fontWeight: 700 } },
        { name: '收藏行为', symbolSize: 40, itemStyle: { color: '#6366f1' }, label: { show: true, color: ink2, fontSize: 11, fontWeight: 700 } },
        { name: '购买行为', symbolSize: 55, itemStyle: { color: success }, label: { show: true, color: ink2, fontSize: 12, fontWeight: 700 } },
        { name: '用户活跃度', symbolSize: 35, itemStyle: { color: muted }, label: { show: true, color: muted, fontSize: 10 } },
        { name: '商品热度', symbolSize: 35, itemStyle: { color: muted }, label: { show: true, color: muted, fontSize: 10 } },
        { name: '品类偏好', symbolSize: 35, itemStyle: { color: muted }, label: { show: true, color: muted, fontSize: 10 } },
        { name: '价格敏感度', symbolSize: 30, itemStyle: { color: '#334155' }, label: { show: true, color: '#475569', fontSize: 9 } }
      ],
      links: [
        { source: '加购行为', target: '购买行为', lineStyle: { color: accent2, width: 3, curveness: 0.1 } },
        { source: '收藏行为', target: '购买行为', lineStyle: { color: '#6366f1', width: 2, curveness: 0.1 } },
        { source: '用户活跃度', target: '加购行为', lineStyle: { color: muted, width: 1, curveness: 0.1 } },
        { source: '用户活跃度', target: '收藏行为', lineStyle: { color: muted, width: 1, curveness: 0.1 } },
        { source: '用户活跃度', target: '购买行为', lineStyle: { color: muted, width: 1, curveness: 0.1 } },
        { source: '商品热度', target: '加购行为', lineStyle: { color: muted, width: 1, curveness: 0.1 } },
        { source: '商品热度', target: '购买行为', lineStyle: { color: muted, width: 1, curveness: 0.1 } },
        { source: '品类偏好', target: '加购行为', lineStyle: { color: muted, width: 1, curveness: 0.1 } },
        { source: '品类偏好', target: '购买行为', lineStyle: { color: muted, width: 1, curveness: 0.1 } },
        { source: '价格敏感度', target: '购买行为', lineStyle: { color: '#334155', width: 1, type: 'dashed', curveness: 0.1 }, label: { show: true, formatter: '未观测', color: '#475569', fontSize: 8 } }
      ],
      lineStyle: { opacity: 0.8 },
      emphasis: { focus: 'adjacency', lineStyle: { width: 3 } }
    }]
  });
  window.addEventListener('resize', function() { chart13.resize(); });

  // ==========================================
  // Chart 14: Macro Periods Comparison (三阶段对比)
  // ==========================================
  var chart14 = echarts.init(document.getElementById('chart-macro-periods'), null, { renderer: 'svg' });
  chart14.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, backgroundColor: bg3, borderColor: rule, textStyle: { color: ink } },
    legend: { data: ['日均浏览', '日均购买', '转化率'], bottom: 0, textStyle: { color: muted, fontSize: 11 }, icon: 'roundRect' },
    grid: { left: 60, right: 60, top: 20, bottom: 48 },
    xAxis: {
      type: 'category',
      data: ['蓄水期\n11.18-12.10', '爆发期\n12.11-12.13', '长尾期\n12.14-12.18'],
      axisLabel: { color: ink2, fontSize: 11, fontWeight: 700 },
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false }
    },
    yAxis: [
      {
        type: 'value', name: '人数', nameTextStyle: { color: muted, fontSize: 10 },
        axisLabel: { color: muted, fontSize: 10 }, splitLine: { lineStyle: { color: rule } },
        axisLine: { lineStyle: { color: rule } }
      },
      {
        type: 'value', name: '转化率(%)', nameTextStyle: { color: muted, fontSize: 10 },
        axisLabel: { color: muted, fontSize: 10, formatter: '{value}%' },
        splitLine: { show: false },
        axisLine: { lineStyle: { color: rule } },
        min: 0, max: 60
      }
    ],
    series: [
      {
        name: '日均浏览', type: 'bar', barWidth: 28, barGap: '30%',
        data: [
          { value: 6447, itemStyle: { color: accent } },
          { value: 7380, itemStyle: { color: accent2 } },
          { value: 6678, itemStyle: { color: '#6366f1' } }
        ],
        label: { show: true, position: 'top', color: ink2, fontSize: 10, formatter: '{c}' },
        itemStyle: { borderRadius: [4, 4, 0, 0] }
      },
      {
        name: '日均购买', type: 'bar', barWidth: 28,
        data: [
          { value: 1495, itemStyle: { color: '#1e40af' } },
          { value: 2278, itemStyle: { color: '#d97706' } },
          { value: 1593, itemStyle: { color: '#4338ca' } }
        ],
        label: { show: true, position: 'top', color: ink2, fontSize: 10, formatter: '{c}' },
        itemStyle: { borderRadius: [4, 4, 0, 0] }
      },
      {
        name: '转化率', type: 'line', yAxisIndex: 1,
        data: [23.2, 30.9, 23.7],
        lineStyle: { color: success, width: 3 },
        itemStyle: { color: success },
        symbol: 'circle', symbolSize: 10,
        label: { show: true, color: success, fontSize: 11, fontWeight: 700, formatter: '{c}%', distance: 12 }
      }
    ]
  });
  window.addEventListener('resize', function() { chart14.resize(); });

  // ==========================================
  // Chart 15: Weekly Behavior Pattern (周度模式)
  // ==========================================
  var chart15 = echarts.init(document.getElementById('chart-weekly-pattern'), null, { renderer: 'svg' });
  chart15.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true, backgroundColor: bg3, borderColor: rule, textStyle: { color: ink } },
    legend: { data: ['日均浏览', '日均购买', '转化率'], bottom: 0, textStyle: { color: muted, fontSize: 11 }, icon: 'roundRect', itemGap: 12 },
    grid: { left: 50, right: 50, top: 20, bottom: 56 },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLabel: { color: ink2, fontSize: 11 },
      axisLine: { lineStyle: { color: rule } },
      axisTick: { show: false }
    },
    yAxis: [
      {
        type: 'value', name: '人数', nameTextStyle: { color: muted, fontSize: 10 },
        axisLabel: { color: muted, fontSize: 10 }, splitLine: { lineStyle: { color: rule } },
        axisLine: { lineStyle: { color: rule } }
      },
      {
        type: 'value', name: '转化率(%)', nameTextStyle: { color: muted, fontSize: 10 },
        axisLabel: { color: muted, fontSize: 10, formatter: '{value}%' },
        splitLine: { show: false },
        axisLine: { lineStyle: { color: rule } },
        min: 15, max: 35
      }
    ],
    series: [
      {
        name: '日均浏览', type: 'bar', barWidth: 16, barGap: '20%',
        data: [
          { value: 6540, itemStyle: { color: accent } },
          { value: 6480, itemStyle: { color: accent } },
          { value: 6510, itemStyle: { color: accent } },
          { value: 6550, itemStyle: { color: accent } },
          { value: 6600, itemStyle: { color: accent } },
          { value: 6700, itemStyle: { color: accent2 } },
          { value: 7080, itemStyle: { color: accent2 } }
        ],
        itemStyle: { borderRadius: [4, 4, 0, 0] },
        label: { show: true, position: 'top', color: ink2, fontSize: 9, formatter: '{c}' }
      },
      {
        name: '日均购买', type: 'line', smooth: true,
        data: [1500, 1480, 1510, 1520, 1550, 1580, 1590],
        lineStyle: { color: success, width: 3 },
        itemStyle: { color: success },
        symbol: 'circle', symbolSize: 8,
        label: { show: true, color: success, fontSize: 10, formatter: '{c}' }
      },
      {
        name: '转化率', type: 'line', yAxisIndex: 1, smooth: true,
        data: [22.9, 22.8, 23.2, 23.2, 23.5, 23.6, 22.5],
        lineStyle: { color: danger, width: 2, type: 'dashed' },
        itemStyle: { color: danger },
        symbol: 'diamond', symbolSize: 8,
        label: { show: true, color: danger, fontSize: 10, formatter: '{c}%' }
      }
    ]
  });
  window.addEventListener('resize', function() { chart15.resize(); });

})();