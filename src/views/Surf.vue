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
        <el-button plain @click="goToRegister">立刻加入 Tonna ></el-button>
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

    <div style="text-align:center;padding-top:80px;">
      <span style="font-size:45px;font-weight:200;">畅游生活，想你所想</span>
      <div><span style="font-size:20px;font-weight:100;">Travel through life, think what you think</span></div>
    </div>
    <el-row style="padding-top:40px;">
       <el-col :xs="24" :sm="5" :md="3" :lg="3" :xl="6">
        &nbsp;
      </el-col>
      <el-col :xs="24" :sm="8" :md="8" :lg="9" :xl="6">
        <img src="../assets/surf/surf_img_1.png" width="100%">
        <div>
          <span style="font-size:20px;font-weight:light;">这便是你要的，生活的初衷。</span>
          <div style="padding-right:40px;padding-top:5px;">
            <span style="font-size:14px;font-weight:lighter;">在一回首间，才忽然发现，原来，我一生的种种努力，不过只为了周遭的人对我满意而已。为了搏得他人的称许与微笑，我战战兢兢地将自己套入所有的模式所有的桎梏。走到途中才忽然发现，我只剩下一副模糊的面目，和一条不能回头的路。 ——席慕蓉 《独白》</span>
          </div>
        </div>
      </el-col>
       <el-col :xs="24" :sm="8" :md="8" :lg="9" :xl="6">
        <img src="../assets/surf/surf_img_2.png" width="100%">
        <div style="padding-left:10px;">
        <span style="font-size:20px;font-weight:light;">生活，就是保持一份初心。</span>
        <div style="padding-right:40px;padding-top:5px;">
            <span style="font-size:14px;font-weight:lighter;">现在我们能够做的，是找一个静静的地方，让自己静静的思考，明白该如何做，才能够不让珍贵的东西，重要的人再次失去，明白该如何做，同样的错误不会再次发生。从中吸取经验，吸取力量，继续坚定的前行，寻找喜欢的东西，碰到真爱的人，去做正确的事。 ——席慕蓉</span>
        </div>
        </div>
      </el-col>
       <el-col :xs="24" :sm="5" :md="3" :lg="3" :xl="6">
        &nbsp;
      </el-col>
    </el-row>

     <div style="text-align:center;padding-top:100px;">
      <span style="font-size:45px;font-weight:200;">一切，都触手可及</span>
      <div><span style="font-size:20px;font-weight:100;">Everything is within reach</span></div>
    </div>
    <el-row style="padding-top:30px;">
      <el-col :xs="24" :sm="13" :md="16" :lg="17" :xl="6">
        <img src="../assets/surf/surf_img_3.png" width="100%"/>
      </el-col>
      <el-col :xs="24" :sm="11" :md="8" :lg="7" :xl="6">
        <div style="padding-top:30px;padding-left:10px;">
          <span style="font-size:30px;font-weight:200;">源于生活的“小氛围”</span>
          <div style="padding-top:50px;">
            <div>
              <span>让每个人都感受生活的乐趣与快乐，</span>
            </div>
             <div>
              <span>这便是我想并愿意做的。</span>
            </div>
             <div style="padding-top:40px;">
               <span>BY Designer: TONY</span><img src="../assets/surf/tonna.png" width="25%" style="padding-left:20px;"/>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
      
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
    <Foot></Foot>
  </div>
  
</div>

</template>

<script>
import Foot from '../components/Foot'
export default {
  components: { Foot },
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
    },
    goToRegister() {
      this.$router.push('/register')
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
  background: url('../assets/surf/surf_bg5.png')  no-repeat;
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
    /* background: url('../assets/surf/surf_bg2.png')  no-repeat; */
    background: url('../assets/surf/surf_bg5.png')  no-repeat;
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

