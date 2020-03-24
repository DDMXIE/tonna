<template>
  <div>
    <div style="padding-left:10px;">
      <el-table
        stripe
        ref="filterTable"
        :data="tableData"
        style="width: 100%;">
        
        <el-table-column
          fixed
          prop="article_TITLE"
          label="笔记标题"
          width="240"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.article_TITLE}}
          </template> 
        </el-table-column>

         <el-table-column
            width="120"
            label="评论用户">
            <template slot-scope="scope">
              <img :src="scope.row.user_IMG" width="40px" style="border-radius:10px;"/>
            </template>
          </el-table-column>

         <el-table-column
            prop="owner_NAME"
            label="用户名"
            width="110"
            show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.owner_NAME}}
            </template> 
          </el-table-column>

          <el-table-column
            prop="reply_CONTENT"
            label="评论内容"
            width="240"
            show-overflow-tooltip>
            <template slot-scope="scope">
              {{scope.row.reply_CONTENT}}
            </template> 
          </el-table-column>

           <el-table-column
              prop="article_status"
              label="评论类型"
              width="180"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <div v-if="scope.row.reply_ID === '0'">
                  <!-- <el-button type="primary" round size="mini">文章评论</el-button> -->
                    <el-tag
                      :type="''"
                      effect="dark">
                      文章评论
                    </el-tag>
                </div>
                <div v-else>
                    <el-tag
                      :type="'danger'"
                      effect="dark">
                      评论回复：{{scope.row.target_NAME}}
                    </el-tag>
                  <!-- <el-button type="danger" round size="mini">评论回复：{{scope.row.target_NAME}}</el-button> -->
                </div>
              </template> 
            </el-table-column>

             <el-table-column
                prop="create_DATE"
                label="评论时间"
                width="180"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  {{scope.row.create_DATE}}
                </template> 
              </el-table-column>

              <el-table-column
                prop="article_operate"
                width="180"
                label="操作"
                fixed="right"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <div>
                    <el-button type="success" round size="mini" @click="scanAndEdit(scope.row)">详情<i class="el-icon-edit el-icon--right"></i></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteTalkBySuper(scope.row)"></el-button>
                  </div>
                </template> 
              </el-table-column>
      </el-table>
    </div>
    <div style="text-align:center;padding-top:30px;">
        <el-pagination
          :page-size="7"
          background
          layout="prev, pager, next"
          @current-change="currentChange"
          :total="total">
        </el-pagination>
    </div>

    <el-dialog title="评论详情" :visible.sync="dialogFormVisible">
      <div style="text-align:center;">
        <el-avatar shape="square" :size="120"  :fit="fit" :src="form.user_IMG"></el-avatar>
        <div style="padding-top:15px;padding-bottom:40px;"><span style="font-size:25px;font-weight:200;">{{form.owner_NAME}} - 评论</span></div>
      </div>
      <el-form :model="form">
        <el-form-item label="评论笔记" :label-width="formLabelWidth">
          <el-input :readonly="true" v-model="form.article_TITLE" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="评论内容" :label-width="formLabelWidth">
          <el-input :disabled="isNotEdit" v-model="form.reply_CONTENT" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="isNotEdit === true" type="primary" round @click="startEdit">修 改</el-button>
        <el-button v-else type="success" round @click="submitEdit">确 定</el-button>
        <el-button v-if="isNotEdit === false" plain round @click="cancelEdit">取 消</el-button>
      </div>
  </el-dialog>
  </div>
</template>

<script>
import { findAllTalkBySuper, updateTalkBySuper, deleteTalkBySuper } from '@/api'
import utilFunction from '../utilFunction'
export default {
  data() {
    return {
      total: null,
      pageSize: {
        start: 1,
        end: 7
      },
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      isNotEdit: true,
      form: {
        talk_ID: '',
        reply_CONTENT: '',
        user_IMG: '',
        owner_NAME: '',
        article_TITLE: ''
      }
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      this.findAllTalkBySuper()
    },
    findAllTalkBySuper() {
      var params = {}
      params.start = this.pageSize.start
      params.end = this.pageSize.end
      findAllTalkBySuper(params).then(res => {
        console.log('这里这里', res)
        this.total = res.data.data.total
        this.tableData = []
        console.log(res.data.data)
        for (var i = 0; i < res.data.data.userList.length; i++) {
          res.data.data.userList[i].create_DATE = utilFunction.timeFormat(res.data.data.userList[i].create_DATE, '.')
          res.data.data.userList[i].update_DATE = utilFunction.timeFormat(res.data.data.userList[i].update_DATE, '.')
          this.tableData.push(res.data.data.userList[i])
        }
      })
    },
    currentChange(page) {
      this.pageSize.start = page
      this.loadData()
    },
    startEdit() {
      this.isNotEdit = false
    },
    cancelEdit() {
      this.isNotEdit = true
    },
    submitEdit() {
      var params = {}
      params.talkId = this.form.talk_ID
      params.replyContent = this.form.reply_CONTENT
      updateTalkBySuper(params).then(res => {
        console.log('###', res)
        this.dialogFormVisible = false
        this.isNotEdit = true
        this.loadData()
        this.$notify({
          title: 'Tonna',
          message: '评论内容已成功修改',
          type: 'success'
        })
      })
    },
    deleteTalkBySuper(item) {
      this.$confirm('此操作将删除该条笔记, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = {}
        params.talkId = item.talk_ID
        deleteTalkBySuper(params).then(res => {
          this.loadData()
          this.$notify({
            title: 'Tonna',
            message: '评论已成功删除',
            type: 'success'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    scanAndEdit(item) {
      this.dialogFormVisible = true
      console.log('----', item)
      this.form.talk_ID = item.talk_ID
      this.form.user_IMG = item.user_IMG
      this.form.owner_NAME = item.owner_NAME
      this.form.article_TITLE = item.article_TITLE
      this.form.reply_CONTENT = item.reply_CONTENT
    }
  }
}
</script>

<style scoped>

</style>
