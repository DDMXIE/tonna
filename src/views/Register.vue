<template>
  <transition name="fade">
    <div
      style="height:100%;width:100%;"
      class="login-bg"
    >
      <div style="padding-top:80px;text-align:center;">
        <el-row>
          <el-col :xs="24" :sm="7" :md="7" :lg="8" :xl="16"><div>&nbsp;</div></el-col>
          <el-col :xs="24" :sm="10" :md="10" :lg="8" :xl="16">
            <img src="../assets/surf/tonna3.png" style="width:50%"/>
          </el-col>
          <el-col :xs="24" :sm="7" :md="7" :lg="8" :xl="16"></el-col>
        </el-row>
        
        <!-- <span style="color:white;font-size:80px;font-weight:500;">Very Welcome!</span> -->
        <el-row>
        <el-col :xs="24" :sm="7" :md="8" :lg="8" :xl="16"><div>&nbsp;</div></el-col>
        <el-col :xs="24" :sm="10" :md="8" :lg="8" :xl="16">
          <div v-if="showTimeCount" class="prompt_text"><span style="color:white;">注册成功！</span><span id="num" style="color:white;">{{count}}</span><span style="color:white;">秒后跳转到登录</span></div>
        <el-card style="margin-left:20px;margin-right:20px;margin-top:30px;padding-right:10px;" :body-style="{ padding: '10px' }">
          <div style="padding-top:10px;padding-bottom:10px;">
              <span style="font-size:25px;font-weight:200;">注册</span>
          </div>
          <!-- <img src="../assets/surf/tonna.png" style="width:30%"/> -->
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm">
              <el-form-item label="昵称" prop="username">
                <el-input v-model.number="ruleForm.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
              </el-form-item>
              
              <el-button type="success" @click="submitForm('ruleForm')" round style="width:180px;margin-left:0px;">注册</el-button>
              <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
              <div>
                <span style="font-size:10px;color:#8a8a8a;">点击注册表明您同意遵守Tonna用户协议和隐私政策</span>
              </div>
            </el-form>
        </el-card>
         </el-col>
          <el-col :xs="24" :sm="7" :md="8" :lg="8" :xl="16"></el-col>
         </el-row> 
        
        <div style="padding-top:40px;">
          <el-button
            type="primary"
            plain
            @click="backToSign"
          >去登录</el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { saveSignUser } from '@/api'
export default {
  data() {
    var checkUserName = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('昵称不能为空'))
      }
      callback()
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      count: '', // 倒计时
      showTimeCount: false,
      ruleForm: {
        pass: '',
        checkPass: '',
        username: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        username: [
          { validator: checkUserName, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    backToSign() {
      this.$router.push('/login')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(111111112222)
        if (valid) {
          var userInfoList = {}
          userInfoList.username = this.ruleForm.username
          userInfoList.password = this.ruleForm.pass
          console.log(userInfoList)
          saveSignUser(userInfoList).then(res => {
            console.log(res)
            if (res.data === 1) {
              this.ruleForm.username = ''
              this.ruleForm.pass = ''
              this.ruleForm.checkPass = ''
              this.$notify({
                title: 'Tonna会员',
                message: '您已注册成功,快去登录吧！',
                type: 'success'
              })
              this.showTimeCount = true
              this.goGrdoupRecor()
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    goGrdoupRecor() {
      const TIME_COUNT = 5
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
            // 跳转的页面写在此处
            this.$router.push('/login')
          }
        }, 1000)
      }
    }
  }
}
</script>

<style scoped>
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
