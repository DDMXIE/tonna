<template>
  <div style="width:100%;height:100%"> 
    <!-- <div style="width:100%,">
      <Bread></Bread>
    </div> -->
    <div>
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-row>
            <el-col :span="24" style="padding-bottom:20px;">
                <img src="../assets/notePad/note_bg.jpg" width="100%">
                <div style="text-align:center;padding-top:18px;">
                  <i class="el-icon-moon-night" style="font-size:50px;padding-right:25px;"/>
                  <span style="font-size:70px;font-weight:lighter;">留言，</span>
                  <span style="font-size:40px;font-weight:200;">代表你的生活。</span>
                </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div>
              <div style="padding-left:20px;padding-right:20px;">
                <div>
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
                  <el-button type="info" @click="addNote">我要留言<i class="el-icon-s-comment el-icon--right"></i></el-button>
                </div>
            </div>
            <div>
              <div class="block note-pad">
                <el-timeline>
                  <el-timeline-item v-for="(item,index) in notes" :timestamp="item.create_DATE" :key="index" placement="top">
                    <el-card>
                      <h4><i class="el-icon-chat-line-round" style="font-size:25px;"/>&nbsp;来自：{{item.user_NAME}}</h4>
                      <el-row>
                        <el-col :span="22"><p>{{item.message_CONTENT}}</p></el-col>
                        <el-col :span="2"> 
                            <el-button v-if="item.user_ID === $store.getters.userId" 
                                  type="danger" icon="el-icon-delete" style="float:right;" @click="checkDelete(item.message_ID)"></el-button>
                        </el-col>
                      </el-row>
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
import { getMessageByAdmin, addMessageByAdmin, deleteMessageByAdmin } from '@/api'
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
      notes: []// 留言数据
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.getMessageByAdmin()
    },
    // 加载所有留言
    getMessageByAdmin() {
      var params = {}
      params.userId = ''
      getMessageByAdmin(params).then((res) => {
        this.notes = res.data.data
      })
    },
    // 删除自己的留言
    checkDelete(messageId) {
      this.$confirm('忍心删除这条留言, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = {}
        params.messageId = messageId
        deleteMessageByAdmin(params).then(res => {
          console.log('***', res)
          if (res.data.meta === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.loadData()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 添加留言板留言
    addNote() {
      console.log('userid==================', this.$store.getters.userId)
      var pushNote = {}
      pushNote.userId = this.$store.getters.userId
      pushNote.messageContent = this.noteContent
      // pushNote.time = this.formatDate(new Date(), 'yyyy/MM/dd hh:mm:ss')
      if (this.noteContent !== '') {
        addMessageByAdmin(pushNote).then(res => {
          this.noteContent = ''
          this.loadData()
        })
      } else {
        this.$alert('请先填写留言后提交')
      }
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


