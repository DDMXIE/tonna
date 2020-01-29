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
  }

}
