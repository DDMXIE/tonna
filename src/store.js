import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // user_name: ''
    user_id: '' || localStorage.getItem('user_id'),
    user_name: '' || localStorage.getItem('user_name')
  },
  mutations: {
    handleUserId: (state, user_id) => {
      state.user_id = user_id
      // 把登录的用户的名保存到localStorage中，防止页面刷新，导致vuex重新启动，用户名就成为初始值（初始值为空）的情况
      localStorage.setItem('user_id', user_id)
    },
    handleUserName: (state, user_name) => {
      state.user_name = user_name
      // 把登录的用户的名保存到localStorage中，防止页面刷新，导致vuex重新启动，用户名就成为初始值（初始值为空）的情况
      localStorage.setItem('user_name', user_name)
    }
  },
  actions: {

  },
  getters: {
    userName: (state) => state.user_name,
    userId: (state) => state.user_id
  }
})
