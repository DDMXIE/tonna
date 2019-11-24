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
              <el-avatar shape="square" :size="180" :fit="fit" :src="url"></el-avatar>
            </div>
            <div>
              <span style="font-weight:bold;font-size:30px;">Tony</span>
            </div>
          </div>
        </el-col>
      </el-row>

      <div style="padding-top:60px;">
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
    if (this.userForm.username === '') {
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
      this.userForm.username = ''
      this.userForm.sex = 'male'
      this.userForm.auth = '会员用户'
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



