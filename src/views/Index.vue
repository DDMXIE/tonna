<template>
  <el-container>
  <el-header style="margin:0;padding:0;position:fixed;left:0;top:0;z-index:1000;width:100%">
      <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group> -->
      <el-row :style="{'backgroundColor':topMenuBgColor}">
        <el-col :span="4">
          <span class="title" @click="menuCollapse" :style="{'color':titleColor}">Tonna</span>
        </el-col>
        <el-col :span="20">
            <el-menu
              :router="true"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              :background-color="topMenuBgColor"
              text-color="#fff"
              :active-text-color="topMenuChosedColor" >
                <el-menu-item index="/index/PersonalManage" style="font-weight:bolder">个人中心</el-menu-item>
                <el-submenu index="2">
                  <template slot="title" style="font-weight:bolder">我的工作台</template>
                  <el-menu-item index="2-1">选项1</el-menu-item>
                  <el-menu-item index="2-2">选项2</el-menu-item>
                  <el-menu-item index="2-3">选项3</el-menu-item>
                  <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                    <el-menu-item index="2-4-2">选项2</el-menu-item>
                    <el-menu-item index="2-4-3">选项3</el-menu-item>
                  </el-submenu>
                </el-submenu>
                <el-menu-item index="3" style="font-weight:bolder">文章管理</el-menu-item>
                <el-menu-item index="4" style="font-weight:bolder">消息中心</el-menu-item>
                <!-- <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item> -->
                <div style="float:right;margin-top:15px;padding-right:10px;">
                  <!-- <el-radio-group v-model="isCollapse" size="mini">
                  <el-radio-button :label="false">展开</el-radio-button>
                  <el-radio-button :label="true">收起</el-radio-button>
                  </el-radio-group> -->
                  <!-- <el-dropdown size="mini" split-button type="primary">
                    切换主题
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click="changeColor">浅色模式</el-dropdown-item>
                      <el-dropdown-item>深色模式</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown> -->
                  <el-radio-group v-model="whatColorRadio" size="mini">
                    <el-radio-button label="浅色模式"></el-radio-button>
                    <el-radio-button label="深色模式"></el-radio-button>
                  </el-radio-group>
                  <el-button type="info" 
                    size="mini"
                    @click="menuCollapse"
                    style="margin-left:10px;">
                    <!-- <span v-if="isCollapse === true">展开&nbsp;</span>
                    <span v-if="isCollapse === false">折叠&nbsp;</span> -->
                    <i v-if="isCollapse === true" class="el-icon-s-unfold">&nbsp;菜单</i>
                    <i v-if="isCollapse === false" class="el-icon-s-fold">&nbsp;菜单</i>
                  </el-button>
                  <!-- <el-avatar shape="square" size="small" :src="squareUrl"></el-avatar> -->
                </div>
              </el-menu>
        </el-col>
      </el-row>
    
  </el-header>

  <!-- <el-container class="aside" :style="height">
      <el-menu
      :router="true"
      :default-active="$route.path"
      class="el-menu-vertical-demo" 
      @open="handleOpen" 
      @close="handleClose" 
      :unique-opened="true"
      :background-color="leftMenuBgColor"
      :text-color="leftMenuTextColor"
      :active-text-color="leftMenuChosedColor"
      :collapse="isCollapse" style="height:-webkit-fill-available"
      @mouseenter.native="menuOpen"
      @mouseleave.native="menuClose"
      > -->
    
        <!-- <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item-group>
            <span slot="title">分组一</span>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <span slot="title">选项4</span>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu> -->


        <!-- <el-menu-item index="/index/home">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item> -->
        <!-- <el-menu-item index="/index/about">
          <i class="el-icon-camera-solid"></i>
          <span slot="title">新世界</span>
        </el-menu-item> -->
        <!-- <el-menu-item index="/index/preview">
          <i class="el-icon-document"></i>
          <span slot="title">图片预览</span>
        </el-menu-item> -->
         <!-- <el-menu-item index="/index/surf">
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
      </el-menu> -->
    
  <!-- </el-container> -->
    <el-main class="main" style="padding:0;margin:0;padding-top:60px;">
        <el-scrollbar style="width:100%;height:100%">
          <transition name="router">
            <router-view></router-view>
          </transition>
        </el-scrollbar>
    </el-main>

    <el-drawer
      title="欢迎来到 Tonna！"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="Close"
      :size="menuSize"
      >
        <el-menu
        :router="true"
        :default-active="$route.path"
        class="el-menu-vertical-demo" 
        @open="handleOpen" 
        @close="handleClose" 
        :unique-opened="true"
        :background-color="leftMenuBgColor"
        :text-color="leftMenuTextColor"
        :active-text-color="leftMenuChosedColor"
        :collapse="isCollapse" style="height:-webkit-fill-available"
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
        <el-menu-item index="/index/lifeStyle">
          <i class="el-icon-s-shop"></i>
          <span slot="title">生活</span>
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
      this.menuSize = '50%'
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
      whatColorRadio: '深色模式',
      topMenuChosedColor: '#6bd9ff',
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
      console.log('fdasdfdsaf')
      this.leftMenuBgColor = '#454545'
    },
    Close(done) {
      done()
    }
  },
  watch: {
    whatColorRadio(val) {
      if (val === '深色模式') {
        this.titleColor = '#fff'
        this.topMenuChosedColor = '#6bd9ff'
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
</style>
