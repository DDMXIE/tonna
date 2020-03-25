<template>
  <div style="width:100%">
    <div>
      <img src="../assets/other/userArticle_bg1.png" width="100%"/>
      <el-row>
        <el-col :xs="24" :sm="2" :md="2" :lg="2" :xl="16">
              <div>&nbsp;</div>
        </el-col>
        <el-col :xs="24" :sm="19" :md="13" :lg="11" :xl="16">
          <div class="userarticle-title-div"><span class="userarticle-title">管理我的笔记</span></div>
          <div style="padding-right:10px;">
             <el-table
              stripe
              ref="filterTable"
              :data="tableData"
              style="width: 100%;">
                <el-table-column
                    fixed
                    prop="article_TITLE"
                    label="笔记标题"
                    width="180"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                      {{scope.row.article.article_TITLE}}
                    </template> 
                  </el-table-column>
                  <el-table-column
                  
                    label="笔记ID"
                    width="180"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                      {{scope.row.article.article_ID}}
                    </template> 
                </el-table-column>
                <el-table-column
                    prop="role_ID"
                    label="权限"
                    width="180"
                    sortable
                    :filters="[{ text: '所有人可见', value: '2' }, { text: '私密', value: '1' }]"
                    :filter-method="filterTag"
                    filter-placement="bottom-end">
                    <template slot-scope="scope">
                      <el-tag
                        :type="'success'"
                        disable-transitions v-if="scope.row.article.article_SECURITY === '2'">
                        所有人可见
                        </el-tag>
                        <el-tag
                        :type="'danger'"
                        disable-transitions v-else>
                        私密
                        </el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column
                      prop="article_status"
                      label="状态"
                      width="125"
                      fixed="right"
                      show-overflow-tooltip>
                      <template slot-scope="scope">
                        <div v-if="scope.row.article.article_STATUS === '1'">
                          <el-button type="warning" round size="mini">待审核</el-button>
                        </div>
                        <div v-if="scope.row.article.article_STATUS === '2'">
                          <el-button type="info" round size="mini">已保存</el-button>
                        </div>
                        <div v-if="scope.row.article.article_STATUS === '3'">
                          <el-button type="success" round size="mini" >已发表</el-button>
                        </div>
                      </template> 
                    </el-table-column>
            </el-table>
            <div style="text-align:center;padding-top:30px;">
                <el-pagination
                  :page-size="7"
                  background
                  layout="prev, pager, next"
                  @current-change="currentChange"
                  :total="total">
                </el-pagination>
            </div>
          </div>
        </el-col>
         <el-col :xs="24" :sm="19" :md="6" :lg="9" :xl="16">
           <div class="userarticle-title-div"><span class="userarticle-title">草稿箱</span></div>
           <div v-if="articleData.length !== 0">
            <div style="padding-top:10px;" v-for="(item,index) in articleData" :key="index" @mouseover="changeMask(index)" @mouseout="changeMask(index)">
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
                    <!-- <i class="el-icon-chat-line-square" style="font-size:16px;"/>
                    <span class="text-detail">{{item.talk_NUM}}</span>
                    <img src="../assets/article/heart2.png" width="16px;" style="cursor:pointer;">
                    <span style="font-size:12px;padding-left:5px;padding-right:15px;color:#bf2727;">{{item.like_NUM}}</span> -->
                    <span :ref="'maskedit' + index" @click="goToEdit(item)"
                          style="display:none;font-size:12px;color:#a0a0a0;cursor:pointer;font-weight:900;">前往编辑</span>
                    &nbsp;&nbsp;
                    <span :ref="'mask' + index" @click="uncollect(item)"
                          style="display:none;font-size:12px;color:#a0a0a0;cursor:pointer;font-weight:900;">删除笔记</span>
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
                    <!-- <i class="el-icon-chat-line-square" style="font-size:16px;"/>
                    <span class="text-detail">{{item.talk_NUM}}</span>
                    <img src="../assets/article/heart2.png" width="16px;" style="cursor:pointer;">
                    <span style="font-size:12px;padding-left:5px;padding-right:15px;color:#bf2727;">{{item.like_NUM}}</span> -->
                    <span :ref="'maskedit' + index" @click="goToEdit(item)"
                          style="display:none;font-size:12px;color:#a0a0a0;cursor:pointer;font-weight:900;">前往编辑</span>
                    &nbsp;&nbsp;
                    <span :ref="'mask' + index" @click="uncollect(item)"
                          style="display:none;font-size:12px;color:#a0a0a0;cursor:pointer;font-weight:900;">删除笔记</span>
                  </div>
                </div>
              </el-card>
            </div>
            </div>
            <div v-else style="padding-left:10px;padding-top:30px;text-align:center;">
              <div><span>草稿箱里空空如也喔！</span></div>
              <div><span>快去写Tonna分享吧！</span></div>
              
              </div>
            </el-col>
            
      </el-row>
    </div>
  </div>
</template>

<script>
import { findDraftArticle, findUserArticleByUserId, deleteArticleByUser } from '@/api'
import utilFunction from '../utilFunction'
export default {
  data() {
    return {
      articleData: [],
      total: null,
      pageSize: {
        start: 1,
        end: 7
      },
      tableData: [{
        article: {
          article_ID: ''
        }
      }]
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.findDraftArticle()
      this.findUserArticleByUserId()
    },
    findDraftArticle() {
      var params = {}
      params.userId = this.$store.getters.userId
      findDraftArticle(params).then(res => {
        console.log('***', res)
        this.articleData = res.data.data
      })
    },
    changeMask(index) {
      const vm = this
      const mask = vm.$refs['mask' + index]
      if (mask[0].style.display === 'none') {
        mask[0].style.display = 'inline'
      } else {
        mask[0].style.display = 'none'
      }

      const maskedit = vm.$refs['maskedit' + index]
      if (maskedit[0].style.display === 'none') {
        maskedit[0].style.display = 'inline'
      } else {
        maskedit[0].style.display = 'none'
      }
    },

    findUserArticleByUserId() {
      var params = {}
      params.userId = this.$store.getters.userId
      params.start = this.pageSize.start
      params.end = this.pageSize.end
      findUserArticleByUserId(params).then(res => {
        this.total = res.data.data.total
        this.tableData = []
        console.log(res.data.data)
        for (var i = 0; i < res.data.data.userList.length; i++) {
          res.data.data.userList[i].article.create_DATE = utilFunction.timeFormat(res.data.data.userList[i].article.create_DATE, '.')
          res.data.data.userList[i].article.update_DATE = utilFunction.timeFormat(res.data.data.userList[i].article.update_DATE, '.')
          this.tableData.push(res.data.data.userList[i])
        }
      })
    },
    currentChange(page) {
      this.pageSize.start = page
      this.findUserArticleByUserId()
    },
    filterTag(value, row) {
      return row.article.article_SECURITY === value
    },
    uncollect(val) {
      console.log(val)
      this.$confirm('此操作将永久删除该笔记, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = {}
        params.articleId = val.article.article_ID
        deleteArticleByUser(params).then(res => {
          this.loadData()
          this.$notify({
            title: '您已成功删除笔记',
            type: 'success'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    goToEdit(val) {
      this.$router.push({ path: '/index/editPage', query: { a: val.article.article_ID }})
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
  .userarticle-title{
    font-size:30px;
    font-weight:200;
  }
  .userarticle-title-div{
    padding-top:10px;
    padding-left:5px;
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
