const configFile = [
  '脉搏（次/分）',
  '心率（次/分）',
  '体温',
  '呼吸(次/分)',
  '血压(mmHg)',
  '总入量(ml)',
  '总出量(ml)',
  '大便(次/日)',
  '体重(kg)',
  '身高(cm)',
  '是否降痛',
  '是否物理降温',
  '物理降温温度',
  '测量位置',
  '降痛目标',
  '出量-大便(ml)',
  '出量-呕吐(ml)',
  '出量-小便(ml)',
  '出量-引流(ml)',
  '出量-痰量(ml)',
  '出量-其他(ml)',
  '静脉入量(ml）',
  '口服入量（ml）',
  '鼻饲入量（ml）',
  '其他入量（ml）',
  '是否重复测量',
  '疼痛评分'
]
// 中间展示维度
const left = 20 // 左边距离，左右边距
const top = 180 // 上边距离，标题到姓名那一行的距离
const rowSpacing = 18 // 每小格宽度，正方形的边长
const tRowNum = 3 // 头部行数，时间轴往上的行数
const mRowNum = 42 // 中部行数，红线贯穿的那几行，包括时间轴
// 左侧坐标轴第一行数据
const YAxisDataTop = [
  {
    name: '脉 搏',
    position: [left + rowSpacing - 5, top + rowSpacing - 10]
  },
  {
    name: '(次/分)',
    position: [left + rowSpacing - 5, top + rowSpacing + 6]
  },
  {
    name: 180,
    position: [left + rowSpacing - 2, top + 2 * rowSpacing + 5]
  },
  {
    name: '温 度',
    position: [left + 4 * rowSpacing - 5, top + rowSpacing - 10]
  },
  {
    name: '(℃)',
    position: [left + 4 * rowSpacing, top + rowSpacing + 6]
  },
  {
    name: 42,
    position: [left + 4 * rowSpacing + 3, top + 2 * rowSpacing + 5]
  },
  {
    name: '呼 吸',
    position: [left + 7 * rowSpacing - 2, top + rowSpacing - 10]
  },
  {
    name: '(次/分)',
    position: [left + 7 * rowSpacing - 6, top + rowSpacing + 6]
  },
  {
    name: 90,
    position: [left + 7 * rowSpacing + 4, top + 2 * rowSpacing + 5]
  }
]

// 三测单左侧轴数据
const YAxisData = [
  [160, 41, 80],
  [140, 40, 70],
  [120, 39, 60],
  [100, 38, 50],
  [80, 37, 40],
  [60, 36, 30],
  [40, 35, 20]
]

export {
  configFile, left, top, rowSpacing, tRowNum, mRowNum, YAxisDataTop, YAxisData
}
