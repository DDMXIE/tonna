<template>
  <transition name="fade">
    <div
      style="height:100%;width:100%;"
      class="login-bg"
    >
      <div style="padding-top:80px;text-align:center;">
        <span style="color:white;font-size:80px;font-weight:500;">Very Welcome!</span>
        <div>
          <el-button
            type="primary"
            plain
            @click="backToSign"
          >返回登录</el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    backToSign() {
      this.$router.push('/')
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
