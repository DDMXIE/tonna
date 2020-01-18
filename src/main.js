import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import VueQuillEditor from 'vue-quill-editor' // 调用编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VirtualCollection from 'vue-virtual-collection'
// import VueMasonryPlugin from 'vue-masonry'
import VueAMap from 'vue-amap'
import Meta from 'vue-meta'
import echarts from 'echarts'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// Vue.use(VueResouse)
// Vue.use(VueMasonryPlugin)
Vue.use(VueQuillEditor)
Vue.use(VirtualCollection)
Vue.use(VueAMap)
Vue.use(Meta)
Vue.use(mavonEditor)

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

VueAMap.initAMapApiLoader({
  key: 'your amap key',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
