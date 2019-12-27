<template>
  <div>
    <div style="width:100%,">
      <Bread></Bread>
    </div>
    <div>
        <el-row :gutter="20" style="padding-top:50px;padding-right:10px;padding-left:10px;margin:0;"> 
            <!-- 手机个人面板 -->
            <el-col :xs="24" :sm="24" :md="8" :lg="7" :xl="8"  style="margin-bottom:15px;">
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
           

            <el-col :xs="24" :sm="24" :md="16" :lg="17" :xl="16">
              <el-tabs :tab-position="isTabTop" style="height: 100%;">
                  <el-tab-pane label="生活穿搭" v-loading="loading">
                    <ArticlePage></ArticlePage>
                  </el-tab-pane>
                  <el-tab-pane label="好文分享">好文分享</el-tab-pane>
                  <el-tab-pane label="摄影靓图">摄影靓图</el-tab-pane>
                  <el-tab-pane label="技术类分享">技术类分享</el-tab-pane>
              </el-tabs>
            </el-col>


          
            <!-- 右边个人面板 -->
            <!-- <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" v-if="isSmallWidth === false" style="position:fixed;top:80px;right:20px;z-index:999">
              <el-card>
                <div style="text-align:center">
                    <div style="padding-top:50px;">
                    </div>
                    <div>
                      <div class="demo-fit">
                        
                        <div class="block">
                            <el-avatar shape="circle" :size="120" :fit="fit" :src="url"></el-avatar>
                        </div>
                        
                        <div style="padding-top:10px;">
                          <span style="font-weight:bold;font-size:20px;">Tony</span>
                        </div>
                        
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
                        
                        <div style="padding-top:30px;">
                          <el-divider content-position="center">
                            <span style="font-weight:400">善始者实繁，克终者盖寡</span>
                            </el-divider>
                        </div>
                        
                        <div style="padding-top:10px;">
                          <aplayer autoplay
                            :music="{
                              title: 'secret base~君がくれたもの~',
                              artist: 'Silent Siren',
                              src: 'https://music.163.com/一如年少模样.mp3',
                              pic: 'http://img2.imgtn.bdimg.com/it/u=1054720621,4056566051&fm=26&gp=0.jpg'
                            }"
                          />
                        </div>
                      </div>
                    </div>
                </div>
               
              </el-card>
            </el-col> -->
        </el-row>
    </div>   
  </div>
</template>


<script>
import Bread from '../components/Bread'
import ArticlePage from '../views/ArticlePage'
// import Aplayer from 'vue-aplayer'
export default {
  components: { Bread, ArticlePage },
  data() {
    return {
      loading: false,
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
    },
    isTabTop() {
      if (this.isSmallWidth === true || document.documentElement.clientWidth < 1000) {
        return 'top'
      } else {
        return 'right'
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
  .el-loading-mask{
    z-index: 500;
  }
</style>
