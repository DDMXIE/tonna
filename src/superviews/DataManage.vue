<template>
  <div style="width:100%;">
    <el-row>
      <el-col :span="6" v-for="(item,index) in infoList" :key="index">
        <el-card :style="{marginLeft:'20px',marginRight:'20px',backgroundColor:item.bgcolor}">
          <div>
            <i v-if="item.infoName === '用户总数'" class="el-icon-s-custom card-icon"/>
            <i v-else-if="item.infoName === '笔记发表'" class="el-icon-s-management card-icon"/>
            <i v-else-if="item.infoName === '收藏总量'" class="el-icon-star-on card-icon"/>
            <i v-else-if="item.infoName === '评论总量'" class="el-icon-chat-dot-square card-icon"/>
            <span style="color:white;">{{item.infoName}}</span>
            <div style="text-align:center;">
              <span style="font-size:40px;font-weight:900;color:white;">{{item.num}}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div style="padding-top:10px;">
      <el-row>
        <el-col :span="14">
          <el-card>
            <div>
              <el-row>
                <el-col>
                   <div id="functionChart" :style="{width: '100%', height: '300px'}"></div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" style="text-align:center;">
                  <div style="padding-top:20px;padding-bottom:25px;">
                    <span style="font-size:20px;font-weight:500;">用户好评度</span>
                  </div>
                  <el-progress type="dashboard" :stroke-width="10" :percentage="percentage" :color="colors"></el-progress>
                </el-col>
                <el-col :span="12">
                   <div style="padding-top:20px;">
                    <span style="font-size:20px;font-weight:500;">笔记占比</span>
                  </div>
                  <div v-for="item in articleTypeObj" >
                    <div>
                      <span style="float:right;font-size:10px;">{{item.typeName}}</span>
                      <el-progress :text-inside="true" :stroke-width="18" :percentage="(Math.floor((parseInt(item.num)/articleTotalNum*100)))" :color="customColorMethod(item)"></el-progress>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
        <el-col :span="10">
          <el-card>
             <div id="articleTypeChart" :style="{width: '100%', height: '500px'}"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
  
</template>

<script>
import { findAriticleTypeNum, findSystemInfo } from '../api'
export default {
  data() {
    return {
      systemInfoObj: {},
      articleTypeObj: [],
      articleTotalNum: 0,
      percentage: 10,
      percentage2: 0,
      likeDataNum: 90,
      colors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ],
      infoList: [{
        infoName: '用户总数',
        num: '0',
        // bgcolor: '#006b89'
        bgcolor: '#c64b2b'
      },
      {
        infoName: '笔记发表',
        num: '0',
        // bgcolor: '#a6bfc3'
        bgcolor: '#f9ce8c'
      }, {
        infoName: '收藏总量',
        num: '0',
        // bgcolor: '#e2b477'
        bgcolor: '#2ab3c4'
      }, {
        infoName: '评论总量',
        num: '0',
        // bgcolor: '#b97914'
        bgcolor: '#589bad'
      }],
      articleTypeChart: null,
      functionChart: null,
      echarsOption: {
        title: {
          text: 'Tonna笔记数据统计',
          subtext: '实时更新',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: []
        },
        series: [
          {
            name: '笔记类型',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [

            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      functionChartsOption: {
        title: {
          text: '访问及功能图'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    }
  },
  mounted() {
    this.drawLine()
    this.loadSystemInfo()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  created() {
    this.loadArticleTypeNum()
  },
  methods: {
    increase() {
      while (this.percentage < this.likeDataNum) {
        this.percentage += 1
      }
    },
    customColorMethod(item) {
      if (((item.num / this.articleTotalNum) * 100) < 10) {
        return '#5e7ce2'
      } else if (((item.num / this.articleTotalNum) * 100) < 20) {
        return '#db3a34'
      } else if (((item.num / this.articleTotalNum) * 100) < 30) {
        return '#177e89'
      } else if (((item.num / this.articleTotalNum) * 100) < 70) {
        return '#e6a23c'
      } else {
        return '#67c23a'
      }
    },
    drawLine() {
    // 基于准备好的dom，初始化echarts实例
      this.articleTypeChart = this.$echarts.init(document.getElementById('articleTypeChart'), 'light')
      this.functionChart = this.$echarts.init(document.getElementById('functionChart'), 'light')
      if (document.documentElement.clientWidth > 500) {
        this.echarsOption.toolbox = {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: false, type: ['line', 'bar'] },
            restore: { show: false },
            saveAsImage: { show: true }
          }
        }
        this.functionChartsOption.toolbox = {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: false, type: ['line', 'bar'] },
            restore: { show: false },
            saveAsImage: { show: true }
          }
        }
      }
      // 绘制图表
      this.articleTypeChart.setOption(this.echarsOption)
      this.functionChart.setOption(this.functionChartsOption)
    },
    loadArticleTypeNum() {
      findAriticleTypeNum().then(res => {
        this.articleTypeObj = res.data.data
        this.loadArticleChartData()
      })
    },
    loadArticleChartData() {
      var options = this.articleTypeChart.getOption()
      options.series.data = []
      options.legend.data = []
      for (var i = 0; i < this.articleTypeObj.length; i++) {
        var obj = {}
        obj.value = this.articleTypeObj[i].num
        obj.name = this.articleTypeObj[i].typeName
        options.legend[0].data.push(this.articleTypeObj[i].typeName)
        options.series[0].data.push(obj)
        this.articleTotalNum += this.articleTypeObj[i].num
      }
      this.articleTypeChart.setOption(options)
      this.increase()
    },
    // loadSystemInfo() {
    //   findSystemInfo().then(res => {
    //     console.log('---------------res----------', res)
    //     this.systemInfoObj = res.data.data
    //   })
    // },
    loadSystemInfo() {
      var that = this
      this.timer = setInterval(function() {
        // 执行内容
        findSystemInfo().then(res => {
          that.systemInfoObj = res.data.data
          for (var i = 0; i < that.infoList.length; i++) {
            if (that.infoList[i].infoName === '用户总数') {
              that.infoList[i].num = that.systemInfoObj.userNum
            } else if (that.infoList[i].infoName === '笔记发表') {
              that.infoList[i].num = that.systemInfoObj.articleNum
            } else if (that.infoList[i].infoName === '收藏总量') {
              that.infoList[i].num = that.systemInfoObj.collectNum
            } else if (that.infoList[i].infoName === '评论总量') {
              that.infoList[i].num = that.systemInfoObj.talkNum
            }
          }
        })
      }, 300)
    }

  }
}
</script>

<style scoped>
.card-icon{
  font-size: 20px;
  color: white;
  padding-right: 8px;
}
</style>
