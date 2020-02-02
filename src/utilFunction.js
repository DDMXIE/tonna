import Vue from 'vue'
import router from './router'
export default {
  // 时间格式化方法2
  timeFormat(time, flag) { // flag是以什么隔开
    var d = new Date(time)

    var year = d.getFullYear() // 年
    var month = d.getMonth() + 1 // 月
    var day = d.getDate() // 日

    var hh = d.getHours() // 时
    var mm = d.getMinutes() // 分
    var ss = d.getSeconds() // 秒

    var clock = year + flag

    if (month < 10) { clock += '0' }

    clock += month + flag

    if (day < 10) { clock += '0' }

    clock += day + ' '

    if (hh < 10) { clock += '0' }

    clock += hh + ':'
    if (mm < 10) clock += '0'
    clock += mm + ':'

    if (ss < 10) clock += '0'
    clock += ss
    return (clock)
  },
  showGoToLogin() {
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
