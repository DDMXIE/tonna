<template>

<el-container style="height:100%">
  <el-aside width="200px" :style="{backgroundColor: '#203643',height:fullHeight+'px'}">
    <el-menu
      :router="true"
      :default-active="defaultActive"
      class="el-menu-vertical-demo" 
      @open="handleOpen" 
      @close="handleClose" 
      :unique-opened="true"
      :background-color="topMenuBgColor"
      :text-color="topMenuTextColor"
      :active-text-color="topMenuChosedColor"
      :collapse="isCollapse" :style="{width:'100%'}">
      <el-menu-item index="/superindex/dataManage">
          <i class="el-icon-s-marketing"></i>
          <span slot="title">数据中心</span>
      </el-menu-item>
       <el-menu-item index="/superindex/userManage">
          <i class="el-icon-s-custom"></i>
          <span slot="title">用户管理</span>
      </el-menu-item>
    </el-menu>
  </el-aside>

  <el-container>
  <el-header style="padding:0">
      <el-row :style="{'backgroundColor':'#dae1eb'}">
        <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4">
          <img src="../assets/surf/tonna.png" width="60%" style="padding-top:12px;padding-bottom:8px;padding-left:20px;"/>
        </el-col>
      </el-row>
  </el-header>

    <el-main class="main" style="padding:0;margin:0;padding-top:0px;">
        <el-scrollbar style="width:100%;height:100%">
          <transition name="router">
            <router-view></router-view>
          </transition>
        </el-scrollbar>
    </el-main>

  
</el-container>
</el-container>

</template>

<script>
import Bread from '../components/Bread'
export default {
  components: { Bread },
  mounted() {
    const that = this
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight
        that.fullHeight = window.fullHeight
        console.log(that.fullHeight)
      })()
    }
  },
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
      topMenuChosedColor: '#ffda5c',
      topMenuBgColor: '#203643',
      topMenuTextColor: '#b4d1d9',
      titleColor: '#fff',
      isCollapse: true,
      activeIndex: 'home',
      activeIndex2: '1',
      height: {
        height: document.documentElement.clientHeight - 60 + 'px'
      },
      fullHeight: document.documentElement.clientHeight
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
    }
  },

  computed: {
    defaultActive() {
      console.log(this.$route.path)
      return this.$route.path
    }
  },
  watch: {
    fullHeight(val) {
      if (!this.timer) {
        this.fullHeight = val
        this.timer = true
        const that = this
        setTimeout(function() {
          that.timer = false
        }, 400)
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


<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 140px;
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
