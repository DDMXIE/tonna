<template>
  <div>
    <div style="width:100%;">
      <Bread></Bread>
    </div>
    <div class="lifestyle-div">
      <el-row :gutter="20">
        <el-col :span="16" >
          <div>
            <el-card :body-style="{ padding: '0px' }">
              <div>
                 <div class="amap-wrapper">
                  <el-amap ref="map" class="amap-box" :vid="'amap-vue'"></el-amap>
                </div>
                <!-- <Map></Map> -->
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="8" >
          <el-row>
            <el-col :span="24" style="box-shadow: 0 12px 20px 0 rgba(0, 0, 0, 0.5);padding:0">
              <el-card class="weather-card">
                <div style="padding-top:40px;padding-bottom:10px;">
                  <i class="el-icon-location" style="font-size:25px;color:white"/>
                  <span style="color:white;font-size:26px">
                    {{weatherObj.city}}市
                  </span>
                </div>
                <div style="padding-top:20px;">
                  <span style="color:white;font-size:65px;font-weight:400">
                  {{weatherObj.data[0].tem}}
                  </span>
                </div>
                <div style="padding-top:20px;">
                  <span style="color:white;font-size:19px;font-weight:400">
                  {{weatherObj.data[0].wea}}
                  </span>
                </div>
                <div style="padding-top:10px;">
                  <span style="color:white;font-size:14px;font-weight:400">
                    <i class="el-icon-timer"/>
                  空气指数：{{weatherObj.data[0].air}}
                  </span>
                  <el-divider direction="vertical"></el-divider>
                  <span style="color:white;font-size:14px;font-weight:400">
                  空气质量：{{weatherObj.data[0].air_level}}
                  </span>
                </div>
              </el-card>
            </el-col>
             <el-col :span="24" style="padding-top:20px">
               <el-card >
                 <el-calendar v-model="value">
                </el-calendar>
               </el-card>
            </el-col>
          </el-row>

        </el-col>
      </el-row>
    </div>
  </div>
  
</template>

<script>
import Bread from '../components/Bread'
import Map from '../components/Map'
export default {
  components: { Bread, Map },
  created() {
    this.getWeather()
  },
  data() {
    return {
      // 返回的天气列表
      weatherObj: {
        city: null,
        data: [{
          tem: null
        }]
      },
      value: new Date()
    }
  },
  methods: {
    getWeather() {
      this.$axios.get('https://www.tianqiapi.com/api/?version=v1&cityid=101210101').then(response => {
        this.weatherObj = response.data
        console.log(this.weatherObj)
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>
.lifestyle-div{
  padding-top:50px;
  padding-left:20px;
  padding-right:20px;
}
.weather-card{
  background-image: url("../assets/lifeStyle/weather_bg.jpg");
  background-size: cover;
  text-align: center;
}

.amap-wrapper {
  width: 1200px;
  height: 600px;
}
</style>


