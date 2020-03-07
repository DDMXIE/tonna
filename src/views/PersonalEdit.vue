<template>
  <div>
    <el-row>
      <!-- <el-card :body-style="{ padding: '0px' }"> -->
        <img src="../assets/personal/personalEditb1g.jpg" width="100%"/>
      <!-- </el-card> -->
      <el-col :xs="24" :sm="12" :md="4" :lg="5" :xl="12">&nbsp;</el-col>
      <el-col :xs="24" :sm="12" :md="16" :lg="14" :xl="12">
          <el-tabs type="border-card" :tab-position="'left'" :style="{height:fullHeight+'px'}">
            <el-tab-pane label="用户管理" style="height:100%">
              <div class="block">
                <div style="text-align:center;">
                  <el-avatar v-if="isUploadAvatar === false" shape="circle" :size="180"  :fit="fit" :src="userInfo.user_IMG"></el-avatar>
                  <el-upload v-else
                    name="uploadFile"
                    action="http://localhost:8080/admin/uploadFile"
                    list-type="picture-card"
                    :multiple="false"
                    :limit="1"
                    :auto-upload="true"
                    :headers="headers"
                    :on-success="handleAvatarSuccess"
                    >
                      <i slot="default" class="el-icon-plus"></i>
                      <div slot="file" slot-scope="{file}">
                        <img
                          class="el-upload-list__item-thumbnail"
                          :src="file.url" alt=""
                        >
                        <span class="el-upload-list__item-actions">
                          <span
                            class="el-upload-list__item-preview"
                            @click="handlePictureCardPreview(file)"
                          >
                            <i class="el-icon-zoom-in"></i>
                          </span>
                          <span
                            v-if="!disabled"
                            class="el-upload-list__item-delete"
                            @click="handleDownload(file)"
                          >
                            <i class="el-icon-download"></i>
                          </span>
                          <span
                            v-if="!disabled"
                            class="el-upload-list__item-delete"
                            @click="handleRemove(file)"
                          >
                            <i class="el-icon-delete"></i>
                          </span>
                        </span>
                      </div>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                  <div>
                    <el-button type="success" style="margin-top:20px;" round @click="upload">上传 / 更换头像</el-button>
                  </div>

                  <div style="padding-top:20px;">
                  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="联系方式" prop="userTel">
                    <el-input v-model="ruleForm.userTel" :disabled="isEditDisabled"></el-input>
                  </el-form-item>
                  <el-form-item label="用户昵称" prop="username">
                      <el-input v-model="ruleForm.username" :disabled="isEditDisabled"></el-input>
                    </el-form-item>
                    <el-form-item label="个人简介" prop="userIntroduce">
                      <el-input type="textarea" v-model="ruleForm.userIntroduce" :disabled="isEditDisabled"></el-input>
                    <!-- <el-form-item label="密码" prop="pass">
                      <el-input type="password" v-model="ruleForm.pass" :disabled="isEditDisabled" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                      <el-input type="password" v-model="ruleForm.checkPass" :disabled="isEditDisabled" autocomplete="off"></el-input> -->
                    </el-form-item>
                    
                    <el-button v-if="isEditDisabled === false" type="primary" @click="submitForm('ruleForm')">保存</el-button>
                    <el-button v-else @click="resetForm('ruleForm')" type="primary" icon="el-icon-edit">修改</el-button>
                    <el-button v-if="isEditDisabled === false" @click="cancelForm('ruleForm')">取消</el-button>
                   
                  </el-form>
                  </div>
                </div>
                
              </div>
            </el-tab-pane>
            <el-tab-pane label="配置管理">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
          </el-tabs>
      </el-col>
      <el-col :xs="24" :sm="12" :md="4" :lg="5" :xl="12">&nbsp;</el-col>
      <div></div>
    </el-row>
   
  </div>
</template>

<script>
import { findUserInfoById, getUserInfoByToken, saveUserInfoById, updateUserAvatarById } from '@/api'
export default {

  data() {
    var checkAge = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('年龄不能为空'))
      }
      callback()
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      callback()
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }
      callback()
    }
    return {
      fit: 'cover', // 头像类型
      fullHeight: document.documentElement.clientHeight - 60,
      isEditDisabled: true,
      userInfo: [],
      ruleForm: {
        username: '',
        userIntroduce: '',
        userTel: ''
      },
      rules: {
        username: [
          { validator: validatePass, trigger: 'blur' }
        ],
        userIntroduce: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        userTel: [
          { validator: checkAge, trigger: 'blur' }
        ]
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      headers: {},
      isUploadAvatar: false
    }
  },
  created() {
    this.headers = { Authorization: 'Bearer ' + (localStorage.token || '') }
    this.findUserInfoById()
  },
  methods: {
    findUserInfoById() {
      var params = {}
      params.userId = this.$store.getters.userId
      findUserInfoById(params).then(res => {
        console.log(res)
        this.userInfo = res.data.data[0]
        this.ruleForm.username = this.userInfo.user_NAME
        this.ruleForm.userTel = this.userInfo.user_TEL
        this.ruleForm.userIntroduce = this.userInfo.user_INTRODUCE
      })
    },
    getUserInfoByToken() {
      getUserInfoByToken().then(res => {
        console.log('111111', res)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var params = {}
          params.userId = this.$store.getters.userId
          params.username = this.ruleForm.username
          params.userTel = this.ruleForm.userTel
          params.userIntroduce = this.ruleForm.userIntroduce
          saveUserInfoById(params).then(res => {
            console.log(res)
            this.isEditDisabled = true
            this.$store.commit('handleUserName', this.ruleForm.username)
            this.$notify({
              title: '成功',
              message: '修改信息成功',
              type: 'success'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields()
      this.isEditDisabled = false
    },
    cancelForm(formName) {
      this.isEditDisabled = true
    },
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleDownload(file) {
      console.log(file)
    },
    upload() {
      this.isUploadAvatar = true
    },
    handleAvatarSuccess(res, file) {
      // this.itemForm.head_img = URL.createObjectURL(file.raw)
      console.log(res, file)
      console.log(URL.createObjectURL(file.raw))
      var params = {}
      params.userId = this.$store.getters.userId
      params.userImg = res
      console.log(params)
      updateUserAvatarById(params).then(res => {
        console.log(res)
        this.$store.commit('handleUserImg', params.userImg)
        this.isUploadAvatar = false
        this.findUserInfoById()
        this.$notify({
          title: '成功',
          message: '头像上传成功！',
          type: 'success'
        })
      })
    }

  }

}
</script>

<style scoped>

</style>
