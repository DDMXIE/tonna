'use strict'

import Vue from 'vue'
import axios from 'axios'
import router from '../router'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function(config) {
    var reqUrl
    if (config.url.substr(0, 5) === 'https') {
      reqUrl = config.url.match(/(\S*)api/)[1]
    }
    if (config.url !== '/login' && reqUrl !== 'https://www.tianqiapi.com/') {
      config.headers.Authorization = 'bearer ' + localStorage.getItem('token')
    }
    // Do something before request is sent
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    console.log('response', response)
    return response
  },
  function(error) {
    // Do something with response error
    if (error.response.data && error.response.data.msg === 'Token 已过期，请重新登录验证!') {
      alert('登录过期，请重新登录！')
      axios.post('/logout')
        .then(res => {
          console.log('退出登录 res=>', res)
          localStorage.removeItem('token')
          localStorage.removeItem('user_name')
        })
      router.replace({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }
    return Promise.reject(error)
  }
)

Plugin.install = function(Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios
      }
    },
    $axios: {
      get() {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

// export default Plugin
export default _axios
