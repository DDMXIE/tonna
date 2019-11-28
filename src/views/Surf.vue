<template>
<div class="div-surf">
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
      <div class="btn-join">
        <el-button plain>立刻加入 Tonna ></el-button>
      </div>
    </div>
  </div>
  
  <div>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="10">
        <el-card>
          <img src="../assets/surf/MBTI.png" width="100%">
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="14">
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

    <div class="carousel">
      <el-carousel :interval="5000" arrow="always" :height="carouselHeight">
          <el-carousel-item  v-for="(img,index) in imgList" :key="index">
          <img v-bind:src="img.url" width="100%" height="100%">
          </el-carousel-item>
      </el-carousel>
    </div>
      
    <el-row class="row-advertise">
      <el-col :xs="24" :sm="8" :md="8" :lg="10" :xl="6">
        <div class="div-advertise">
           <img src="../assets/surf/surf_iphone.png" style="width:40%;">
        </div>
       
      </el-col>
      <el-col :xs="24" :sm="16" :md="16" :lg="14" :xl="18">
        <div class="div-text-advertise">
          <div>
            <span class="text-advertise-title">全新手机版，现已推出</span>
          </div>
          <div>
            <span class="text-advertise-subtitle">The new mobile version is now available!</span>
          </div>
          <div>
            <img src="../assets/surf/surf_code.png" style="width:22%;padding-top:30px;">
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row>
        <el-col :span="24">
            <div style="padding-top:30px;padding-bottom:30px;text-align:center;">
                <el-button class="btn-join-bottom" type="primary">加入 Tonna</el-button>
            </div>
        </el-col>
    </el-row>

     <el-row class="row-advertise">
        <el-col :span="24">
            <div class="div-tip-bottom">
                <span class="text-tip-bottom-title">Tonna中国 生活博客交流社区</span>
                <el-row :gutter="40">
                  <el-col :xs="24" :sm="15" :md="15" :lg="15" :xl="6">
                    <div style="padding-top:30px;font-size:14px;">
                      <span>Tonna中国 生活博客交流社区是一个致力于分享、发现、生活的专业平台，来自全国各地的每一位生活分享师是我们忠实的用户。世界很大，不如来Tonna逛一逛。</span>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="9" :md="9" :lg="9" :xl="18">
                    <div style="text-align:center;">
                      <img class="tip-bottom-img" src="../assets/surf/tonna2.png">
                    </div>
                  </el-col>
                </el-row>

                <div style="padding-top:30px;">
                  <span>帮助中心</span> ｜ <span>服务条款</span> ｜ <span>联系我们</span> &nbsp;&nbsp;&nbsp;
                  <span>Copyright © 2019 Tonna. 保留所有权利</span>
                </div>
            </div>
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
  padding-bottom:14%;
  padding-left: 80px;
  display:block;
  width:510px;
  font-size: 30px;
}
.div-advertise{
  text-align:center;
  padding-top:40px;
  padding-bottom:40px;
}
.div-text-advertise{
  padding-top:110px;
  text-align:center;
}
.div-tip-bottom{
  padding-left:40px;
  padding-right:40px;
  padding-top:30px;
  padding-bottom: 50px;
}
.row-advertise{
  background-color:#f1f1f1;
  margin-top:40px;
}
.block-text{
  color:white;
  word-wrap:break-word;
}
.title-text{
  font-size:65px;
  font-weight:900;
}
.text-advertise-title{
  font-size: 40px;
}
.text-advertise-subtitle{
  font-size:20px;
}
.text-tip-bottom-title{
  font-size:20px;
  font-weight:500;
}
.btn-join{
  padding-top:40px;
  /* float: right; */
}
.btn-join-bottom{
  width:340px;
  font-size:18px;
}
.tip-bottom-img{
  width:80%;
}
@media(max-width:1200px){
   .div-title-content{
    padding-top:11%;
    padding-bottom:13%;
    padding-left: 80px;
    display:block;
    width:510px;
    font-size: 30px;
  }
  .div-text-advertise{
    padding-top:40px;
    text-align:center;
  }
  .btn-join{
    display: none;
  }
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
  .div-text-advertise{
    padding-top:0px;
    text-align:center;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 40px;
  }
  .text-advertise-title{
    font-size: 30px;
  }
  .text-advertise-subtitle{
    font-size:15px;
  }
  .btn-join{
    display: none;
  }
  .tip-bottom-img{
    padding-top: 30px;
    width:50%;
  }
}

/* @media screen and (min-width: 1201px) { 
.abc {width: 1200px}  
}  */
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

