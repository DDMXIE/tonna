<template>
  <div class="bread" style="width:100%">
      <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item)  in levelList" :key="item.path" v-if="item.meta.title">
            <router-link :to="item.redirect||item.path">{{item.meta.title}}</router-link>
          </el-breadcrumb-item>
      </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      levelList: null
    }
  },
  methods: {
    /**
           * 生成面包屑的方法
           */
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name !== '首页') {
        matched = [{ path: '/index/surf', meta: { title: 'Tonna' }}].concat(matched)
      }
      this.levelList = matched
    }
  },
  mounted() {
    this.getBreadcrumb()
  },
  watch: {
    $route(to, from) {
      this.getBreadcrumb()
    }
  }
}
</script>

<style>
  .bread{
    padding-top:20px;
    padding-bottom:15px;
    padding-left: 20px;
    background-color:white;
    position:absolute;
    z-index: 999;
  }
</style>


