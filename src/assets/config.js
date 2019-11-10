const configFile = {
  PULSE: '脉搏（次/分）',
  HEART_RATE: '心率（次/分）',
  TEMPRATURE: '体温',
  BREATH: '呼吸(次/分)',
  BLOOD_PRESSURE: '血压(mmHg)',
  EMICTION: '总入量(ml)',
  INTAKE: '总出量(ml)',
  BOWELS_TIMES: '大便(次/日)',
  WEIGHT: '体重(kg)',
  HEIGHT: '身高(cm)',
  IS_REDUCTION_PAIN: '是否降痛',
  IS_PHYSICAL_COOLING: '是否物理降温',
  PHYSICAL_COOLING_TEMPERATURE: '物理降温温度',
  MEASURE_POSITION: '测量位置',
  REDUCTION_PAIN_TARGET: '降痛目标',
  EMICTION_BOWEL: '出量-大便(ml)',
  EMICTION_VOMIT: '出量-呕吐(ml)',
  EMICTION_URINE: '出量-小便(ml)',
  EMICTION_DRAIN: '出量-引流(ml)',
  EMICTION_PHLE: '出量-痰量(ml)',
  EMICTION_OTHER_OUTTAKE: '出量-其他(ml)',
  TRANSFUSION_INTAKE: '静脉入量(ml）',
  ORALLY_INTAKE: '口服入量（ml）',
  NASAL_FEED_INTAKE: '鼻饲入量（ml）',
  OTHER_INTAKE: '其他入量（ml）',
  IS_REPEATED_MEASURE: '是否重复测量',
  PAIN_SCORE: '疼痛评分'
}
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
