import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Index from './views/Index'
import HomePage from './views/HomePage'
import Surf from './views/Surf'
import EditPage from './views/EditPage'
import ArticleView from './views/ArticleView'
import NotePad from './views/NotePad'
import LifeStyle from './views/LifeStyle'
// importLifeStyle Waterfall from './views/Waterfall'
import PersonalManage from './views/PersonalManage'
import Login from './views/Login'
import Register from './views/Register'
import Weather from './views/Weather'
import ArticleDetail from './views/ArticleDetail'
import ConnectUs from './views/ConnectUs'
import UserPage from './views/UserPage'
import PersonalEdit from './views/PersonalEdit'
import Superindex from './superviews/SuperIndex.vue'
import UserManage from './superviews/UserManage.vue'
import DataManage from './superviews/DataManage.vue'
import SuperLogin from './superviews/SuperLogin.vue'
import ArticleManage from './superviews/ArticleManage.vue'

// import Waterfall from './views/Waterfall'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base:
    process.env.NODE_ENV === 'production' // 用于部署服务器时mode:'history'的解决方案
      ? '/' // '/views/index2.html/'
      : '/',
  routes: [
    {// 首页
      path: '/',
      redirect: '/index/surf'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [{
        // 测试页
        path: 'about',
        name: 'about',
        component: About
      }, {// 测试首页
        path: 'home',
        name: 'home',
        component: HomePage
      },
      {// 首页
        path: 'surf',
        name: 'surf',
        component: Surf
      },
      {// 文章发表
        path: 'editPage',
        name: 'editPage',
        component: EditPage
      },
      {// 我的发表
        path: 'articleView',
        name: 'articleView',
        component: ArticleView,
        meta: { title: '社区' }
      },
      {// 留言板
        path: 'notePad',
        name: 'notePad',
        component: NotePad,
        meta: { title: '留言板' }
      },
      {
        path: 'lifeStyle',
        name: 'lifeStyle',
        component: LifeStyle,
        meta: { title: '生活方式' }
      },
      {
        path: 'weather',
        name: 'weather',
        component: Weather,
        meta: { title: '天气' }
      },
      // {// 生活
      //   path: 'life',
      //   name: 'life',
      //   component: LifeStyle,
      //   meta: { title: '生活' },
      // },
      {// 个人中心
        path: 'personalManage',
        name: 'personalManage',
        component: PersonalManage,
        meta: { title: '个人中心' }
      },
      // { //瀑布流
      //   path: 'waterfall',
      //   name: 'waterfall',
      //   component: Waterfall
      // }
      {
        path: 'articleDetail',
        name: 'articleDetail',
        component: ArticleDetail,
        meta: { title: '文章预览' }
      },
      {
        path: 'connectUs',
        name: 'connectUs',
        component: ConnectUs,
        meta: { title: '关于我们' }
      }, {
        path: 'userPage',
        name: 'userPage',
        component: UserPage,
        meta: { title: '用户主页' }
      },
      {
        path: 'personalEdit',
        name: 'personalEdit',
        component: PersonalEdit,
        meta: { title: '用户信息' }
      }
      ]
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
      component: About
    },
    {
      path: '/superlogin',
      name: 'superlogin',
      component: SuperLogin
    },
    {
      path: '/superindex',
      name: 'superindex',
      component: Superindex,
      children: [{
        // 数据中心
        path: 'userManage',
        name: 'userManage',
        component: UserManage,
        meta: { title: '数据中心' }
      },
      {
        // 用户管理
        path: 'dataManage',
        name: 'dataManage',
        component: DataManage,
        meta: { title: '用户管理' }
      }, {
        // 用户管理
        path: 'articleManage',
        name: 'articleManage',
        component: ArticleManage,
        meta: { title: '笔记管理' }
      }]
    }
  ]
})
