<template>
  <div class="about" style="width:100%">
    <h1>This is an about page</h1>
    <div>
      <span>{{ date }}</span>
      <!-- <ul>
        <li
          v-for="item in sortArr"
          style="list-style:none"
          :key="item"
        >{{item}}</li>
      </ul> -->

      <span>{{newText}}</span>
      <div>
        <el-button
          type="primary"
          round
          @click="changeArr"
        >改变数组</el-button>
      </div>

      <a :href="url">进入Vue.js官网</a>

      <div>
        <span :class="{redFont:isFontRed}">我要绑定Class</span>
        <el-button
          type="primary"
          round
          @click="isFontRed = true"
        >字体变红色</el-button>
        <span :class="[isFontRed?redFont:blueFont]">我要绑定Class</span>
        <span :style="{'fontSize':fontSize+'px'}">绑定内联样式</span>
      </div>

      <div v-cloak>{{msg}}</div>

      <div>
        <el-button
          type="primary"
          round
          @click="show"
        >showDialog</el-button>
        <Dialog ref="dialog"></Dialog> 
      </div>
    </div>
    <div>
      <el-row>
        <el-col :span="6">
            <div style="text-align:center;padding-top:20px">
              <el-scrollbar style="height:360px;text-align:center" >
                <div v-for="(img,index) in imgList" :key="index">
                  <img :src="img.url" style="width:300px">
                </div>
              </el-scrollbar>
            </div>
        </el-col>
         <el-col :span="6">
            <div style="text-align:center;padding-top:20px">
              <el-scrollbar style="height:360px;text-align:center" >
                <div v-for="(img,index) in imgList" :key="index">
                  <img :src="img.url" style="width:300px">
                </div>
              </el-scrollbar>
            </div>
        </el-col>
      </el-row>
    </div>

  

  </div>
</template>

<script>
import Dialog from '../components/DialogManage'
export default {
  components: {
    Dialog: Dialog
  },
  mounted() {
    this.createDate()
  },
  data() {
    return {
      date: '',
      arr: [1, 56, 456, 45, 57, 3],
      text: 'dsafl,kjdfadsh,fdsfbjkdas,fhjkdls',
      url: 'https://cn.vuejs.org/v2/guide/',
      isFontRed: false,
      redFont: 'redFont',
      blueFont: 'blueFont',
      fontSize: 34,
      msg: 'sdfdsafjdsiafuysdh',
      imgList: [{ url: require('../assets/water/1.jpg') },
        { url: require('../assets/water/2.jpg') },
        { url: require('../assets/water/3.jpg') },
        { url: require('../assets/water/4.jpg') }
      ]
    }
  },
  methods: {
    createDate() {
      var date_1 = new Date()
      this.date = date_1
      return this.date
    },
    changeArr() {
      this.arr = [1111111, 56, 456, 45, 56, 3] // 当计算属性设计到的值发生改变的时候，每一次都会再调用计算属性
    },
    show() {
      this.$refs.dialog.showDialog()
    }
  },
  computed: {
    // 使用计算属性，每一个计算属性不需要全局定义
    // 计算属性依赖缓存，依赖的数据发生变化时才调用
    sortArr: function sort(a, b) {
      return this.arr.sort()
    },
    newText: function() {
      return this.arr.reverse()
    }
  }
}
</script>

<style>
.is-vertical {    display: none;
}
.el-scrollbar__wrap {
   overflow-x: hidden;
 }
.about {
  text-align: center;
}
.redFont {
  color: red;
}
.blueFont {
  color: blue;
}
</style>
