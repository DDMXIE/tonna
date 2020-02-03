<template>
  <div id="app" >
  <router-view></router-view>
  </div>
</template>

<script>

export default {
  metaInfo: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' }
    ]
  },
  name: 'app',
  components: {
  },
  methods: {
    showUserInfoByToken() {
      try {
        this.axios.get('/user/showUserInfoByToken').then(res => {
          console.log('后端的数据', res.data)
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  watch: {
    $route(to, from) { // to:即将要跳转到的页面   from:即将离开的页面
      // ----------- 每次跳转页面时 重新拿token获取信息尝试，若token过期
      if (to.path !== '/login' && to.path !== '/register' && to.path !== '/index/weather' &&
          to.path !== '/index/lifeStyle' && to.path !== '/index/surf' &&
          to.path !== '/index/articleView' && to.path !== '/index/connectUs' &&
          to.path !== '/superindex/userManage' && to.path !== '/superindex/dataManage') {
        if (localStorage.getItem('token') !== null) {
          this.showUserInfoByToken()
        } else {
          this.$notify({
            title: '请先登录！',
            type: 'warning'
          })
          this.$router.push('/login')
        }
      }
      // console.log('-----即将要跳转到的页面----', to.path)
      if (this.$store.getters.userName === '' || this.$store.getters.userName === null) {
        if (to.path === '/index/editPage' || to.path === '/index/notePad') {
          this.$notify({
            title: '请先登录！',
            type: 'warning'
          })
          this.$router.push('/login')
        }
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
  margin:0;
  padding:0;
  /* background-color: #363638 */
}
body{
    margin:0;
    padding:0;
}
</style>
