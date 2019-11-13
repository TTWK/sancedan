<template>
  <div class="Home">
    <div
      id="main"
      class="main"
      :style="{ width: whStyle.width +'px', height : whStyle.height + 'px' }"
    ></div>
  </div>
</template>

<script>
import eCharts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/graphic'
import { configFile, left, top, rowSpacing, tRowNum, mRowNum, YAxisDataTop, YAxisData } from '../assets/config'
export default {
  name: 'Home',
  data () {
    return {
      whStyle: {},
      tableDatas: null,
      currentWeeks: 0,
      chartData: null,
      tooltipType: {
        isShow: 'none',
        left: 0,
        top: 0,
        text: []
      },
      spinning: 'spinning',
      tableTitle: {
        '姓名: ': '张三',
        '年龄: ': 18,
        '性别: ': '男',
        '科别: ': 'xxx',
        '床号: ': '110',
        '入院日期: ': '-',
        '住院病历号: ': '-'
      },
      tDataKeys: ['日  期', '住院天数', '手术后天数'],
      tRow1: ['2019年11月4日', '2019年11月4日', '2019年11月4日', '2019年11月4日', '2019年11月4日', '2019年11月4日', '2019年11月4日'],
      tRow2: ['1', '2', '3', '4', '5', '6', '7'],
      tRow3: ['1', '2', '3', '4', '5', '6', '7'],
      heartRateData: [60, 80, 70, 75, 70, 90, 60, 80, 70, 75, 70, 90, 60, 80, 70, 75, 70, 90, 60, 80, 70, 75, 70, 90, 60, 80, 70, 75, 70, 90, 60, 80, 70, 75, 70, 90, 60, 80, 70, 75, 70, 90],
      temperatureData: [38, 39, 38, 39, 38, 39, 38, 39, 38, 39, 38, 39, 38, 39, 38, 39, 38, 39, 38, 39, 38, 39, 38, 39, 38, 39, 38, 39, 38, 39, 38, 39, 38, 39, 38, 39, 38, 39, 38, 39, 38, 39],
      breathData: [30, 40, 30, 20, 40, 50, 30, 40, 30, 20, 40, 50, 30, 40, 30, 20, 40, 50, 30, 40, 30, 20, 40, 50, 30, 40, 30, 20, 40, 50, 30, 40, 30, 20, 40, 50, 30, 40, 30, 20, 40, 50],
      tTable: []

    }
  },
  created () {
    let whStyle = {
      height: top + 50 + (43 + Object.keys(configFile).length) * rowSpacing,
      width:
        left * 2 + ((7 + 1) * 6 + 3) * rowSpacing < 962
          ? 962
          : left * 2 + ((7 + 1) * 6 + 3) * rowSpacing
    }
    this.whStyle = whStyle
  },
  mounted () {
    let tableDatas = { left, top, rowSpacing }
    this.currentWeeks = 1
    this.tableDatas = tableDatas
    this.spinning = 'showCharts'
    this.renderECharts(tableDatas, this.whStyle)
  },
  methods: {
    // 绘制拐点的函数
    getInflectionPoint () {
      let inflectionPointList = []
      this.getLinePoints(
        'heartRate',
        this.heartRateData,
        left,
        top,
        mRowNum,
        rowSpacing
      ).forEach(point => {
        let template = {
          type: 'circle',
          shape: {
            cx: point[0],
            cy: point[1],
            r: 3
          },
          style: {
            fill: 'red',
            stroke: 'red'
          }
        }
        inflectionPointList = [...inflectionPointList, template]
      })
      this.getLinePoints(
        'temperature',
        this.temperatureData,
        left,
        top,
        mRowNum,
        rowSpacing
      ).forEach(point => {
        let template = {
          type: 'circle',
          shape: {
            cx: point[0],
            cy: point[1],
            r: 3
          },
          style: {
            fill: 'blue',
            stroke: 'blue'
          }
        }
        inflectionPointList = [...inflectionPointList, template]
      })
      this.getLinePoints(
        'breath',
        this.breathData,
        left,
        top,
        mRowNum,
        rowSpacing
      ).forEach(point => {
        let template = {
          type: 'ring',
          shape: {
            cx: point[0],
            cy: point[1],
            r: 3,
            r0: 0
          },
          style: {
            fill: '#fff',
            stroke: 'blue',
            lineWidth: 1
          }
        }
        inflectionPointList = [...inflectionPointList, template]
      })
      return inflectionPointList
    },
    // 切割数组
    sliceArray (array, size) {
      let result = []
      for (let i = 0; i < Math.ceil(array.length / size); i++) {
        let start = i * size
        let end = start + size
        result.push(array.slice(start, end))
      }
      return result
    },
    // 获取echarts 画板
    renderECharts (tableDatas, whStyle) {
      let self = this
      let TSSParam = {
        columnNum: (7 + 1) * 6 + 3, // 计算有多少列
        ...tableDatas // 包含到上边，左边的距离，格子的宽度
      }
      let tableData = self.getTableData(TSSParam)
      let lineList = [...tableData]
      // console.log(lineList)
      let main = document.getElementById('main')
      let myChart = eCharts.init(main)
      // console.log(whStyle)
      if (whStyle) {
        myChart._zr.painter._height = whStyle.height
        myChart._zr.painter._width = whStyle.width
      }

      myChart.clear()
      myChart.setOption({
        title: {
          show: true,
          text: '体 温 单',
          textStyle: {
            color: '#000',
            fontWeight: 'bold',
            fontSize: 32,
            align: 'left'
          },
          left: 'center',
          top: '20px'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          },
          right: 30,
          top: 30
        },
        series: [],
        graphic: lineList
      })
      console.log(myChart)
    },
    // 时间计算
    timeDifference ($timeOne, $timeTwe) {
      return (
        parseInt(
          (new Date($timeOne).getTime() - new Date($timeTwe).getTime()) /
            (60 * 60 * 24 * 1000)
        ) + 1
      )
    },
    // 拆分数据结构
    splitJson ($dataSet) {
      let dataKeys = []
      let dataValue = []
      for (let key in $dataSet) {
        dataKeys = [...dataKeys, key]
        dataValue = [...dataValue, $dataSet[key]]
      }
      return { keys: dataKeys, values: dataValue }
    },
    // 处理折现数据
    getLinePoints ($type, $polylineData, $left, $top, $mRowNum, $rowSpacing) {
      let pulseData = []
      $polylineData.map((item, index) => {
        let yDistance = 0
        if (item !== '') {
          if ($type === 'pulse' || $type === 'heartRate') {
            yDistance =
              $top + ($mRowNum - 1 - (item - 20) / 4) * $rowSpacing + 2
          } else if ($type === 'temperature') {
            yDistance =
              $top + ($mRowNum - 1 - (item - 34) / 0.2) * $rowSpacing + 2
          } else if ($type === 'breath') {
            yDistance =
              $top + ($mRowNum - 1 - (item - 10) / 2) * $rowSpacing + 2
          }

          let coordinate = [
            $left + (9.5 + index) * $rowSpacing + 3,
            Number.parseInt(yDistance)
          ]
          pulseData = [...pulseData, coordinate]
        }
      })

      return pulseData
    },
    // 绘制图表
    getTableData ($TSSParam) {
      let list = [] // 图表数组
      let top = $TSSParam.top // 顶部距离
      let left = $TSSParam.left // 左侧距离
      let rowSpacing = $TSSParam.rowSpacing // 间距;
      let inspectionCycle = [0, 4, 8, 12, 16, 20] // 巡查间隔数组
      let columnNum = $TSSParam.columnNum // 列数
      let bRowNum = Object.keys(configFile).length + 1 // 尾部行数
      let tDataKeys = this.tDataKeys // 拆分topDataSet 保留key
      let bDataKeys = this.splitJson(configFile).values // 拆分bottomDataSet 保留key
      let tTable = this.tTable
      /* tableTitle数据绘制 */
      let tableTitleList = this.getTableTitle() // 表第一行姓名年龄等一组一组的数据
      list = [...list, ...tableTitleList]

      /* 获取头部部分：水平线 纵向线、以及文字数据录入 */
      let headerTextList = this.getHeaderTextList(tDataKeys, columnNum)
      list = [...list, ...headerTextList]

      /* 坐标轴数据绘制 */
      let yAxisList = this.getYAxisList()
      list = [...list, ...yAxisList]

      /* 中间部分：水平线、纵向线、坐标轴以及数据录入 */
      let middleList = this.getMiddleList(columnNum, inspectionCycle)
      list = [...list, ...middleList]

      /* 页脚部分：水平线、纵向线、以及文字 */
      let bottomList = this.getBottomList(bDataKeys, tTable, bRowNum, columnNum)
      list = [...list, ...bottomList]

      /* 拐点 */
      let inflectionPoint = this.getInflectionPoint()
      list = [...list, ...inflectionPoint]
      let self = this
      list = [
        ...list,
        {
          type: 'polyline',
          shape: {
            points: self.getLinePoints(
              'heartRate',
              this.heartRateData,
              left,
              top,
              mRowNum,
              rowSpacing
            )
          },
          style: {
            fill: null,
            stroke: 'red',
            lineWidth: 2
          }
        },
        {
          type: 'polyline',
          shape: {
            points: self.getLinePoints(
              'temperature',
              this.temperatureData,
              left,
              top,
              mRowNum,
              rowSpacing
            )
          },
          style: {
            fill: null,
            stroke: 'blue',
            lineWidth: 2
          }
        },
        {
          type: 'polyline',
          shape: {
            points: self.getLinePoints(
              'breath',
              this.breathData,
              left,
              top,
              mRowNum,
              rowSpacing
            )
          },
          style: {
            fill: null,
            stroke: 'blue',
            lineWidth: 2
          }
        }
      ]

      return list
    },

    /* tableTitle数据绘制 */
    getTableTitle () {
      let tableTitleList = []
      // 中间数据
      const tableTitle = this.tableTitle
      let addLeft = left + 4
      for (let keys in tableTitle) {
        let stroke = ''
        let fill = ''
        let template = {
          type: 'text',
          top: top - (tRowNum + 2) * rowSpacing + 5,
          left: addLeft,
          cursor: 'auto',
          style: {
            text: keys + tableTitle[keys],
            x: 0,
            y: 0,
            textAlign: 'left',
            textVerticalAlign: 'middle',
            fill: fill,
            font: 'bolder 12px "Microsoft YaHei", sans-serif',
            stroke: stroke,
            lineWidth: 0
          }
        }
        addLeft += (keys.length + JSON.stringify(tableTitle[keys]).length) * 10

        if (
          (keys.indexOf('入院日期') !== -1 || keys.indexOf('床号') !== -1) &&
          tableTitle[keys] !== '-'
        ) {
          addLeft -= tableTitle[keys].length * 4
        }
        tableTitleList.push(template)
      }
      return tableTitleList
    },

    /* 获取头部部分：水平线 纵向线、以及文字数据录入 */
    getHeaderTextList (tDataKeys, columnNum) {
      let listHTML = []
      for (let i = 0; i <= tRowNum; i++) {
        let leftDistance = 0
        let lineLength = 0
        if (i > 2 && i !== tRowNum) {
          leftDistance = left + 6 * rowSpacing
          lineLength = (columnNum - 6) * rowSpacing
        } else {
          leftDistance = left
          lineLength = columnNum * rowSpacing
        }

        listHTML.push({
          type: 'line',
          top: top + (i - 4) * rowSpacing,
          left: leftDistance,
          cursor: 'auto',
          style: {
            stroke: !i ? 'rgb(0, 0, 0)' : 'rgba(0, 0, 0, .45)',
            lineWidth: 1
          },
          shape: {
            x1: 0,
            y1: 0,
            x2: lineLength,
            y2: 0
          }
        })
      }

      for (let j = 0; j <= columnNum; j++) {
        listHTML.push({
          type: 'line',
          top: top - 4 * rowSpacing,
          left: left + j * rowSpacing,
          cursor: 'auto',
          style: {
            stroke:
              !j || j === columnNum ? 'rgb(0, 0, 0)' : 'rgba(0, 0, 0, .45)',
            lineWidth: 1
          },
          shape: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: !j || (j > 3 && !((j - 3) % 6)) ? tRowNum * rowSpacing : 0
          }
        })
        let template = {
          type: 'text',
          top: null,
          left: null,
          cursor: 'auto',
          style: {
            text: null,
            x: 0,
            y: 0,
            textAlign: 'left',
            textVerticalAlign: 'middle',
            fill: '#000',
            font: 'italic none 12px cursive',
            stroke: null,
            lineWidth: 0
          }
        }
        template.top = top - 4 * rowSpacing + 7
        template.left = left + (j * 6) * rowSpacing + 5 + 9 * rowSpacing
        template.style.text = this.tRow1[j]
        listHTML.push(template)
        template = {
          type: 'text',
          top: null,
          left: null,
          cursor: 'auto',
          style: {
            text: null,
            x: 0,
            y: 0,
            textAlign: 'left',
            textVerticalAlign: 'middle',
            fill: '#000',
            font: 'italic none 12px cursive',
            stroke: null,
            lineWidth: 0
          }
        }
        template.top = top - 3 * rowSpacing + 7
        template.left = left + (j * 6) * rowSpacing + 5 + 9 * rowSpacing
        template.style.text = this.tRow2[j]
        listHTML.push(template)
        template = {
          type: 'text',
          top: null,
          left: null,
          cursor: 'auto',
          style: {
            text: null,
            x: 0,
            y: 0,
            textAlign: 'left',
            textVerticalAlign: 'middle',
            fill: '#000',
            font: 'italic none 12px cursive',
            stroke: null,
            lineWidth: 0
          }
        }
        template.top = top - 2 * rowSpacing + 7
        template.left = left + (j * 6) * rowSpacing + 5 + 9 * rowSpacing
        template.style.text = this.tRow3[j]
        listHTML.push(template)
        // 添加头部数据文字
        if (!(j % 6)) {
          for (let k = 0; k < tRowNum; k++) {
            let template = {
              type: 'text',
              top: null,
              left: null,
              cursor: 'auto',
              style: {
                text: null,
                x: 0,
                y: 0,
                textAlign: 'left',
                textVerticalAlign: 'top',
                fill: '#000',
                font: 'bolder 12px "Microsoft YaHei", sans-serif',
                stroke: null,
                lineWidth: 0
              }
            }
            if (!j) {
              template.top = top - (tRowNum + 1 - k) * rowSpacing + 7
              template.left = left + 5
              template.style.text = tDataKeys[k]
            } else {
              if (j === columnNum) break
              let count = j / 6
              template.top = top - (tRowNum + 1 - k) * rowSpacing + 4
              template.left = left + (count * 6 + 3) * rowSpacing + 5
            }
            listHTML.push(template)
          }
        }
      }

      return listHTML
    },

    /* 坐标轴数据绘制 */
    getYAxisList () {
      let yAxisList = []
      YAxisDataTop.map(item => {
        let stroke = ''
        let fill = ''
        if (item.name === '脉 搏') stroke = fill = 'red'
        else if (item.name === '温 度') stroke = fill = 'blue'
        else stroke = fill = 'rgb(0, 0, 0)'
        let template = {
          type: 'text',
          top: item.position[1],
          left: item.position[0],
          cursor: 'auto',
          style: {
            text: item.name,
            x: 0,
            y: 0,
            textAlign: 'left',
            textVerticalAlign: 'middle',
            fill: fill,
            font: 'italic none 12px cursive',
            stroke: stroke,
            lineWidth: 0
          }
        }
        yAxisList.push(template)
      })
      return yAxisList
    },

    /* 中间部分：水平线、纵向线、坐标轴以及数据录入 */
    getMiddleList (columnNum, inspectionCycle) {
      let middleList = []
      for (let key = 0; key <= mRowNum; key++) {
        let leftDistance = 0
        let lineLength = 0

        if (key > 2 && key !== mRowNum) {
          leftDistance = left + 9 * rowSpacing
          lineLength = (columnNum - 9) * rowSpacing
        } else {
          leftDistance = left
          lineLength = columnNum * rowSpacing
        }

        middleList.push({
          type: 'line',
          top: top + (key - 1) * rowSpacing,
          left: leftDistance,
          cursor: 'auto',
          style: {
            stroke:
              key === mRowNum || !((key - 2) % 5)
                ? 'rgba(0, 0, 0, .45)'
                : 'rgba(0, 0, 0, .15)',
            lineWidth: 1
          },
          shape: {
            x1: 0,
            y1: 0,
            x2: lineLength,
            y2: 0
          }
        })

        // 添加左侧y轴文字
        let count = Math.floor((key - 1) / 5) - 1
        if (key !== 2 && key !== mRowNum && (key - 1) % 5 === 1 && count < 7) {
          for (let keys in YAxisData[count]) {
            let lDistance = 0
            if (keys === '0') {
              if (YAxisData[count][keys] >= 100) {
                lDistance = left + rowSpacing - 2
              } else {
                lDistance = left + rowSpacing + 2
              }
            } else if (keys === '1') {
              lDistance = left + 4 * rowSpacing + 3
            } else {
              lDistance = left + 7 * rowSpacing + 4
            }
            let template = {
              type: 'text',
              top: top + (key - 1) * rowSpacing + 4,
              left: lDistance,
              cursor: 'auto',
              style: {
                text: YAxisData[count][keys],
                x: 0,
                y: 0,
                textAlign: 'left',
                textVerticalAlign: 'middle',
                fill: '#000',
                font: 'italic none 12px cursive',
                stroke: null,
                lineWidth: 0
              }
            }
            middleList.push(template)
          }
        }
      }
      for (let index = 0; index <= columnNum; index++) {
        let lineLength = 0
        if (index >= 9 || index === 0 || index === 3 || index === 6) {
          if (index === 3 || index === 6) { lineLength = (mRowNum - 1) * rowSpacing } else lineLength = mRowNum * rowSpacing
        }
        let $stroke
        if (!((index - 3) % 6)) {
          if (index === columnNum) $stroke = 'rgb(0, 0, 0)'
          else if (index === 3 || index === 6) $stroke = 'rgba(0, 0, 0, 0.45)'
          else $stroke = 'red'
        } else {
          if (!index || index === columnNum) $stroke = 'rgb(0, 0, 0)'
          else if (index === 6) $stroke = 'rgba(0, 0, 0, 0.45)'
          else $stroke = 'rgba(0, 0, 0, .15)'
        }
        middleList.push({
          type: 'line',
          cursor: 'auto',
          top: index === 3 || index === 6 ? top : top - rowSpacing,
          left: left + index * rowSpacing,
          style: {
            stroke: $stroke,
            lineWidth: 1
          },
          shape: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: lineLength
          }
        })

        /* 添加巡查时间刻度 */
        let template = {
          type: 'text',
          top: top - 10,
          left:
            inspectionCycle[index % 6] >= 10
              ? left + (index + 3) * rowSpacing + 3
              : left + (index + 3) * rowSpacing + 7,
          cursor: 'auto',
          style: {
            text: inspectionCycle[index % 6],
            x: 0,
            y: 0,
            textAlign: 'left',
            textVerticalAlign: 'middle',
            fill: '#000',
            font: 'italic none 12px cursive',
            stroke: null,
            lineWidth: 0
          }
        }
        if (index >= 6 && index < columnNum - 3) {
          middleList.push(template)
        } else if (index === 0) {
          template.left = left + 5
          template.style.text = '时间'
          middleList.push(template)
        }
      }
      return middleList
    },

    /* 页脚部分：水平线、纵向线、以及文字 */
    getBottomList (bDataKeys, tTable, bRowNum, columnNum) {
      let bottomList = []
      for (let keys = 0; keys <= bRowNum; keys++) {
        let leftDistance = 0
        let lineLength = 0

        if (keys > 0 && keys !== bRowNum) {
          leftDistance = left
          lineLength = columnNum * rowSpacing
        }

        bottomList.push({
          type: 'line',
          cursor: 'auto',
          top: top + (mRowNum + keys - 1) * rowSpacing,
          left: leftDistance,
          style: {
            stroke:
              keys === bRowNum - 1 ? 'rgb(0, 0, 0)' : 'rgba(0, 0, 0, .45)',
            lineWidth: 1
          },
          shape: {
            x1: 0,
            y1: 0,
            x2: lineLength,
            y2: 0
          }
        })
      }
      for (let indexs = 0; indexs <= columnNum; indexs++) {
        let lineLength = 0
        if (indexs >= 9) {
          if (!((indexs - 3) % 6)) {
            lineLength = (bRowNum - 1) * rowSpacing
          } else if (!(indexs % 3)) {
            lineLength = rowSpacing
          }
        } else if (indexs === 0) {
          lineLength = (bRowNum - 1) * rowSpacing
        }
        bottomList.push({
          type: 'line',
          cursor: 'auto',
          top: top + (mRowNum - 1) * rowSpacing,
          left: left + indexs * rowSpacing,
          style: {
            stroke:
              !indexs || indexs === columnNum
                ? 'rgb(0, 0, 0)'
                : 'rgba(0, 0, 0, .45)',
            lineWidth: 1
          },
          shape: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: lineLength
          }
        })

        let template = {
          type: 'text',
          top: null,
          left: null,
          cursor: 'auto',
          style: {
            text: null,
            x: 0,
            y: 0,
            textAlign: 'left',
            textVerticalAlign: 'middle',
            fill: '#000',
            font: 'italic none 12px cursive',
            stroke: null,
            lineWidth: 0
          }
        }
        template.top = top + (mRowNum - 1) * rowSpacing + 7
        template.left = left + (indexs * 6) * rowSpacing + 5 + 9 * rowSpacing
        template.style.text = tTable[indexs]
        bottomList.push(template)

        // 添加页脚数据集
        if (!(indexs % 6)) {
          let count = indexs / 6
          for (let k = 0; k < bRowNum - 1; k++) {
            if (indexs === columnNum) break
            if (!count) {
              // 第一列
              let template = {
                type: 'text',
                top: null,
                left: null,
                cursor: 'auto',
                style: {
                  text: null,
                  x: 0,
                  y: 0,
                  textAlign: 'left',
                  textVerticalAlign: 'middle',
                  fill: '#000',
                  font: 'italic none 12px cursive',
                  stroke: null,
                  lineWidth: 0
                }
              }
              template.top = top + (mRowNum - 1 + k) * rowSpacing + 7
              template.left = left + 5
              template.style.text = bDataKeys[k]
              bottomList.push(template)
            }
          }
        }
      }
      return bottomList
    }
  }
}
</script>
