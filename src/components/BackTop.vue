<template>
  <transition name='el-fade-in-linear'>
    <div class='page-component-up' v-if='isShow' @click='getTop'>
      <i class="el-icon-caret-top"></i>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'BackTop',
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    //  添加样式，鼠标hover上去，改变颜色
    addhoverClass(e) {
      if (e.type === 'mouseover' && this.$el.classList) {
        this.$el.classList.add('hover')
      } else if (e.type === 'mouseout' && this.$el.classList) {
        this.$el.classList.remove('hover')
      }
    },
    showIcon() {
      if (document.documentElement.scrollTop > 100) {
        this.isShow = true
        this.$el.addEventListener('mouseover', this.addhoverClass)
        this.$el.addEventListener('mouseout', this.addhoverClass)
      } else if (document.documentElement.scrollTop < 100) {
        this.isShow = false
      }
    },
    getTop() {
      const timer = setInterval(() => {
        const top = document.documentElement.scrollTop
        const speed = Math.ceil(top / 5)
        document.documentElement.scrollTop = top - speed
        if (top === 0) {
          clearInterval(timer)
        }
      }, 20)
    }
  },
  mounted() {
    window.addEventListener('scroll', this.showIcon)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.showIcon)
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.slide-fade-enter-active {
  transition: all .1s ease;
}
.slide-fade-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.3, 0.8, 1.0);
  opacity: 0;
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active 在低于 2.1.8 版本中 */ {
  // transform: translateY(-20px);
  opacity: 0;
}
.page-component-up {
  background-color: rgb(53, 53, 53);
  position: fixed;
  right: 3rem;
  bottom: 5rem;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  cursor: pointer;
  opacity: .8;
  transition: .3s;
  text-align: center;
  // z-index: 999;
  z-index: 1501;
}
.el-icon-caret-top {
  font-size: 36px;
  margin-top: 7px;
  color: #FFFFFF;
  text-align: center;
  z-index: 1000
}
.hover {
  background-color: #409EFF;
  // background-color: #f5a600;
}
</style>
