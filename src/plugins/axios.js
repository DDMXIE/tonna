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
    if (config.url !== '/login' && reqUrl !== 'https://www.tianqiapi.com/' &&
    config.url !== '/tonna/findAllArticle' && config.url !== '/tonna/findAritcleByIdUser' &&
    config.url !== '/tonna/findUserActivityByPage' && config.url !== '/tonna/findUserAndAuthorAttention' &&
    config.url !== '/tonna/findAuthorArticle') {
      config.headers.Authorization = 'bearer ' + localStorage.getItem('token')
    }
    if (localStorage.getItem('token') === null) {
      if (config.url === '/admin/addOrReplyTalk' || config.url === '/admin/likeArticleByUser' ||
      config.url === '/admin/collectArticleByUser' || config.url === '/admin/addAttentionByUser') {
        Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
        Vue.prototype.$confirm('立即登录Tonna, 是否继续?', {
          dangerouslyUseHTMLString: true,
          center: true,
          message: ' <div style="text-align:center;"><i class="el-icon-user-solid" style="font-size:60px;color:#67C23A;"/><div style="padding-top:0;"><span style="font-weight:300;font-size:20px;color:black;">即刻登录Tonna</span></div></div>',
          confirmButtonText: '好',
          cancelButtonText: '再看看'
        }).then(() => {
          router.replace({
            path: '/login'
          })
        }).catch(() => {
        })
      }
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
    // console.log('response', response)
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
          localStorage.removeItem('user_id')
          localStorage.removeItem('user_img')
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
