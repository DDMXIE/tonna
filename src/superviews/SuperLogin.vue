<template>
  <transition name="fade">
    <div
      style="height:100%;width:100%;"
      class="login-bg"
    >
      <el-row
        align="middle"
        justify="end"
        type="flex"
        style="height:90%;"
      >
        <el-col
          :lg="7"
          :md="8"
          :sm="10"
          :xl="5"
          :xs="23"
          style="text-align: center;padding-top:40px;margin-right:80px;"
        >
          <div style="text-align:center;">
            <div style="text-align:center;margin-left:80px;">
              <span class="login-title">Tonna</span><span class="login-title" style="font-weight:300;font-size:40px;">&nbsp;后台管理</span>
            </div>
            <el-form
              :model="loginForm"
              :rules="rules"
              ref="loginForm"
              label-width="100px"
              class="demo-ruleForm"
              style="padding-top:30px;"
            >
              <el-form-item
                label="用户名"
                prop="username"
              >
                <el-input
                  v-model="loginForm.username"
                  style="border-radius:50px;"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="密码"
                prop="password"
                style="margin-bottom:8px;"
              >
                <el-input
                  v-model="loginForm.password"
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  round
                  @click="submitForm"
                  :style="{width:submitBtnWidth,marginTop:'25px'}"
                >登 录
                  <i class="el-icon-s-promotion el-icon--right"></i>
                </el-button>
                <el-button round type="warning" @click="resetForm('loginForm')">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>

      <el-row
        align="middle"
        justify="center"
        style="height:5%;"
        type="flex"
      >
        <span style="font-size:14px;color: #e5e5e5;">@托纳博客 Tonna China &nbsp;&nbsp;&nbsp; Designed by Tony</span>
      </el-row>
    </div>
  </transition>
</template>

<script>
import { getUserInfoByToken } from '../api'
export default {
  metaInfo: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' }
    ]
  },
  created() {
    document.onkeydown = e => {
      if (e.keyCode === 13) {
        this.submitForm()
      }
    }
  },
  destroyed() {
    document.onkeydown = null
  },
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名输入不规范', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 20, message: '密码为 4 到 20 位字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 提交表单
    submitForm() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.login()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async login() {
      try {
        var res = await this.axios.post('/login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        },
        {
          // Form Data中数据格式转换
          transformRequest: [
            function(data) {
              let ret = ''
              for (const it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              ret = ret.substring(0, ret.lastIndexOf('&'))
              return ret
            }
          ]
        },
        {
          // 修改相应Spring Security验证请求头类型（headers中的Content-Type）
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
      } catch (err) {
        console.log(err)
      }
      console.log(res)
      if (res && res.data.status === 200) {
        this.$notify({
          title: '登录成功',
          message: 'Welcome to Tonna!',
          type: 'success',
          duration: 1500
        })
        localStorage.setItem('token', res.data.token)
        this.$store.commit('handleUserName', res.data.username)
        getUserInfoByToken().then(res => {
          this.$store.commit('handleUserId', res.data.data.user_ID)
          this.$store.commit('handleUserImg', res.data.data.user_IMG)
        })
        this.$router.push({ path: '/superindex/dataManage', query: { userRole: res.data.username }})
      } else {
        this.$notify.error({
          title: '登录失败！',
          message: '用户名或密码错误',
          duration: 1500
        })
      }
    }
  },
  computed: {
    submitBtnWidth() {
      if (document.documentElement.clientWidth < 500) {
        return '100px'
      } else {
        return '130px'
      }
    },
    signBtnWidth() {
      if (document.documentElement.clientWidth < 500) {
        return '80px'
      } else {
        return '100px'
      }
    },
    isTonnaShow() {
      if (document.documentElement.clientWidth < 500) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>


<style scoped>
.el-form-item >>> .el-form-item__label {
  color: #cccccc !important;
}
.el-input >>> .el-input__inner {
  border-radius: 50px;
  background-color: #8fc4f0;
  opacity: 0.9;
  border: none;
  color: white;
}
.login-bg {
  background-image: url("../assets/super/super_login_bg1.png");
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%;
}
/* 过渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter-to, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.login-title{
  color:white;
  font-weight:900;
  font-size:60px;
}
</style>



