<template>
  <div>
    <back-top></back-top>
    <transition name="el-zoom-in-bottom">
      <div class="title-div" v-if="showTitle">
        <span class="title-text title-inline-control">{{markdownForm.title}}</span>
      </div>
    </transition>
    <el-row :gutter="10">
      <el-col :xs="0" :sm="4" :md="5" :lg="4" :xl="16">
        &nbsp;
        <div class="left-div">
          <div style="padding-bottom:30px;">
            <el-button icon="el-icon-thumb" circle></el-button>
            <div style="padding-top:3px;"><span style="padding-left:5px;font-size:14px;">点赞</span></div>
          </div>
          <div>
            <el-button icon="el-icon-star-off" circle></el-button>
            <div style="padding-top:3px;"><span style="padding-left:5px;font-size:14px;">收藏</span></div>
          </div>
        </div>
      </el-col>
       <el-col :xs="24" :sm="14" :md="13" :lg="12" :xl="16">
          <div ref="topDiv">
              <div style="padding-top:30px;"><span style="font-size:28px;font-weight:900">{{markdownForm.title}}</span></div>
              <el-row style="padding-top:20px;padding-bottom:20px;padding-left:10px;">
                <el-col :xs="4" :sm="3" :md="2" :lg="2" :xl="16">
                  <el-avatar :src="article.user_IMG"></el-avatar>
                </el-col>
                <el-col :xs="20" :sm="21" :md="22" :lg="22" :xl="16">
                    <div>
                      <span style="font-weight:900">{{article.article_AUTHOR}}</span>
                      <el-button type="success" round size="mini" style="margin-left:12px;">关注</el-button>
                    </div>
                    <div><span style="font-size:14px;color:#797979">{{article.create_DATE}}</span></div>
                </el-col>
              </el-row>
          </div>
          <mavon-editor ref="md" v-model="markdownForm.contentMarkdown" 
          :toolbarsFlag="false" :subfield="false" :defaultOpen="'preview'"
          style="width:100%;"/>
          <el-card>
            <div style="text-align:center;">
              <el-button icon="el-icon-thumb" circle style="margin-right:20px;"></el-button>
              <el-button icon="el-icon-star-off" circle></el-button>
              <div style="padding-top:30px;padding-bottom:20px;">
                 <span >"小礼物刷一刷，加入Tonna关注我"</span>
              </div>
              <el-button type="primary" round>加入我们</el-button>
              <el-divider><i class="el-icon-collection-tag"></i></el-divider>
            </div>
             <el-row>
                <el-col :xs="4" :sm="3" :md="2" :lg="2" :xl="16">
                  <div>
                    <el-avatar :src="$store.getters.userImg"></el-avatar>
                  </div>
                </el-col>
                <el-col :xs="20" :sm="21" :md="22" :lg="22" :xl="16">
                  <el-input type="textarea" v-model="usertalk" placeholder="写下你的评论"></el-input>
                  <div style="float:right;padding-top:10px;">
                    <el-button type="primary" round size="mini" @click="addTalk">发布</el-button>
                    <el-button round size="mini" @click="cancelTalk">取消</el-button>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <div>
                  <i class="el-icon-s-comment subtitle-text" style="padding-right:10px;color:#409eff"/>
                  <span class="subtitle-text">全部评论</span>
                  <div v-if="talkobj.length !== 0">
                      <div v-for="(item,index) in talkobj" :key="index">
                        <el-divider></el-divider>
                        <el-row>
                          <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="16">
                            <el-avatar :src="item.talk.user_IMG"></el-avatar>
                          </el-col>
                          <el-col :xs="20" :sm="20" :md="21" :lg="22" :xl="16">
                            <div><span style="font-size:18px;font-weight:900;">{{item.talk.owner_NAME}}</span> </div>
                            <div><span style="font-size:10px;color:#a0a0a0;">{{item.talk.create_DATE}}</span></div>
                            <div><span>{{item.talk.reply_CONTENT}}</span></div>
                            <el-button type="warning" round size="mini" icon="el-icon-chat-line-round"
                                       @click="reply(index,'',item)" style="margin-top:10px;">回复</el-button>
                            <div v-if="item.subTalk">
                                <div v-for="(subitem,index2) in item.subTalk" :key="index2">
                                  <el-divider></el-divider>
                                  <el-row>
                                    <el-col :xs="4" :sm="4" :md="3" :lg="2" :xl="16">
                                      <el-avatar :src="subitem.user_IMG"></el-avatar>
                                    </el-col>
                                    <el-col :xs="20" :sm="20" :md="21" :lg="22" :xl="16">
                                      <div>
                                        <span style="font-size:18px;font-weight:900;">{{subitem.owner_NAME}} </span>
                                        <span>回复：{{subitem.target_NAME}}</span>
                                      </div>
                                      <div><span style="font-size:10px;color:#a0a0a0;">{{subitem.create_DATE}}</span></div>
                                      <div><span>{{subitem.reply_CONTENT}}</span></div>
                                      <el-button type="warning" round size="mini" icon="el-icon-chat-line-round"
                                       @click="reply(index,'reply',item,subitem)" style="margin-top:10px;">回复</el-button>
                                    </el-col>
                                  </el-row>
                                </div>
                            </div>
                             <div>
                              
                              <div ref="inputbox" style="display:none;">
                                <div style="padding-top:10px;">
                                  <el-input type="textarea" v-model="replyContent" placeholder="您的回复..."></el-input>
                                  <div style="float:right;padding-top:10px;">
                                    <el-button round size="mini" @click="cancelReply(index)">取消</el-button>
                                    <el-button round size="mini" type="success" @click="submitReply(index)">确定</el-button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                  </div>
                  <div v-else style="text-align:center;">
                    <span>- 暂无评论哦！我先来抢沙发 -</span>
                  </div>
                </div>
              </el-row>
          </el-card>
          <el-card style="margin-top:15px;margin-bottom:40px;">
             <div>
                  <i class="el-icon-s-management subtitle-text" style="padding-right:10px;color:#409eff"/>
                  <span class="subtitle-text">推荐阅读</span>
                  <div v-for="(item,index) in articleData" :key="index">
                    <el-divider></el-divider>
                    <el-row>
                          <div v-if="item.img_URL.length!==0">
                            <el-row style="margin:0;">
                              <el-col :xs="18" :sm="19" :md="18" :lg="19" :xl="16">
                                <div style="word-wrap:break-word;padding-right:30px;">
                                  <span class="article-title title-control" @click="showArticle(item)">{{item.article.article_TITLE}}</span>
                                  <div><span class="article-introduce introduce-control">{{item.article_INTRODUCE}}</span></div>
                                </div>
                              </el-col>
                              <el-col :xs="6" :sm="5" :md="6" :lg="5" :xl="16">
                                <div class="img-wrap">
                                  <el-image :src="item.img_URL[0]" :fit="'cover'" style="width: 110px; height: 110px">
                                    <div slot="placeholder" class="image-slot">
                                      加载中<span class="dot">...</span>
                                    </div>
                                  </el-image>
                                </div>
                              </el-col>
                            </el-row>
                          </div>
                          <div v-else>
                            <el-row style="margin:0;">
                              <el-col :xs="18" :sm="19" :md="24" :lg="24" :xl="16">
                                <div style="word-wrap:break-word;">
                                  <span class="article-title title-control" @click="showArticle(item)">{{item.article.article_TITLE}}</span>
                                  <div><span class="article-introduce introduce-control">{{item.article_INTRODUCE}}</span></div>
                                </div>
                              </el-col>
                            </el-row>
                          </div>
                    </el-row>
                  </div>
                </div>
          </el-card>
      </el-col>
       <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="16">
         <el-card :style="{marginTop: topHeight + 'px'}">
           <div>
                <i class="el-icon-edit subtitle-text" style="padding-right:10px;color:#409eff"/>
                <span class="subtitle-text">撰写信息</span>
           </div>
              <el-row style="padding-top:20px;padding-bottom:20px;padding-left:10px;">
                <el-col :xs="4" :sm="6" :md="6" :lg="4" :xl="16">
                  <el-avatar :src="article.user_IMG"></el-avatar>
                </el-col>
                <el-col :xs="20" :sm="18" :md="18" :lg="20" :xl="16">
                    <div>
                      <span style="font-weight:900">{{article.article_AUTHOR}}</span>
                      <el-button type="success" round size="mini" style="margin-left:12px;">关注</el-button>
                    </div>
                    <div><span style="font-size:14px;color:#797979">{{article.create_DATE}}</span></div>
                </el-col>
              </el-row>
           <div>
                <i class="el-icon-s-management subtitle-text" style="padding-right:10px;color:#409eff"/>
                <span class="subtitle-text">推荐阅读</span>
           </div>
           <el-divider><i class="el-icon-collection-tag"></i></el-divider>
            <div v-for="(item,index) in articleData" :key="index" style="padding-top:5px;padding-bottom:5px;">
              <span class="like-read-text title-inline-control" 
                    @click="showArticle(item)">{{item.article.article_TITLE}}</span>
            </div>
         </el-card>
      </el-col>
    </el-row>
   
  </div>
</template>

<script>
import BackTop from '../components/BackTop'
import utilFunction from '../utilFunction'
import { findAritcleByIdUser, findAllArticle, addOrReplyTalk, findAllTalk } from '@/api'
export default {
  components: { BackTop },
  data() {
    return {
      topHeight: '',
      showTitle: false,
      typeId: '',
      article: {},
      pageSize: {
        start: 0,
        end: 4
      },
      markdownForm: {
        title: '',
        contentMarkdown: ''
      },
      usertalk: '',
      articleData: [
        {
          article: {},
          img_URL: '',
          article_INTRODUCE: '',
          article_AUTHOR: ''
        }
      ],
      talkobj: [
        {
          talk: {},
          subTalk: []
        }],
      replyContent: '',
      showReply: false,
      replyIndex: '',
      subTalkobj: {},
      replyParams: {
        articleId: '',
        replyContent: '',
        ownerId: '',
        ownerName: '',
        replyId: '',
        targetId: '',
        targetName: ''
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.showIcon)
  },
  created() {
    console.log(this.$route.query)
    this.loadData()
  },
  methods: {
    loadData() {
      var params = {}
      params.articleId = this.$route.query.articleId
      findAritcleByIdUser(params).then(res => {
        this.article = res.data.data[0]
        this.article.create_DATE = utilFunction.timeFormat(this.article.article.create_DATE, '/')
        console.log('*********', this.article)
        this.markdownForm.contentMarkdown = res.data.data[0].article.article_CONTENT == null ? '' : res.data.data[0].article.article_CONTENT
        this.markdownForm.title = res.data.data[0].article.article_TITLE == null ? '' : res.data.data[0].article.article_TITLE
        this.typeId = res.data.data[0].article.type_ID
        var obj = {}
        obj.typeId = this.typeId
        obj.start = this.pageSize.start
        obj.end = this.pageSize.end
        findAllArticle(obj).then(res => {
          this.articleData.shift()
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].article.article_ID !== this.$route.query.articleId) {
              this.articleData.push(res.data.data[i])
            }
          }
          this.topHeight = this.$refs.topDiv.offsetHeight
        })
        this.loadTalk()
      })
    },
    showIcon() {
      if (
        !!document.documentElement.scrollTop &&
        document.documentElement.scrollTop > 150
      ) {
        this.showTitle = true
        this.topHeight = document.documentElement.scrollTop
      } else {
        this.showTitle = false
      }
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
    addTalk() {
      if (this.usertalk === '') {
        this.$alert('请先填写再发表评论喔！')
      } else {
        var params = {}
        params.articleId = this.$route.query.articleId
        params.replyId = '0'
        params.replyContent = this.usertalk
        params.ownerId = this.$store.getters.userId
        params.ownerName = this.$store.getters.userName
        addOrReplyTalk(params).then(res => {
          this.usertalk = ''
          this.$notify({
            title: '发布成功',
            message: '评论已发表！',
            type: 'success'
          })
        })
      }
    },
    loadTalk() {
      var params = {}
      params.articleId = this.$route.query.articleId
      findAllTalk(params).then(res => {
        console.log('----2222222222------', res)
        this.talkobj = res.data.data
        for (var i = 0; i < res.data.data.length; i++) {
          this.talkobj[i].talk.create_DATE = utilFunction.timeFormat(this.talkobj[i].talk.create_DATE, '.')
          if (this.talkobj[i].subTalk) {
            for (var j = 0; j < this.talkobj[i].subTalk.length; j++) {
              this.talkobj[i].subTalk[j].create_DATE = utilFunction.timeFormat(this.talkobj[i].subTalk[j].create_DATE, '.')
            }
          }
        }
      })
    },
    reply(index, flag, item, subitem) {
      this.showReply = true
      this.$refs.inputbox[index].style.display = 'block'
      if (flag === 'reply') {
        this.replyContent = ''
        this.subTalkobj = subitem
        this.replyContent = '@' + subitem.owner_NAME + ' '
        this.replyParams.replyId = item.talk.talk_ID
        this.replyParams.targetId = subitem.owner_ID
        this.replyParams.targetName = subitem.owner_NAME
      } else {
        this.replyContent = '@' + item.talk.owner_NAME + ' '
        this.replyParams.replyId = item.talk.talk_ID
        this.replyParams.targetId = item.talk.owner_ID
        this.replyParams.targetName = item.talk.owner_NAME
      }
    },
    submitReply(index) {
      this.replyParams.articleId = this.$route.query.articleId
      this.replyParams.replyContent = this.replyContent
      this.replyParams.ownerId = this.$store.getters.userId
      this.replyParams.ownerName = this.$store.getters.userName
      addOrReplyTalk(this.replyParams).then(res => {
        this.replyContent = ''
        this.$refs.inputbox[index].style.display = 'none'
        this.$notify({
          title: '回复成功',
          message: '已回复评论！',
          type: 'success'
        })
      })
    },
    cancelReply(index) {
      this.$refs.inputbox[index].style.display = 'none'
    },
    cancelTalk() {
      this.usertalk = ''
    }

  }
}
</script>

<style scoped>
  .title-div{
    /* background-color:#424242; */
    background-color:white;
    text-align:center;
    width:100%;
    height:60px;
    line-height:56px;
    position: fixed;
    top: 0;
    opacity:1;
    z-index: 3000;
    -moz-box-shadow: 2px 2px 10px #909090;
    -webkit-box-shadow: 2px 2px 10px #909090;
    box-shadow:2px 2px 10px #909090;
  } 
  .title-text{
    font-size: 25px;
    /* color: white; */
    color: #424242;
    font-weight:400;
  }
  .left-div{
    position: fixed;
    top: 300px;
    left: 50px;
  }
  .subtitle-text{
    font-weight: 900;
    font-size: 20px;
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
  .title-inline-control{
    overflow: hidden;
    text-overflow: ellipsis; 
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
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
  .like-read-text{
    padding-left:30px;
    font-size:14px;
    cursor: pointer;
  }
  .like-read-text:hover{
    text-decoration: underline;
    color: #409eff;
  }

@media(max-width:500px){
  .title-div{
  background-color:#424242;
  }
  .title-text{
  font-size: 18px;
  color: white;
  font-weight: 400;
  }
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
