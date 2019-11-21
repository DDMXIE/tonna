<template>
  <div>
    <div style="width:100%,">
      <Bread></Bread>
    </div>
    <div>
        <el-row :gutter="30" style="padding-top:50px;padding-right:10px;padding-left:10px;margin:0;"> 
            <!-- 手机个人面板 -->
            <el-col :xs="24" :sm="12" :md="16" :lg="8" :xl="22" v-if="isSmallWidth === true" style="margin-bottom:15px;">
              <el-card>
                <div style="text-align:center;">
                    <div style="padding-top:50px;">
                    </div>
                    <div>
                      <div class="demo-fit">
                        <!-- 头像 div -->
                        <div class="block">
                            <el-avatar shape="circle" :size="120" :fit="fit" :src="url"></el-avatar>
                        </div>
                        <!-- 用户名 div -->
                        <div style="padding-top:10px;">
                          <span style="font-weight:bold;font-size:20px;">Tony</span>
                        </div>
                        <!-- 按钮 div -->
                        <div style="padding-top:60px;">
                          <el-badge :value="1" class="item" type="primary">
                            <el-button size="small">发表</el-button>
                          </el-badge>
                          <el-divider direction="vertical"></el-divider>
                          <el-badge :value="2" class="item" type="warning">
                            <el-button size="small">评论</el-button>
                          </el-badge>
                          <el-divider direction="vertical"></el-divider>
                          <el-badge :value="2" class="item">
                            <el-button size="small">喜欢</el-button>
                          </el-badge>
                        </div>
                        <!-- 文字 div -->
                        <div style="padding-top:30px;">
                          <el-divider content-position="center">
                            <div style="width:140px;">
                              <span style="font-weight:400;font-size:10px;">善始者实繁，克终者盖寡</span>
                            </div>
                            
                          </el-divider>
                        </div>
                      </div>
                    </div>
                </div>
              </el-card>
            </el-col>
            <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="2">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" v-for="(o, index) in 3" :key="o" >
                  <div style="padding-top:10px;">
                      <el-card :body-style="{ padding: '0px' }">
                        <img src="../assets/water/7.jpg" class="image">
                        <div style="padding: 14px;">
                          <span>测试标题</span>
                          <div class="bottom clearfix">
                            <time class="time">{{ currentDate }}</time>
                            <el-button type="text" class="button">操作按钮</el-button>
                          </div>
                        </div>
                      </el-card>
                  </div>
                </el-col>
              </el-row>
              <div style="padding-top:10px;" v-for="item in 3">
                <el-card>
                  <div>
                    <el-row style="margin:0;">
                      <el-col :span="16">
                          <img src="../assets/article/11.jpg" width="100%">
                      </el-col>
                      <el-col :span="8">
                        <div style="word-wrap:break-word;padding-left:20px">
                          <span>kfjkldsajfkdskljlkdfklsfsdjkfsfsdakfjsdklfjds
                            sjkfdhsjkhfksjfhjksdhfjksdhfkjsdf
                            skdfjhskfhsdkjfdshfdjshfksdjfhsdfhdsf
                            sdfjkdhfjkhajhsfjkhsdkjfh
                            hdshfksdkflkdsjfkljkdfjklj</span>
                        </div>
                      </el-col >
                    </el-row>
                  </div>
                  <div style="padding-top:20px;">
                    <span class="article-title">这是我们的第一次旅行</span>
                    <div style="float:right">
                      <img v-if="isLike === false" src="../assets/article/heart.png" width="30px;" style="cursor:pointer;" @click="likeIt">
                      <img v-else src="../assets/article/heart2.png" width="30px;" style="cursor:pointer;">
                    </div>
                  </div>
                </el-card>
              </div>
            </el-col>


          
            <!-- 右边个人面板 -->
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="22" v-if="isSmallWidth === false" style="position:fixed;top:80px;right:20px;z-index:999">
              <el-card>
                <div style="text-align:center">
                    <div style="padding-top:50px;">
                    </div>
                    <div>
                      <div class="demo-fit">
                        <!-- 头像 div -->
                        <div class="block">
                            <el-avatar shape="circle" :size="120" :fit="fit" :src="url"></el-avatar>
                        </div>
                        <!-- 用户名 div -->
                        <div style="padding-top:10px;">
                          <span style="font-weight:bold;font-size:20px;">Tony</span>
                        </div>
                        <!-- 按钮 div -->
                        <div style="padding-top:60px;">
                          <el-badge :value="1" class="item" type="primary">
                            <el-button size="small">发表</el-button>
                          </el-badge>
                          <el-divider direction="vertical"></el-divider>
                          <el-badge :value="2" class="item" type="warning">
                            <el-button size="small">评论</el-button>
                          </el-badge>
                          <el-divider direction="vertical"></el-divider>
                          <el-badge :value="2" class="item">
                            <el-button size="small">喜欢</el-button>
                          </el-badge>
                        </div>
                        <!-- 文字 div -->
                        <div style="padding-top:30px;">
                          <el-divider content-position="center">
                            <span style="font-weight:400">善始者实繁，克终者盖寡</span>
                            </el-divider>
                        </div>
                        <!-- 播放器 div -->
                        <div style="padding-top:10px;">
                          <!-- <aplayer autoplay
                            :music="{
                              title: 'secret base~君がくれたもの~',
                              artist: 'Silent Siren',
                              src: 'https://music.163.com/一如年少模样.mp3',
                              pic: 'http://img2.imgtn.bdimg.com/it/u=1054720621,4056566051&fm=26&gp=0.jpg'
                            }"
                          /> -->
                        </div>
                      </div>
                    </div>
                </div>
               
              </el-card>
            </el-col>
        </el-row>
    </div>   
  </div>
</template>


<script>
import Bread from '../components/Bread'
// import Aplayer from 'vue-aplayer'
export default {
  components: { Bread },
  data() {
    return {
      isLike: false, // 是否添加喜欢
      fit: 'cover', // 头像类型
      url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=656257457,1108249792&fm=26&gp=0.jpg', // 头像url
      currentDate: new Date()
    }
  },
  methods: {
    likeIt() {
      this.isLike = true
    }
  },
  computed: {
    isSmallWidth() {
      if (document.documentElement.clientWidth < 600) {
        return true
      } else {
        return false
      }
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
  
  html.body{
    margin:0;
    padding:0;
  }

  .article-title{
    font-size: 20px;
    font-weight: bold
  }
</style>
