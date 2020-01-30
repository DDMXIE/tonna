<template>
  <div>
    <div style="width:100%,">
      <Bread></Bread>
    </div>
    <div>
        <el-row :gutter="20" style="padding-top:50px;padding-right:10px;padding-left:10px;margin:0;"> 
           <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="8"  style="margin-bottom:15px;">
             <div>
               <el-card>
                  <div>
                    <i class="el-icon-s-flag" style="padding-right:5px;color:#d81e05;font-size:18px;"/>
                    <span>热搜榜</span>
                  </div>
                </el-card>
             </div>
           </el-col>
           

            <el-col :xs="24" :sm="14" :md="12" :lg="10" :xl="16">
                <el-button v-for="(item,index) in items" :key="index" :type="item.type" @click="showType(item.typeId)"
                          style="margin-top:10px;" size="small" >{{item.label}}</el-button>
                <el-button icon="el-icon-refresh" circle size="mini"></el-button>
                <ArticlePage :articleType="articleType" ></ArticlePage>
            </el-col>
            <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="16">
              <div class="right-card">
                <el-card class="right-card" :body-style="{ padding: '10px',backgroundColor:'#6697a4' }">
                  <div @click="goToMore('1')">
                      <i class="el-icon-s-custom right-card-icon"/>
                      <span class="right-card-text">Tonna 会员 ></span>
                  </div>
                </el-card>
                <el-card class="right-card" :body-style="{ padding: '10px',backgroundColor:'#bdd5d7' }">
                  <div @click="goToMore('2')">
                      <i class="el-icon-s-claim right-card-icon" style="color:#547c82;"/>
                      <span class="right-card-text" style="color:#547c82">作品优选 ></span>
                  </div>
                </el-card>
                <el-card class="right-card" :body-style="{ padding: '10px',backgroundColor:'#ffbfb4' }">
                  <div @click="goToMore('3')">
                      <i class="el-icon-s-home right-card-icon"/>
                      <span class="right-card-text">我的Tonna ></span>
                  </div>
                </el-card>
                <el-card class="right-card" :body-style="{ padding: '10px',backgroundColor:'#fdf1d9' }">
                  <div @click="goToMore('4')">
                      <i class="el-icon-s-open right-card-icon" style="color:#c5ad7c;"/>
                      <span class="right-card-text" style="color:#c5ad7c">版权申明 ></span>
                  </div>
                </el-card>
              </div>
              <div class="author-div" style="padding-top:30px;">
                <el-card>
                  <div>
                    <i class="el-icon-s-flag" style="padding-right:5px;color:#d81e05;font-size:18px;"/>
                    <span>作者推荐</span>
                  </div>
                </el-card>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="3" :lg="4" :xl="16">
              <div></div>
            </el-col>
        </el-row>
    </div>   
    <Foot></Foot>
  </div>
</template>


<script>
import Bread from '../components/Bread'
import Foot from '../components/Foot'
import ArticlePage from '../views/ArticlePage'
// import Aplayer from 'vue-aplayer'
export default {
  components: { Bread, ArticlePage, Foot },
  data() {
    return {
      loading: true,
      isLike: false, // 是否添加喜欢
      fit: 'cover', // 头像类型
      url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=656257457,1108249792&fm=26&gp=0.jpg', // 头像url
      currentDate: new Date(),
      articleType: '1',
      editableTabsValue: '0',
      items: [
        { type: 'primary', label: '生活穿搭', typeId: '1' },
        { type: 'success', label: '好文分享', typeId: '2' },
        { type: 'info', label: '发烧专区', typeId: '3' },
        { type: 'danger', label: '外文专栏', typeId: '4' },
        { type: 'warning', label: '技术类文章', typeId: '5' }
      ]
    }
  },
  methods: {
    likeIt() {
      this.isLike = true
    },
    showType(typeId) {
      this.articleType = typeId
    },
    goToMore(flag) {
      switch (flag) {
        case '3':
          this.$router.push('/index/personalManage')
          break
        case '4':
          this.$router.push('/index/connectUs')
          break
      }
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
</style>

<style>
  .el-loading-mask{
    z-index: 500;
  }
</style>

