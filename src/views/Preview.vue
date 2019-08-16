<template>
  <div class="infinite-list-wrapper">
    <ul
      class="list"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
      style="padding-inline-start:0">
      <li v-for="i in count" class="list-item" style="list-style:none;">
        <el-row>
          <el-col :span="6" v-for="(o, index) in 4" :key="o" style="padding:0px 15px 0px 15px">
            <el-card :body-style="{ padding: '0px' }" style="border-radius:30px;margin-bottom:10px" v-for="item of imgArr"> 
              <!-- <img src="../assets/static/water/3.jpg" class="image"> -->
              <img :src="item.imgUrl"  class="image">
              <div style="padding: 14px;">
                <span>火烈鸟</span>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>

        <!-- <el-col :span="8">
        <el-card :body-style="{ padding: '0px' }" style="width:100%">
          <img src="../assets/static/water/3.jpg" class="image" style="width:100%">
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
        </el-col> -->
        </el-row>
      </li>
    </ul>
    <p v-if="loading"><i class="el-icon-loading"/>&nbsp;正在努力加载中...</p>
    <p v-if="noMore">以上是全部内容</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 1,
      loading: false,
      currentDate: new Date(),
      imgArr: [{
        imgUrl: require('../assets/static/water/3.jpg')
      }, {
        imgUrl: require('../assets/static/water/10.jpg')
      }, {
        imgUrl: require('../assets/static/water/1.jpg')
      }, {
        imgUrl: require('../assets/static/water/4.jpg')
      }
      ]
    }
  },
  computed: {
    noMore() {
      return this.count >= 10
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  methods: {
    load() {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 2000)
    }
  }
}
</script>


<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>  
