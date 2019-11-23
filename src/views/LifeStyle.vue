<template>
  <div>
    <div style="width:100%;">
      <Bread></Bread>
    </div>
    <div class="lifestyle-div">
      <el-row :gutter="20">
        <el-col :span="mapSpan" v-if="mapSpan === 16">
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
        <el-col :span="weatherSpan">
          <el-row>
            <el-col :span="24" style="box-shadow: 0 12px 20px 0 rgba(0, 0, 0, 0.5);padding:0">
              <el-card class="weather-card">
                <el-button round size="mini" @click="goToWeather">查看7天预报</el-button>
                <div class="weather-city">
                  <i class="el-icon-location" style="font-size:25px;color:white"/>
                  <span style="color:white;font-size:26px">
                    {{weatherObj.city}}市
                  </span>
                </div>
                <div class="detail-div">
                  <span class="weather-detail" style="font-size:65px;">
                  {{weatherObj.data[0].tem}}
                  </span>
                </div>
                <div class="detail-div">
                  <span class="weather-detail" style="font-size:19px;">
                  {{weatherObj.data[0].wea}}
                  </span>
                </div>
                <div style="padding-top:10px;">
                  <span class="weather-detail" style="font-size:14px;">
                    <i class="el-icon-timer"/>
                  空气指数：{{weatherObj.data[0].air}}
                  </span>
                  <el-divider direction="vertical"></el-divider>
                  <span class="weather-detail" style="font-size:14px;">
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
      cityid: '101210101',
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
      this.$axios.get('https://www.tianqiapi.com/api/?appid=63461311&appsecret=BK9Zyj5v&version=v1&cityid=' + this.cityid).then(response => {
        this.weatherObj = response.data
      }).catch(() => {})
    },
    goToWeather() {
      this.$router.push({ path: '/index/weather', query: { cityid: '101210101' }})
    }
  },
  computed: {
    mapSpan() {
      if (document.documentElement.clientWidth < 500) {
        return 24
      } else {
        return 16
      }
    },
    weatherSpan() {
      if (document.documentElement.clientWidth < 500) {
        return 24
      } else {
        return 8
      }
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
  width: 100%;
  height: 600px;
}
.weather-detail{
  color:white;
  font-weight:400;
}
.weather-city{
  padding-top:40px;
  padding-bottom:10px;
}
.detail-div{
  padding-top:20px;
}
</style>


