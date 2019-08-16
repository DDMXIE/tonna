<template>
  <div style="width:100%;height:100%"> 
    <div style="width:100%,">
      <Bread></Bread>
    </div>
    <div style="padding-top:60px;">
      <el-row>
        <el-col :span="8">
          <el-row>
            <el-col :span="12">
              <el-card :body-style="{ padding: '10px' }">
                <img src="../assets/notePad/1.jpg" width="100%">
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card :body-style="{ padding: '10px' }">
                <img src="../assets/notePad/2.jpg" width="100%">
              </el-card>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-card :body-style="{ padding: '10px' }">
                <img src="../assets/notePad/3.jpg" width="100%">
              </el-card>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="16">
          <div>
              <div style="padding-left:20px;padding-right:20px;">
                <div>
                  <!-- <span style="padding-left:20px;">留言板:</span> -->
                  <el-input
                    style="width:95%"
                    class="note-input"
                    type="textarea"
                    placeholder="有什么想说的..."
                    v-model="noteContent"
                    :autosize="{ minRows: 2, maxRows: 50}"
                  >
                  </el-input>
                </div>
                <div class="note-btn">
                  <el-button type="primary" @click="addNote">我要留言<i class="el-icon-s-comment el-icon--right"></i></el-button>
                </div>
            </div>
            <div>
              <div class="block note-pad">
                <el-timeline>
                  <el-timeline-item v-for="item in notes" :timestamp="item.time" placement="top">
                    <el-card>
                      <h4>{{item.title}}</h4>
                      <p>{{item.content}}</p>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </div>
          </div>
          
        </el-col>
      </el-row>
      
    </div>

  </div>
</template>

<script>
import Bread from '../components/Bread'
export default {
  components: { Bread },
  data() {
    return {
      myBackToTopStyle: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        borderRadius: '4px',
        lineHeight: '45px', // 请保持与高度一致以垂直居中
        background: '#e7eaf1'// 按钮的背景颜色
      },
      userId: '', // 用户
      noteContent: '', // 留言内容
      notes: [{ // 留言list假数据
        title: '123123',
        content: 'asfsdfdsf',
        time: ' 2019/8/2 08:40:40'
      }, {
        title: '456456',
        content: 'dfdeer',
        time: ' 2019/5/11 14:11:43'
      }, {
        title: '6578678',
        content: 'sdfdf',
        time: ' 2018/8/24 21:40:23'
      }]
    }
  },
  methods: {
    // 添加留言板留言
    addNote() {
      var pushNote = {}
      pushNote.title = '来自用户' + ' ' + (this.userId++).toString() + ' ' + '的留言'
      pushNote.content = this.noteContent
      pushNote.time = this.formatDate(new Date(), 'yyyy/MM/dd hh:mm:ss')
      if (this.noteContent !== '') {
        this.notes.unshift(pushNote)
        this.noteContent = ''
      } else {
        this.$alert('请先填写留言后提交')
      }
      // console.log(pushNote)
    },
    // 时间格式化方法
    formatDate(date, fmt) {
      var currentDate = new Date(date)
      var o = {
        'M+': currentDate.getMonth() + 1, // 月份
        'd+': currentDate.getDate(), // 日
        'h+': currentDate.getHours(), // 小时
        'm+': currentDate.getMinutes(), // 分
        's+': currentDate.getSeconds(), // 秒
        'q+': Math.floor((currentDate.getMonth() + 3) / 3), // 季度
        'S': currentDate.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (currentDate.getFullYear() + '').substr(4 - RegExp.$1.length))
      for (var k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
      return fmt
    }
  }
}
</script>

<style scoped>
  .note-input{
    padding-left: 20px;
    padding-right:10px;
  }
  .note-btn{
    padding-top:10px;
    padding-left:20px;
  }
  .note-pad{
    padding-top:20px;
    padding-right:50px;
  }
</style>


