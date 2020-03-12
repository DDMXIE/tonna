<template>
  <div style="width:100%">
    <div>
      <img src="../assets/other/collect_bg.png" width="100%" />
      <el-row>
          <el-col :xs="24" :sm="2" :md="3" :lg="5" :xl="16">
              <div>&nbsp;</div>
            </el-col>
         <el-col :xs="24" :sm="19" :md="18" :lg="14" :xl="16">
            <div style="padding-top:10px;" v-for="item in articleData">
              <el-card v-if="item.img_URL.length!==0">
                <div>
                  <el-row style="margin:0;">
                    <el-col :xs="18" :sm="19" :md="18" :lg="19" :xl="16">
                      <div style="word-wrap:break-word;padding-right:30px;">
                        <span class="article-title title-control" @click="showArticle(item)">{{item.article.article_TITLE}}</span>
                        <!-- <span class="article-title title-control" @click="showArticle(item)">{{item.article.article_TITLE}}</span> -->
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
                    <span class="text-detail">{{item.talk_NUM}}</span>
                    <img src="../assets/article/heart2.png" width="16px;" style="cursor:pointer;">
                    <span style="font-size:12px;padding-left:5px;padding-right:15px;color:#bf2727;">{{item.like_NUM}}</span>
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
                    <span class="text-detail">{{item.talk_NUM}}</span>
                    <img src="../assets/article/heart2.png" width="16px;" style="cursor:pointer;">
                    <span style="font-size:12px;padding-left:5px;padding-right:15px;color:#bf2727;">{{item.like_NUM}}</span>
                  </div>
                </div>
              </el-card>
            </div>
            </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { findCollectByUserId } from '@/api'
export default {
  data() {
    return {
      articleData: []
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.findCollectByUserId()
    },
    findCollectByUserId() {
      var params = {}
      params.userId = this.$store.getters.userId
      findCollectByUserId(params).then(res => {
        console.log(res)
        this.articleData = res.data.data
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
  .right-card{
    margin-top: 5px;
    cursor: pointer;
  }
  .right-card-icon{
    padding-left: 10px;
    font-size:18px;
    color: white;
  }
  .right-card-text{
    font-weight: 900;
    padding-left: 20px;
    color: white;
  }
  @media(max-width:500px){
    .right-card{
      display: none;
    }
    .author-div{
      display: none;
    }
  }
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
