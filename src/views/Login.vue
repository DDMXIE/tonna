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
          style="text-align: center;padding-top:40px;margin-right:140px;"
        >
          <div style="text-align:center;">
            <el-form
              :model="loginForm"
              :rules="rules"
              ref="loginForm"
              label-width="100px"
              class="demo-ruleForm"
              style="padding-top:80px;"
            >
              <el-form-item
                label="用户名"
                prop="USERNAME"
              >
                <el-input
                  v-model="loginForm.USERNAME"
                  style="border-radius:50px;"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="密码"
                prop="PASSWORD"
                style="margin-bottom:8px;"
              >
                <el-input
                  v-model="loginForm.PASSWORD"
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  round
                  @click="submitForm"
                  style="width:140px;margin-top:25px;"
                >登 录
                  <i class="el-icon-s-promotion el-icon--right"></i>
                </el-button>
                <el-button
                  type="success"
                  round
                  @click="sign"
                  style="width:100px;margin-top:25px;"
                >注 册</el-button>
                <!-- <el-button @click="resetForm('loginForm')">重置</el-button> -->
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
        <span style="font-size:14px;color: #aaa;">@托纳博客 Tonna China &nbsp;&nbsp;&nbsp; Designed by Tony</span>
      </el-row>
    </div>
  </transition>
</template>

<script>
export default {
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
        USERNAME: '',
        PASSWORD: ''
      },
      rules: {
        USERNAME: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名输入不规范', trigger: 'blur' }
        ],
        PASSWORD: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 8, max: 20, message: '密码为 8 到 20 位字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 提交表单
    submitForm() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$notify({
            title: '登录成功',
            message: 'Welcome to Tonna!',
            type: 'success'
          })
          this.$router.push({ path: '/index/surf' })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    sign() {
      this.$router.push('/register')
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
  background-color: #454545;
  border: none;
  color: white;
}
.login-bg {
  background-image: url("../assets/login/login_bg1.jpg");
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
</style>



