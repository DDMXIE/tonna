<template>
  <div class="home" style="width:100%">
    <div :style="{'text-align':Align}">
    <img alt="Vue logo" src="../assets/logo.png" >
    </div>
    <!-- --------1.1、组件的应用------- -->
    <HelloWorld msg="Welcome to Your Vue.js App"/> 
    <About></About>
  </div>
</template>

<script>
// @ is an alias to /src
//  --------1.2、组件的导入-------
import HelloWorld from '@/components/HelloWorld.vue'
import About from './../views/About'

export default {
  name: 'home',
  components: { //  --------1.3、组件的声明-------
    HelloWorld,
    About
  },
  data() {
    return {
      textAlign: 'text-align',
      Align: 'center'
    }
  }
}
</script>
