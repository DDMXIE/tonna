<template>
  <el-container>
  <el-header style="margin:0;padding:0;position:fixed;left:0;top:0;z-index:2001;width:100%">
      <el-row :style="{'backgroundColor':topMenuBgColor}">
        <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
          <img v-if="whatColorRadio === '深'" src="../assets/surf/tonna3.png" width="55%" style="padding-top:15px;padding-left:20px;"/>
          <img v-else src="../assets/surf/tonna.png" width="50%" style="padding-top:15px;padding-left:26px;"/>
          <!-- <span class="title" @click="goToSurf" :style="{'color':titleColor}">Tonna</span> -->
        </el-col>
         <el-col :xs="24" :sm="0" :md="0" :lg="0" :xl="0">
            <el-menu
              :router="true"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              :background-color="topMenuBgColor"
              text-color="#fff"
              :active-text-color="topMenuChosedColor" >
                
                <el-menu-item v-if="$store.getters.userImg !== null" index="/index/PersonalManage" style="font-weight:bolder;border-bottom-width:0px;">
                    <el-avatar  shape="square" size="small" :src="$store.getters.userImg"></el-avatar>
                    &nbsp;
                    <span style="font-size:15px;">个人中心</span>
                </el-menu-item>
                <el-menu-item v-else index="/index/PersonalManage" style="font-weight:bolder;border-bottom-width:0px;">
                    <el-avatar  shape="square" size="small" >
                      <i class="el-icon-user-solid" style="padding-left:2px;color:black"/>
                    </el-avatar>
                    &nbsp;
                    <span style="font-size:15px;">个人中心</span>
                </el-menu-item>

                 <div style="float:right;">
                  <!-- <el-radio-group class="display-none" v-model="whatColorRadio" size="mini" >
                    <el-radio-button label="浅"></el-radio-button>
                    <el-radio-button label="深"></el-radio-button>
                  </el-radio-group> -->
                  <el-button type="info" 
                    size="mini"
                    @click="menuCollapse"
                    style="margin-top:15px;margin-right:10px;">
                    <i v-if="isCollapse === true" class="el-icon-s-unfold">&nbsp;MENU</i>
                    <i v-if="isCollapse === false" class="el-icon-s-fold">&nbsp;MENU</i>
                  </el-button>
                  </div>
            </el-menu>
        </el-col>
        <el-col :xs="0" :sm="20" :md="20" :lg="20" :xl="20">
            <el-menu
              :router="true"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              :background-color="topMenuBgColor"
              text-color="#fff"
              :active-text-color="topMenuChosedColor" style="padding-bottom:11px;">
                
                <!-- <el-menu-item v-if="$store.getters.userImg !== null && isTonnaShow === false" index="/index/PersonalManage" style="font-weight:bolder;border-bottom-width:0px;">
                    <el-avatar  shape="square" size="small" :src="$store.getters.userImg"></el-avatar>
                    &nbsp;
                    <span style="font-size:15px;">个人中心</span>
                </el-menu-item>
                <el-menu-item v-else-if="($store.getters.userImg === null || $store.getters.userImg === '') && isTonnaShow === false" index="/index/PersonalManage" style="font-weight:bolder;border-bottom-width:0px;">
                    <el-avatar  shape="square" size="small" >
                      <i class="el-icon-user-solid" style="padding-left:2px;color:black"/>
                    </el-avatar>
                    &nbsp;
                    <span style="font-size:15px;">个人中心</span>
                </el-menu-item> -->
              
                <div style="float:right;margin-top:15px;padding-right:10px;">
                 <div style="float:right;">
                  <!-- <el-radio-group class="display-none" v-model="whatColorRadio" size="mini" >
                    <el-radio-button label="浅"></el-radio-button>
                    <el-radio-button label="深"></el-radio-button>
                  </el-radio-group> -->
                  <el-button type="info" 
                    size="mini"
                    @click="menuCollapse"
                    style="margin-left:10px;">
                    <i v-if="isCollapse === true" class="el-icon-s-unfold">&nbsp;MENU</i>
                    <i v-if="isCollapse === false" class="el-icon-s-fold">&nbsp;MENU</i>
                  </el-button>
                  </div>
                    
                  <el-avatar v-if="isTonnaShow === true && $store.getters.userImg !== null" shape="square" size="small" :src="$store.getters.userImg" style="margin-right:5px;"></el-avatar>
                   <el-avatar v-else shape="square" size="small" style="margin-right:5px;">
                      <i class="el-icon-user-solid"/>
                    </el-avatar>
                    <el-dropdown v-if="isTonnaShow === true">
                        <i class="el-icon-caret-bottom" style="margin-right: 15px;color:white"></i>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item>
                            <div style="text-align:center;padding-top:10px;">
                                <el-avatar v-if="$store.getters.userImg !== null" shape="square" size="medium" :src="$store.getters.userImg"></el-avatar>
                                 <el-avatar v-else shape="square" size="medium" >
                                   <i class="el-icon-user-solid" style="padding-left:5px;"/>
                                 </el-avatar>
                                <div v-if="$store.getters.userImg !== null">
                                  <span style="font-weight:900;font-size:14px;">欢迎，{{$store.getters.userName}}!</span>
                                </div>
                                <div v-else>
                                  <span style="font-weight:900;font-size:14px;" @click="goToLogin">您好，请登录!</span>
                                </div>
                            </div>
                          </el-dropdown-item>
                          <el-dropdown-item><div @click="goToMyPage($store.getters.userId)" style="text-align:center">我的主页</div></el-dropdown-item>
                          <el-dropdown-item><div @click="goToUserPage" style="text-align:center">用户中心</div></el-dropdown-item>
                          <el-dropdown-item><div @click="goToUserSettings" style="text-align:center">用户设置</div></el-dropdown-item>
                          <el-dropdown-item v-if="whatColorRadio === '浅'"><div @click="changeNightOrLight" style="text-align:center">深色模式</div></el-dropdown-item>
                          <el-dropdown-item v-else><div @click="changeNightOrLight" style="text-align:center">浅色模式</div></el-dropdown-item>
                          <el-dropdown-item><div @click="goToMyCollect" style="text-align:center">我的收藏</div></el-dropdown-item>
                          <el-dropdown-item><div @click="logout" style="text-align:center">退出登录</div></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                  <!-- <div style="float:right;">
                     <el-avatar  shape="square" size="small" :src="$store.getters.userImg" style="margin-left:10px;"></el-avatar>
                  </div>
                 
                  <el-radio-group class="display-none" v-model="whatColorRadio" size="mini" >
                    <el-radio-button label="浅"></el-radio-button>
                    <el-radio-button label="深"></el-radio-button>
                  </el-radio-group>
                  <el-button type="info" 
                    size="mini"
                    @click="menuCollapse"
                    style="margin-left:10px;">
                    <i v-if="isCollapse === true" class="el-icon-s-unfold">&nbsp;MENU</i>
                    <i v-if="isCollapse === false" class="el-icon-s-fold">&nbsp;MENU</i>
                  </el-button> -->
                </div>
              </el-menu>
        </el-col>
      </el-row>
  </el-header>

    <el-main class="main" style="padding:0;margin:0;padding-top:60px;">
        <el-scrollbar style="width:100%;height:100%">
          <transition name="router">
            <router-view></router-view>
          </transition>
        </el-scrollbar>
    </el-main>

    <el-drawer
      title="欢迎，Tonna！"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="Close"
      :size="menuSize"
      >
        <el-menu
        :router="true"
        :default-active="defaultActive"
        class="el-menu-vertical-demo" 
        @open="handleOpen" 
        @close="handleClose" 
        :unique-opened="true"
        :background-color="leftMenuBgColor"
        :text-color="leftMenuTextColor"
        :active-text-color="leftMenuChosedColor"
        :collapse="isCollapse" style="height:100%"
        >
         <!-- <el-menu-item index="/index/home">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/index/about">
          <i class="el-icon-camera-solid"></i>
          <span slot="title">新世界</span>
        </el-menu-item>
        <el-menu-item index="/index/preview">
          <i class="el-icon-document"></i>
          <span slot="title">图片预览</span>
        </el-menu-item> -->
         <el-menu-item index="/index/surf">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/index/editPage">
          <i class="el-icon-s-claim"></i>
          <span slot="title">发表文章</span>
        </el-menu-item>
        <el-menu-item index="/index/articleView">
          <i class="el-icon-s-home"></i>
          <span slot="title">社区</span>
        </el-menu-item>
        <el-menu-item index="/index/notePad">
          <i class="el-icon-s-comment"></i>
          <span slot="title">留言板</span>
        </el-menu-item>
        <!-- <el-menu-item index="/index/lifeStyle">
          <i class="el-icon-s-shop"></i>
          <span slot="title">生活</span>
        </el-menu-item> -->

        <el-submenu index="/index">
            <template slot="title">
              <i class="el-icon-s-shop" ></i>
              <span>生活</span>
            </template>
            <el-menu-item index="/index/lifeStyle">
              <i class="el-icon-camera"></i>
              <span slot="title">探索</span>
            </el-menu-item>
            <el-menu-item index="/index/weather">
              <i class="el-icon-umbrella"></i>
              <span slot="title">天气</span>
            </el-menu-item>
        </el-submenu>
         <el-menu-item index="/index/connectUs">
          <i class="el-icon-info"></i>
          <span slot="title">关于我们</span>
        </el-menu-item>
       
      </el-menu>
    </el-drawer>
</el-container>

</template>

<script>
import Bread from '../components/Bread'
export default {
  components: { Bread },
  created() {
    this.isCollapse = false
    if (document.documentElement.clientWidth < 500) {
      this.menuSize = '60%'
    } else if (document.documentElement.clientWidth > 1500) {
      this.menuSize = '15%'
    } else {
      this.menuSize = '18%'
    }
  },
  data() {
    return {
      menuSize: '',
      drawer: false, // 菜单状态
      direction: 'rtl',
      whatColorRadio: '深',
      topMenuChosedColor: '#ffffff',
      topMenuBgColor: '#3c444c',
      titleColor: '#fff',
      leftMenuChosedColor: '#10f58f',
      leftMenuTextColor: '#fff',
      leftMenuBgColor: '#3c444c',
      isCollapse: true,
      activeIndex: 'home',
      activeIndex2: '1',
      height: {
        height: window.innerHeight - 60 + 'px'
      }
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    // 折叠菜单
    menuCollapse() {
      // if (this.isCollapse === false) {
      //   this.isCollapse = true
      // } else {
      //   this.isCollapse = false
      // }
      if (this.drawer === false) {
        this.drawer = true
      } else {
        this.drawer = false
      }
    },
    menuOpen() {
      this.isCollapse = false
      this.drawer = false
    },
    menuClose() {
      this.isCollapse = true
      this.drawer = true
    },
    changeColor() {
      this.leftMenuBgColor = '#454545'
    },
    Close(done) {
      done()
    },
    goToSurf() {
      this.$router.push('/index/surf')
    },
    goToMyPage(id) {
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
    goToUserPage() {
      this.$router.push('/index/personalManage')
    },
    goToUserSettings() {
      this.$router.push('/index/personalEdit')
    },
    goToLogin() {
      this.$router.push('/login')
    },
    goToMyCollect() {
      this.$router.push('/index/myCollect')
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
    changeNightOrLight() {
      if (this.whatColorRadio === '深') {
        this.whatColorRadio = '浅'
      } else {
        this.whatColorRadio = '深'
      }
    }
  },

  computed: {
    defaultActive() {
      console.log(this.$route.path)
      return this.$route.path
    },
    isTonnaShow() {
      if (document.documentElement.clientWidth < 500) {
        return false
      } else {
        return true
      }
    }
  },
  watch: {
    whatColorRadio(val) {
      if (val === '深') {
        this.titleColor = '#fff'
        this.topMenuChosedColor = '#ffffff'
        this.topMenuBgColor = '#3c444c'
        this.leftMenuBgColor = '#3c444c'
        this.leftMenuTextColor = '#fff'
        this.leftMenuChosedColor = '#10f58f'
      } else {
        this.titleColor = '#454545'
        this.topMenuChosedColor = '#424242'
        this.topMenuBgColor = '#bfbfbf'
        this.leftMenuBgColor = '#f2f2f2'
        this.leftMenuTextColor = '#454545'
        this.leftMenuChosedColor = '#409EFF'
      }
    }
  }
}
</script>

<style scoped>
@media(max-width:500px){
  .display-none{
    display: none;
  }
}
</style>


<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 300px;
    /* min-height: 400px; */
  }
  .title{
    text-align: center;
    font-size: 30px;
    line-height: 60px;
    padding-left: 30px;
    font-style: italic;
    font-weight: 600;
    cursor: pointer;
  }
  /* .main{
    padding-left: 20px;
  } */

  /* 过渡效果 */
  .router-enter,
  .router-leave-to {
    opacity: 0;
    transform: translateX(80px);
  }
  .router-enter-active,
  .router-leave-active {
    transition: 0.5s opacity, 0.5s transform;
  }

  .router-leave-active {
    position: absolute;
  }

  /* 去除横向滚动条 */
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .el-scrollbar__bar.is-horizontal{
    display: none;
  }


  .el-menu.el-menu--horizontal{
    border-bottom:0!important;
  }
  .el-menu{
    border-right: 0!important;
  }
  .el-drawer__body{
    background-color: #3c444c;
  }
  :focus{
    outline: 0;
  }
</style>
