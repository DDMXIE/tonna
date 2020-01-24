<template>
  <div>
      <back-top></back-top>
      <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="16">
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
                    </el-col>
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
            <div style="text-align:center;padding-top:20px;padding-bottom:20px;">
              <el-row>
                <el-col :span="24">
                  <el-button type="success" round style="width:60%;">阅读更多</el-button>
                </el-col>
              </el-row>
            </div>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import BackTop from '../components/BackTop'
import Bread from '../components/Bread'
import ArticlePage from '../views/ArticlePage'
// import Aplayer from 'vue-aplayer'
export default {
  components: { Bread, ArticlePage, BackTop },
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
