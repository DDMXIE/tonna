<template>
<div>
  <back-top></back-top>
    <el-row>
    <el-col :xs="24" :sm="24" :md="8" :lg="7" :xl="8"  style="margin-bottom:15px;">
          <el-card style="margin-left:10px;margin-right:10px;">
            <div style="text-align:center;">
                <div style="padding-top:50px;">
                </div>
                <div>
                  <div class="demo-fit">
                    <!-- 头像 div -->
                    <div class="block">
                        <el-avatar shape="circle" :size="120"  :src="userInfo[0].user_IMG"></el-avatar>
                    </div>
                    <!-- 用户名 div -->
                    <div style="padding-top:10px;">
                      <span style="font-weight:bold;font-size:20px;" >{{userInfo[0].user_NAME}}</span>
                    </div>
                    <!-- 按钮 div -->
                    <div style="padding-top:60px;">
                      <el-badge :value="1" class="item" type="primary">
                        <el-button size="small">关注</el-button>
                      </el-badge>
                      <el-divider direction="vertical"></el-divider>
                      <el-badge :value="2" class="item" type="warning">
                        <el-button size="small">粉丝</el-button>
                      </el-badge>
                      <el-divider direction="vertical"></el-divider>
                      <el-badge :value="2" class="item">
                        <el-button size="small">文章</el-button>
                      </el-badge>
                    </div>
                    <!-- 文字 div -->
                    <div style="padding-top:30px;">
                      <el-divider content-position="center">
                        <div style="width:140px;">
                          <span style="font-weight:400;font-size:10px;">{{userInfo[0].user_INTRODUCE}}</span>
                        </div>
                      </el-divider>
                    </div>
                  </div>
                </div>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="20" :md="12" :lg="14" :xl="16" style="padding-left:20px;padding-right:20px;">
          <el-tabs value="first" @tab-click="handleClick">
               <el-tab-pane name="first">
                  <span slot="label" style="font-size:16px;"><i class="el-icon-message-solid"></i> 动态</span>
                </el-tab-pane>
                <el-tab-pane name="second">
                  <span slot="label" style="font-size:16px;"><i class="el-icon-s-opportunity"></i> 关注</span>
                </el-tab-pane>
                <el-tab-pane name="third">
                  <span slot="label" style="font-size:16px;"><i class="el-icon-s-management"></i> 文章</span>
                </el-tab-pane>
          </el-tabs>
          <div v-if="tabIndex === '0'">
            <div>
                <ul class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled"  style="padding-left:0;overflow:auto">
                  <li v-for="item in activityList" class="infinite-list-item" style="list-style:none">
                    <div v-if="item.activityType === '1' && item.talkData!== null">
                      <div style="padding-bottom:5px;">
                            <el-row>
                              <el-col :span="1.5"> <el-avatar :size="25" :src="item.userInfo[0].user_IMG"></el-avatar></el-col>
                              <el-col :span="22.5">
                                <span style="padding-left:10px;color:#797979;font-size:13px;">发表了评论</span>
                                <span style="padding-left:10px;color:#797979;font-size:13px;">{{item.talkData[0].create_DATE}}</span>
                              </el-col>
                            </el-row>
                            <div><span>{{item.talkData[0].reply_CONTENT}}</span></div>
                      </div>
                      <div style="padding-left:20px;border-left:3px solid #b9b9b9;">
                       <div>
                          <el-row style="margin:0;">
                            <el-col :xs="18" :sm="19" :md="24" :lg="24" :xl="16">
                              <div style="word-wrap:break-word;">
                                <span class="article-title title-control" @click="showArticle(item.talkArticleData[0])">{{item.talkArticleData[0].article.article_TITLE}}</span>
                                <div><span class="article-introduce introduce-control">{{item.talkArticleData[0].article_INTRODUCE}}</span></div>
                              </div>
                            </el-col>
                          </el-row>
                        </div>
                        <div>
                          <div>
                            <i class="el-icon-user-solid" style="font-size:16px;"/>
                            <span class="text-detail">{{item.talkArticleData[0].article_AUTHOR}}</span>
                            <i class="el-icon-chat-line-square" style="font-size:16px;"/>
                            <span class="text-detail">{{item.talkArticleData[0].talk_NUM}}</span>
                            <img src="../assets/article/heart2.png" width="16px;" style="cursor:pointer;">
                            <span style="font-size:12px;padding-left:5px;padding-right:15px;color:#bf2727;">{{item.talkArticleData[0].like_NUM}}</span>
                          </div>
                        </div>
                        </div>
                         <el-divider></el-divider>  
                    </div>
                    <div v-if="item.activityType === '2' && item.likeData!== null">
                      <div v-if="item.likeAriticleData[0].img_URL && item.likeAriticleData[0].img_URL.length!==0">
                        <div>
                          <el-row style="margin:0;">
                             <div style="padding-bottom:5px;">
                               <el-row>
                                 <el-col :span="1.5"> <el-avatar :size="25" :src="item.userInfo[0].user_IMG"></el-avatar></el-col>
                                 <el-col :span="22.5">
                                   <span style="padding-left:10px;color:#797979;font-size:13px;">喜欢了文章</span>
                                   <span style="padding-left:10px;color:#797979;font-size:13px;">{{item.likeData[0].create_DATE}}</span>
                                 </el-col>
                               </el-row>
                              </div>
                            <el-col :xs="18" :sm="19" :md="18" :lg="19" :xl="16">
                              <div style="word-wrap:break-word;padding-right:30px;">
                                <span class="article-title title-control" @click="showArticle(item.likeAriticleData[0])">{{item.likeAriticleData[0].article.article_TITLE}}</span>
                                <div><span class="article-introduce introduce-control">{{item.likeAriticleData[0].article_INTRODUCE}}</span></div>
                              </div>
                            </el-col>
                            <el-col :xs="6" :sm="5" :md="6" :lg="5" :xl="16">
                              <div class="img-wrap">
                                <!-- <img :src="item.img_URL[0]"> -->
                                <el-image :src="item.likeAriticleData[0].img_URL[0]" :fit="'cover'" style="width: 110px; height: 110px">
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
                            <span class="text-detail">{{item.likeAriticleData[0].article_AUTHOR}}</span>
                            <i class="el-icon-chat-line-square" style="font-size:16px;"/>
                            <span class="text-detail">{{item.likeAriticleData[0].talk_NUM}}</span>
                            <img src="../assets/article/heart2.png" width="16px;" style="cursor:pointer;">
                            <span style="font-size:12px;padding-left:5px;padding-right:15px;color:#bf2727;">{{item.likeAriticleData[0].like_NUM}}</span>
                          </div>
                        </div>
                         <el-divider></el-divider>
                    </div>
                    <div v-else>
                        <div>
                          <el-row style="margin:0;">
                            <el-col :xs="18" :sm="19" :md="24" :lg="24" :xl="16">
                              <div style="word-wrap:break-word;">
                                <span class="article-title title-control" @click="showArticle(item.likeAriticleData[0])">{{item.likeAriticleData[0].article.article_TITLE}}</span>
                                <div><span class="article-introduce introduce-control">{{item.likeAriticleData[0].article_INTRODUCE}}</span></div>
                              </div>
                            </el-col>
                          </el-row>
                        </div>
                        <div>
                          <div>
                            <i class="el-icon-user-solid" style="font-size:16px;"/>
                            <span class="text-detail">{{item.likeAriticleData[0].article_AUTHOR}}</span>
                            <i class="el-icon-chat-line-square" style="font-size:16px;"/>
                            <span class="text-detail">{{item.likeAriticleData[0].talk_NUM}}</span>
                            <img src="../assets/article/heart2.png" width="16px;" style="cursor:pointer;">
                            <span style="font-size:12px;padding-left:5px;padding-right:15px;color:#bf2727;">{{item.likeAriticleData[0].like_NUM}}</span>
                          </div>
                        </div>
                         <el-divider></el-divider>
                    </div>
                    </div>
                    <div v-if="item.activityType === '3' && item.attentionData!== null">
                       <div style="padding-bottom:5px;">
                        <el-row>
                          <el-col :span="1.5"> <el-avatar :size="25" :src="item.userInfo[0].user_IMG"></el-avatar></el-col>
                          <el-col :span="22.5">
                            <span style="padding-left:10px;color:#797979;font-size:13px;">关注了作者</span>
                            <span style="padding-left:10px;color:#797979;font-size:13px;">{{item.attentionData[0].create_DATE}}</span>
                          </el-col>
                        </el-row>
                      </div>
                      <el-card class="user-card">
                        <div>
                          <el-row>
                            <el-col :xs="8" :sm="6" :md="5" :lg="4" :xl="16"><img :src="item.attentionUserData[0].user_IMG" width="60px" class="user-img" @click="goToUserPage(item.attentionUserData[0].user_ID)"/></el-col>
                            <el-col :xs="16" :sm="18" :md="19" :lg="20" :xl="16">
                              <span style="font-size:24px;font-weight:900;">{{item.attentionUserData[0].user_NAME}}</span>
                              <el-button type="info" round style="float:right;">您已关注</el-button>  
                            </el-col>
                          </el-row>
                          <div class="link-top"></div>
                          <span style="font-size:14px;">个人简介：{{item.attentionUserData[0].user_INTRODUCE}}</span>
                        </div>
                      </el-card>
                      <el-divider style="background-color:#b5b5b5;"></el-divider>
                    </div>
                  </li>
                </ul>
                <p v-if="loading"><i class="el-icon-loading" style="padding-right:5px;"/>加载中...</p>
                <p v-if="loading=== false">没有更多了喔！</p>
            </div>
          </div>
        </el-col>
        <el-col :xs="0" :sm="4" :md="4" :lg="3" :xl="16">

        </el-col>
    </el-row>
  </div>
</template>

<script>
import BackTop from '../components/BackTop'
import utilFunction from '../utilFunction'
import { findUserActivityByPage } from '@/api'
export default {
  components: { BackTop },
  data() {
    return {
      loading: false,
      tabIndex: '0',
      activeName: 'second',
      userInfo: [{
        user_ID: '',
        user_NAME: '',
        user_IMG: '',
        user_TEL: '',
        user_INTRODUCE: ''
      }],
      pageSize: {
        start: 0,
        end: 3
      },
      activityList: [],
      count: 0
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      console.log(this.$route.query.userId)
      this.loadUserAcivity()
    },
    loadUserAcivity() {
      var params = {}
      params.userId = this.$route.query.userId
      params.start = this.pageSize.start
      params.end = this.pageSize.end
      console.log(params)
      findUserActivityByPage(params).then(res => {
        console.log('***', res)
        this.loading = false
        for (var s = 0; s < res.data.data.length; s++) {
          this.activityList.push(res.data.data[s])
        }
        for (var i = 0; i < this.activityList.length; i++) {
          if (this.activityList[i].activityType === '1' && this.activityList[i].talkData !== null) {
            this.activityList[i].talkData[0].create_DATE = utilFunction.timeFormat(this.activityList[i].talkData[0].create_DATE, '.')
          } else if (this.activityList[i].activityType === '2' && this.activityList[i].likeData !== null) {
            this.activityList[i].likeData[0].create_DATE = utilFunction.timeFormat(this.activityList[i].likeData[0].create_DATE, '.')
          } else if (this.activityList[i].activityType === '3' && this.activityList[i].attentionData !== null) {
            this.activityList[i].attentionData[0].create_DATE = utilFunction.timeFormat(this.activityList[i].attentionData[0].create_DATE, '.')
          }
        }
        this.userInfo = this.activityList[0].userInfo
      })
    },
    handleClick(tab, event) {
      this.tabIndex = tab.index
      console.log(tab.index)
    },
    load() {
      this.loading = true
      setTimeout(() => {
        this.pageSize.start += 3
        this.loadUserAcivity()
      }, 500)
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
    },
    goToUserPage(id) {
      console.log('goToUserPage', id)
      var params = {}
      params.userId = id
      const details = this.$router.resolve({
        path: '/index/userPage',
        query: params,
        params: { catId: params.userId }
      })
      window.open(details.href, '_blank')
    }
  },
  computed: {
    noMore() {
      return this.activityList.length < 0
    },
    disabled() {
      return this.loading || this.noMore
    }
  }
}
</script>

<style scoped>
  .text-detail{
    font-size:12px;
    padding-left:5px;
    padding-right:15px;
  }
  .article-title{
    font-size: 16px;
    font-weight: bold
  }
  .article-title:hover{
    text-decoration: underline;
    cursor: pointer;
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
  .user-img{
    border-radius:50px;
    cursor:pointer;
  }
  .user-card{
    background-color:#f5f5f5;
    width:80%
  }
   .link-top {
    width: 100%;
    height: 1px;
    margin-top:10px;
    padding-bottom: 7px;
    border-top: solid #d4d4d4 1px;
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
  .user-card{
    background-color:#f5f5f5;
    width:100%
  }
}
</style>
