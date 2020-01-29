<template>
  <div v-loading="loading">
      <back-top></back-top>
      <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="16">
            <div style="padding-top:10px;" v-for="item in articleData">
              <el-card v-if="item.img_URL.length!==0">
                <div>
                  <el-row style="margin:0;">
                    <el-col :xs="18" :sm="19" :md="18" :lg="19" :xl="16">
                      <div style="word-wrap:break-word;padding-right:30px;">
                        <span class="article-title title-control" @click="showArticle(item)">{{item.article.article_TITLE}}</span>
                        <div><span class="article-introduce introduce-control">{{item.article_INTRODUCE}}</span></div>
                      </div>
                    </el-col>
                     <el-col :xs="6" :sm="5" :md="6" :lg="5" :xl="16">
                      <div class="img-wrap">
                        <!-- <img :src="item.img_URL[0]"> -->
                        <el-image :src="item.img_URL[0]" :fit="'cover'" style="width: 110px; height: 110px">
                          <div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                          </div>
                        </el-image>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div>
                  <div>
                    <i class="el-icon-user-solid" style="font-size:16px;"/>
                    <span class="text-detail">{{item.article_AUTHOR}}</span>
                    <i class="el-icon-chat-line-square" style="font-size:16px;"/>
                    <span class="text-detail">{{item.talk}}</span>
                    <img src="../assets/article/heart2.png" width="16px;" style="cursor:pointer;">
                    <span style="font-size:12px;padding-left:5px;padding-right:15px;color:#bf2727;">{{item.like}}</span>
                  </div>
                </div>
              </el-card>
              <el-card v-else>
                 <div>
                  <el-row style="margin:0;">
                    <el-col :xs="18" :sm="19" :md="24" :lg="24" :xl="16">
                      <div style="word-wrap:break-word;">
                        <span class="article-title title-control" @click="showArticle(item)">{{item.article.article_TITLE}}</span>
                        <div><span class="article-introduce introduce-control">{{item.article_INTRODUCE}}</span></div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <div>
                  <div>
                    <i class="el-icon-user-solid" style="font-size:16px;"/>
                    <span class="text-detail">{{item.article_AUTHOR}}</span>
                    <i class="el-icon-chat-line-square" style="font-size:16px;"/>
                    <span class="text-detail">{{item.talk}}</span>
                    <img src="../assets/article/heart2.png" width="16px;" style="cursor:pointer;">
                    <span style="font-size:12px;padding-left:5px;padding-right:15px;color:#bf2727;">{{item.like}}</span>
                  </div>
                </div>
              </el-card>
            </div>
            <div style="text-align:center;padding-top:20px;padding-bottom:20px;">
              <el-row>
                <el-col :span="24">
                  <i v-if="iconLoading === true" class="el-icon-loading" />
                  <el-button v-else type="success" round style="width:60%;" @click="readMore">阅读更多</el-button>
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
import { findAllArticle } from '@/api'
// import Aplayer from 'vue-aplayer'
export default {
  props: {
    articleType: {
      type: String,
      default: ''
    }
  },
  components: { Bread, ArticlePage, BackTop },
  data() {
    return {
      loading: true,
      iconLoading: false,
      // isLike: false, // 是否添加喜欢
      fit: 'cover', // 头像类型
      url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=656257457,1108249792&fm=26&gp=0.jpg', // 头像url
      currentDate: new Date(),
      articleData: [
        {
          article: {},
          img_URL: '',
          article_INTRODUCE: '',
          article_AUTHOR: ''
        }
      ],
      content: '',
      typeId: '',
      pageSize: {
        start: 0,
        end: 2
      }
    }
  },
  methods: {
    readMore() {
      this.iconLoading = true
      var params = {}
      params.typeId = this.typeId
      this.pageSize.start = this.pageSize.start + 2
      params.start = this.pageSize.start
      params.end = this.pageSize.end
      findAllArticle(params).then(res => {
        if (res.data.data.length === 0) {
          this.$notify({
            title: '通知',
            iconClass: 'el-icon-message-solid',
            message: '我是有底线的喔！',
            position: 'bottom-right'
          })
        } else {
          for (var i = 0; i < res.data.data.length; i++) {
            this.articleData.push(res.data.data[i])
          }
        }
        this.iconLoading = false
      })
    },
    showArticle(item) {
      var params = {}
      params.articleId = item.article.article_ID
      const details = this.$router.resolve({
        path: '/index/articleDetail',
        query: params,
        params: { catId: params.articleId }
      })
      window.open(details.href, '_blank')
    }
  },
  watch: {
    articleType: {
      immediate: true, // 深度监听
      handler: function(val) {
        console.log(val)
        this.typeId = val
        this.pageSize.start = 0
        this.pageSize.end = 2
        var params = {}
        params.typeId = val
        params.start = this.pageSize.start
        params.end = this.pageSize.end
        console.log('params', params)
        findAllArticle(params).then(res => {
          console.log('--------------res-------------', res)
          this.articleData = res.data.data
          this.loading = false
          // this.content = res.data.data[2].article_INTRODUCE
        })
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
  .text-detail{
    font-size:12px;
    padding-left:5px;
    padding-right:15px;
  }
  .article-title{
    font-size: 20px;
    font-weight: bold
  }
  .article-title:hover{
    text-decoration: underline;
    cursor: pointer;
  }
  .img-wrap {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    overflow: hidden;
  }
  .img-wrap img  {
    position: absolute;
    width: 100%;
    height:100%;
  }
  .article-introduce{
    font-size: 13px;
    padding-top: 10px;
    color: #999;
    font-weight: 500;
  }
  .title-control{
    overflow: hidden;
    text-overflow: ellipsis; 
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .introduce-control{
    overflow: hidden;
    text-overflow: ellipsis; 
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  @media(max-width:500px){
    .article-title{
      font-size: 15px;
      font-weight: bold
    }
    .introduce-control{
      -webkit-line-clamp: 2;
    }
    .title-control{
      -webkit-line-clamp: 1;
    }
  }
</style>
