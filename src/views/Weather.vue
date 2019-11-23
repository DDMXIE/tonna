<template>
  <div style="width:100%;">
    <div style="width:100%;">
      <Bread></Bread>
    </div>
    <div class="weather-div">
      <el-row>
        <el-col :span="24">
          <el-card class="weather-title-card" :style="{backgroundImage: seasonImageUrl}">
             <div style="padding-top:50px;">
               <span class="weather-title-span">{{seasonName}}</span>
             </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" :lg="7" :xl="6">
          <el-card class="weather-card" :body-style="{ padding: '0px' }">
             <div class="subtitle-div">
               <span class="subtitle-span">今日天气</span>
               <div style="float:right;">
                  <!-- <i class="el-icon-location" style="padding-right:10px;color:#ec6fa0;font-size:24px;"></i> -->
                  <el-cascader
                    placeholder="试试搜索：北京"
                    :options="options"
                    filterable
                   ></el-cascader>
               </div>
             </div>
             <div class="today-div">
               <div>
                  <img :src="todayImgUrl" width="30%">
               </div>
               <div style="padding-bottom:10px;">
                  <span class="today-title">{{weatherObj.data[0].wea}}</span> 
               </div>
              
                <el-collapse accordion>
                    <el-collapse-item v-for="(item,index) in weatherObj.data[0].hours" :key="index">
                      <template slot="title">
                        <span style="padding-left:20px;">{{item.day}}</span>&nbsp;
                        <i class="header-icon el-icon-info"></i>
                      </template>
                      <div>气温：{{item.tem}}</div>
                      <div>天气：{{item.wea}}</div>
                      <div>风向：{{item.win}}</div>
                      <div>风力：{{item.win_speed}}</div>
                    </el-collapse-item>
               </el-collapse>

             </div>
          </el-card>
        </el-col>

         <el-col :xs="24" :sm="12" :md="16" :lg="17" :xl="18">
           <el-card class="weather-card" :body-style="{ padding: '0px' }">
             <div class="subtitle-div">
               <span class="subtitle-span">未来七天内气温</span>
             </div>
             <div id="myChart" :style="{width: '100%', height: '500px'}"></div>
          </el-card>
           
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Bread from '../components/Bread'
export default {
  components: { Bread },
  data() {
    return {
      myChart: null,
      seasonImageUrl: '',
      seasonName: '',
      weatherObj: {
        data: [{
          wea: ''
        }]
      },
      todayImgUrl: '',
      echarsOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {

        },
        legend: {
          data: ['最高温', '最低温', '平均温度']
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '温度',
            min: 0,
            max: 40,
            interval: 8,
            axisLabel: {
              formatter: '{value} °C'
            }
          },
          {
            type: 'value',
            name: '温度',
            min: -10,
            max: 40,
            interval: 5,
            axisLabel: {
              formatter: '{value} °C'
            }
          }
        ],
        series: [
          {
            name: '最高温',
            type: 'bar',
            data: []
          },
          {
            name: '最低温',
            type: 'bar',
            data: []
          },
          {
            name: '平均温度',
            type: 'line',
            yAxisIndex: 1,
            data: []
          }
        ]
      },
      options: []
    }
  },
  mounted() {
    this.drawLine()
  },
  created() {
    this.getWeather(this.$route.query.cityid)
    this.loadSeasonImage()
  },
  methods: {
    getWeather(cityid) {
      this.$axios.get('https://www.tianqiapi.com/api/?appid=63461311&appsecret=BK9Zyj5v&version=v1&cityid=' + cityid).then(response => {
        this.weatherObj = response.data
        console.log(this.weatherObj)
        this.todayImgUrl = require('../assets/weather/' + this.weatherObj.data[0].wea_img + '.png')
        this.loadEchartsData()
      }).catch(() => {})
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById('myChart'), 'light')
      if (document.documentElement.clientWidth > 500) {
        this.echarsOption.toolbox = {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        }
      }
      // 绘制图表
      this.myChart.setOption(this.echarsOption)
    },
    loadSeasonImage() {
      var date = new Date()
      var str = date.getMonth()
      if (str >= 3 && str < 6) { // 春
        this.seasonName = '春'
        this.seasonImageUrl = 'url(' + require('../assets/weather/weather_spring.jpg') + ')'
      } else if (str >= 6 && str < 9) { // 夏
        this.seasonName = '夏'
        this.seasonImageUrl = 'url(' + require('../assets/weather/weather_summer.jpg') + ')'
      } else if (str >= 9 && str < 12) { // 秋
        this.seasonName = '秋'
        this.seasonImageUrl = 'url(' + require('../assets/weather/weather_bg2.jpg') + ')'
      } else { // 冬
        this.seasonName = '冬'
        this.seasonImageUrl = 'url(' + require('../assets/weather/weather_winter.jpg') + ')'
      }
    },
    loadEchartsData() {
      var dayArr = []
      var temArr = []
      var tem1Arr = []
      var tem2Arr = []
      for (var i = 0; i < this.weatherObj.data.length; i++) {
        dayArr.push(this.weatherObj.data[i].day.match(/(\S*)（/)[1])
        temArr.push(this.weatherObj.data[i].tem.match(/(\S*)℃/)[1])
        tem1Arr.push(this.weatherObj.data[i].tem1.match(/(\S*)℃/)[1])
        tem2Arr.push(this.weatherObj.data[i].tem2.match(/(\S*)℃/)[1])
      }
      var options = this.myChart.getOption()
      options.xAxis[0].data = dayArr
      options.series[0].data = tem1Arr
      options.series[1].data = tem2Arr
      options.series[2].data = temArr
      this.myChart.setOption(options)
    }
  }
}
</script>

<style scoped>
.weather-div{
  padding-top:50px;
  padding-left:20px;
  padding-right:20px;
}
.weather-title-card{
  text-align:center;
  /* background-image: ; */
  background-size: cover;
  height: 280px;
}
.weather-title-span{
  font-size: 100px;
  font-weight: 500;
  margin-top: 80px;
  color: white;
  /* text-shadow:1px 1px 1px #000; padding:10px 0; color:#FFF;  */
}
.subtitle-div{
/* text-align: center; */
  padding: 10px 10px 10px 15px;
}
.subtitle-span{
  font-size: 24px;
  
}
.today-div{
  /* background-image: url("../assets/weather/weather_today.jpg"); */
  /* background-size: cover; */
  background-color: #f4f4f4;
  text-align: center;
}
.today-title{
  font-size: 23px;
  font-weight: 500;
  color:#5b6265;
}
.weather-card{
  margin-top:10px;
}
</style>
