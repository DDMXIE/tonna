<template>
<div class="div-surf">
  <!-- <div class="carousel">
     <el-carousel :interval="5000" arrow="always" :height="carouselHeight">
        <el-carousel-item  v-for="(img,index) in imgList" :key="index">
         <img v-bind:src="img.url" width="100%" height="100%">
        </el-carousel-item>
     </el-carousel>
  </div> -->


  <!-- <div>
     <el-divider content-position="center">
       <span class="tip">自古，能善始者实繁，克终者盖寡</span>
     </el-divider>
  </div> -->
  <div class="div-title">
    <div class="div-title-content">
      <div>
        <span class="block-text title-text">Tonna</span>
      </div>
      <span class="block-text">欢迎来到Tonna,你可以在这里尽情享受生活的每分每刻，快来分享你的快乐！</span>
    </div>
  </div>
  <div>
    <el-row>
      <el-col :xs="24" :sm="12" :md="8" :lg="12" :xl="10">
        <el-card>
          <img src="../assets/surf/MBTI.png" width="100%">
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :md="16" :lg="12" :xl="14">
        <el-card>
          <div class="collapse-surf">
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item title="一致性 Consistency" name="1">
                  <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                  <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                </el-collapse-item>
                <el-collapse-item title="反馈 Feedback" name="2">
                  <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                  <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                </el-collapse-item>
                <el-collapse-item title="效率 Efficiency" name="3">
                  <div>简化流程：设计简洁直观的操作流程；</div>
                  <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                  <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                </el-collapse-item>
                <el-collapse-item title="可控 Controllability" name="4">
                  <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                  <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                </el-collapse-item>
            </el-collapse>
          </div>
        </el-card>
      </el-col>
    </el-row>
      
  </div>
  
</div>


</template>

<script>
export default {
  data() {
    return {
      activeName: '1',
      imgList: [{ url: require('../assets/surf/1.jpg') },
        { url: require('../assets/surf/2.jpg') },
        { url: require('../assets/surf/3.jpg') },
        { url: require('../assets/surf/4.jpg') }
      ],
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    }
  },
  created() {
    // this.showUserInfoByToken()
  },
  methods: {
    showUserInfoByToken() {
      try {
        this.axios.get('/user/showUserInfoByToken').then(res => {
          console.log('后端的数据', res.data)
        })
      } catch (error) {
        console.log(error.res)
      }
    }
  },
  computed: {
    carouselHeight() {
      if (document.documentElement.clientWidth < 500) {
        return '160px'
      } else if (document.documentElement.clientWidth > 1700) {
        return '370px'
      } else {
        return '380px'
      }
    }
  }
}
</script>

<style scoped>
.collapse-surf{
  padding-left:5px;
}
.tip{
  color:#989595;
  font-size: 15px;
  font-style: italic;
}
.carousel{
  /* padding-top:10px;
  padding-right:20px; */
}
.div-surf{
  width:100%;
}
.div-title{
  width: 100%;
  background: url('../assets/surf/surf_bg2.png')  no-repeat;
  background-size: 100% auto;
}
.div-title-content{
  padding-top:11%;
  padding-bottom:18%;
  padding-left: 80px;
  display:block;
  width:510px;
  font-size: 30px;
}
.block-text{
  color:white;
  word-wrap:break-word;
}
.title-text{
  font-size:65px;font-weight:900
}

@media(max-width:500px){
  /* 当屏幕最大669时，执行下面css */
  .tip{
    color:#989595;
    font-size: 9px;
    font-style: italic;
  }
  .div-title{
    width: 100%;
    background: url('../assets/surf/surf_bg2.png')  no-repeat;
    background-size: 100% 95%;
  }
  .div-title-content{
    padding-top:10%;
    padding-bottom:15%;
    padding-left: 20px;
    display:block;
    width:170px;
    font-size: 10px;
  }
  .title-text{
    font-size:55px;
    font-weight:900;
  }
}
</style>


<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

