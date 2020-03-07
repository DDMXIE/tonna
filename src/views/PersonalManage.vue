<template>
  <div>
    <div style="width:100%,">
      <Bread></Bread>
    </div>
    <div style="padding-top:60px;">
      <el-row>
        <el-col :span="24">
          <div style="text-align:center;">
            <div class="block">
              <el-avatar shape="square" :size="180" :fit="fit" :src="$store.getters.userImg"></el-avatar>
            </div>
            <div>
              <span style="font-weight:bold;font-size:30px;">{{getUserName}}</span>
            </div>
          </div>
        </el-col>
      </el-row>

     
      

      <div style="padding-top:60px;">
        <el-divider ><i class="el-icon-user"></i></el-divider>
        <div style="text-align:center;padding-bottom:30px;">
            <el-button type="success" icon="el-icon-edit" round 
            style="width:190px;" @click="goToUserSettings">前往用户设置</el-button>
        </div>
        <el-row :gutter="40">
          <el-col :xs="0" :sm="3" :md="3" :lg="3" :xl="3">&nbsp;</el-col>
          <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
            <el-card :body-style="{ padding: '5px' }">
              <div style="text-align:center">
                <img src="../assets/personal/myPage1.jpg" width="100%"/>
                <el-button type="success" round style="margin-top:10px;" @click="goToUserPage($store.getters.userId)">我的主页</el-button>
                <div style="padding-left:20px;padding-right:20px;padding-top:10px;">
                  <span style="font-size:14px;">我的主页—在这里你可以进入我的主页，可以详细查看我的文章和动态信息。</span>
                </div>
                <div style="padding-top:10px;padding-bottom:10px;"><span style="font-size:12px;">-主页-</span></div>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
            <el-card :body-style="{ padding: '5px' }">
              <div style="text-align:center">
                  <img src="../assets/personal/myPage2.jpg" width="100%"/>
                  <el-button type="warning" round style="margin-top:10px;">收藏的文章</el-button>
                  <div style="padding-left:20px;padding-right:20px;padding-top:10px;">
                    <span style="font-size:14px;">我的收藏—在这里你可以进入我的收藏，可以详细查看我的收藏和文章信息。</span>
                  </div>
                  <div style="padding-top:10px;padding-bottom:10px;"><span style="font-size:12px;">-收藏-</span></div>
              </div>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
             <el-card :body-style="{ padding: '5px' }">
              <div style="text-align:center">
                <img src="../assets/personal/myPage3.jpg" width="100%"/>
                <el-button type="primary" round style="margin-top:10px;">喜欢的文章</el-button>
                <div style="padding-left:20px;padding-right:20px;padding-top:10px;">
                  <span style="font-size:14px;">我的喜欢—在这里你可以进入点赞文章，可以详细查看我的点赞和文章信息。</span>
                </div>
                <div style="padding-top:10px;padding-bottom:10px;"><span style="font-size:12px;">-喜欢-</span></div>
              </div>
              </el-card>
          </el-col>
          <el-col :xs="0" :sm="3" :md="3" :lg="3" :xl="3">&nbsp;</el-col>
        </el-row>
        <el-divider ><i class="el-icon-help"></i></el-divider>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-card class="info-card">
                  <el-collapse accordion class="collapse-style" @change="infoCollapseChange">
                    <el-collapse-item>
                      <template slot="title">
                        <span class="subtitle-span">个人信息</span>&nbsp;&nbsp;&nbsp;
                        <i class="header-icon el-icon-copy-document" style="font-size:24px;"></i>
                      </template>
                      <div class="personinfo-div">
                          <el-row class="info-row">
                            <el-col :span="12">姓名：</el-col> <el-col :span="12">{{userForm.username}}</el-col>
                            <el-col :span="12">性别：</el-col> <el-col :span="12">{{userForm.sex}}</el-col>
                            <el-col :span="12">身份：</el-col> <el-col :span="12">{{userForm.auth}}</el-col>
                          </el-row>
                      </div>
                    </el-collapse-item>
                    <div v-if="isShowInfoTip" class="tip-div"><span>- 点击以展开个人信息 -</span></div>
                    <div v-else class="tip-div"><span>-  我的信息 -</span></div>
                  </el-collapse>
              </el-card>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-card class="info-card">
               <el-collapse accordion class="collapse-style" @change="noteCollapseChange">
                    <el-collapse-item>
                      <template slot="title">
                        <span class="subtitle-span">我的备忘录</span>&nbsp;&nbsp;
                        <i class="header-icon el-icon-paperclip" style="font-size:24px;"></i>
                      </template>
                      <div class="personinfo-div">
                          <el-row style="padding-top:20px;">
                            <el-col :span="8">备忘1：</el-col> <el-col :span="16">{{userForm.username}}</el-col>
                            <el-col :span="8">备忘2：</el-col> <el-col :span="16">{{userForm.sex}}</el-col>
                            <el-col :span="8">备忘3：</el-col> <el-col :span="16">{{userForm.auth}}</el-col>
                          </el-row>
                      </div>
                    </el-collapse-item>
                    <div v-if="isShowNoteTip" class="tip-div"><span>- 点击以展开备忘录 -</span></div>
                    <div v-else class="tip-div"><span>-  我的备忘录 -</span></div>
                  </el-collapse>
            </el-card>
          </el-col>

          <el-col :span="24">
            <div style="text-align:center;padding-top:30px;">
              <el-button type="primary" @click="logout">退出登录<i class="el-icon-error el-icon--right"></i></el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import Bread from '../components/Bread'
export default {
  components: { Bread },
  created() {
    this.loadUserInfo()
    if (this.$store.getters.userName === '' || this.$store.getters.userName === null) {
      this.$notify({
        title: '请先登录！',
        type: 'warning'
      })
      this.$router.push('/login')
    }
  },
  data() {
    return {
      fit: 'cover', // 头像类型
      url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=656257457,1108249792&fm=26&gp=0.jpg', // 头像url
      isShowInfoTip: true,
      isShowNoteTip: true,
      userForm: {
        username: '',
        sex: '',
        auth: ''
      }
    }
  },
  methods: {
    loadUserInfo() {
      // this.$axios
      //   .get('/user', {
      //     params: {
      //       'username': 'tony',
      //       'userage': 12
      //     }
      //   })
      //   .then(res => {
      //     console.log(res)
      //     // this.userForm = res.data.USER_INFO
      //   })
      //   .catch(() => {})
      // ------------------------请求用户信息---------------------
      this.userForm.username = 'Tony'
      this.userForm.sex = 'male'
      this.userForm.auth = '会员用户'
    },
    logout() {
      this.axios.post('/logout')
        .then(res => {
          console.log('退出登录按钮', res)
          localStorage.removeItem('user_name')
          localStorage.removeItem('token')
          localStorage.removeItem('user_id')
          localStorage.removeItem('user_img')
          this.$notify({
            title: '您已退出登录',
            type: 'success'
          })
        })
      this.$router.push('/login')
    },
    infoCollapseChange(val) {
      if (val !== '') {
        this.isShowInfoTip = false
      } else {
        this.isShowInfoTip = true
      }
    },
    noteCollapseChange(val) {
      if (val !== '') {
        this.isShowNoteTip = false
      } else {
        this.isShowNoteTip = true
      }
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
    },
    goToUserSettings() {
      this.$router.push('/index/personalEdit')
    }
  },
  computed: {
    // 这里需要把store 动态的数据放到computed里面才会同步更新 视图
    getUserName() {
      return this.$store.getters.userName
    }
  }
}
</script>

<style scoped>
.subtitle-span{
  font-size: 24px;
}
.subtitle-span:hover{
  font-size: 24px;
  color: #409eff;
}
.personinfo-div{
  text-align: center;
}
.collapse-style{
  border-top: 0;
  border-bottom: 0;
}
.info-row{
  padding-top:20px;
  margin-left:90px;
  margin-right:90px;
}
.info-card{
  margin-top: 10px;
}
.tip-div{
  text-align:center;
  padding-top:20px;
}
</style>



