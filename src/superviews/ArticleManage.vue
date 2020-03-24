<template>
  <div style="padding-left:10px;">
  <!-- <el-button @click="resetDateFilter">清除用户状态筛选</el-button>
  <el-button @click="clearFilter">清除所有筛选</el-button> -->
  <el-table
    stripe
    ref="filterTable"
    :data="tableData"
    style="width: 100%;">
    
    <el-table-column
      fixed
      prop="article_TITLE"
      label="笔记标题"
      width="180"
      show-overflow-tooltip>
      <template slot-scope="scope">
        {{scope.row.article.article_TITLE}}
      </template> 
    </el-table-column>
    <el-table-column
     
      label="笔记ID"
      width="180"
      show-overflow-tooltip>
      <template slot-scope="scope">
        {{scope.row.article.article_ID}}
      </template> 
    </el-table-column>
     <el-table-column
      prop="article_TITLE"
      label="作者"
      width="80"
      show-overflow-tooltip>
      <template slot-scope="scope">
        {{scope.row.article_AUTHOR}}
      </template> 
    </el-table-column>

    <el-table-column
      width="90"
      label="用户头像">
      <template slot-scope="scope">
        <img :src="scope.row.user_IMG" width="40px" style="border-radius:10px;"/>
      </template>
    </el-table-column>

    <el-table-column
      prop="create_DATE"
      label="创建时间"
      sortable
      :formatter="formatter"
      width="180"
      show-overflow-tooltip>
       <template slot-scope="scope">
        {{scope.row.article.create_DATE}}
       </template> 
    </el-table-column>

    <el-table-column
      prop="update_DATE"
      label="更新时间"
       width="180"
      show-overflow-tooltip>
      <template slot-scope="scope">
        {{scope.row.article.update_DATE}}
       </template> 
    </el-table-column>

    <el-table-column
      prop="article_status"
      label="状态"
       width="125"
      show-overflow-tooltip>
      <template slot-scope="scope">
        <!-- {{scope.row.article.article_STATUS}} -->
        <div v-if="scope.row.article.article_STATUS === '1'">
          <el-button type="warning" round size="mini" @click="goToCheck(scope.row)">待审核</el-button>
        </div>
        <div v-if="scope.row.article.article_STATUS === '2'">
          <el-button type="info" round size="mini">已保存</el-button>
        </div>
        <div v-if="scope.row.article.article_STATUS === '3'">
          <el-button type="success" round size="mini" @click="goToCheck(scope.row)">已发表</el-button>
        </div>
       </template> 
    </el-table-column>

    <el-table-column
      prop="role_ID"
      label="权限"
       width="180"
      sortable
      :filters="[{ text: '所有人可见', value: '2' }, { text: '私密', value: '1' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="'success'"
          disable-transitions v-if="scope.row.article.article_SECURITY === '2'">
          所有人可见
          </el-tag>
          <el-tag
          :type="'danger'"
          disable-transitions v-else>
          私密
          </el-tag>
      </template>
    </el-table-column>

    <el-table-column
      prop="article_operate"
      width="180"
      label="操作"
      fixed="right"
      show-overflow-tooltip>
      <template slot-scope="scope">
        <!-- {{scope.row.article.article_STATUS}} -->
        <div>
          <el-button type="primary" round size="mini" @click="scanAndEdit(scope.row)">详情<i class="el-icon-edit el-icon--right"></i></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteArticleBySuper(scope.row)"></el-button>
        </div>
       </template> 
    </el-table-column>
  </el-table>
    <div style="text-align:center;padding-top:30px;">
        <el-pagination
          :page-size="7"
          background
          layout="prev, pager, next"
          @current-change="currentChange"
          :total="total">
        </el-pagination>
    </div>

  <el-dialog title="笔记详情" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="笔记标题" :label-width="formLabelWidth">
          <el-input :disabled="isNotEdit" v-model="form.article_TITLE" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="笔记作者" :label-width="formLabelWidth">
          <el-input :disabled="isNotEdit" v-model="form.article_AUTHOR" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="笔记简览" :label-width="formLabelWidth">
          <el-input :disabled="isNotEdit" v-model="form.article_CONTENT_HTML" type="textarea" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="笔记内容" :label-width="formLabelWidth" >
          <el-input :disabled="isNotEdit" v-model="form.article_CONTENT" type="textarea" autocomplete="off" :autosize="{ minRows: 2, maxRows: 6 }"></el-input>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth" prop="article_SECURITY">
          <el-switch
            :disabled="isNotEdit"
            v-model="articleSecurity"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="所有人可见"
            inactive-text="私密">
          </el-switch>
        </el-form-item>

        <el-form-item label="文章类型" :label-width="formLabelWidth">
          <el-select :disabled="isNotEdit" v-model="form.type_ID" placeholder="请选择文章类型">
              <el-option v-for="(item,index) in constType" :label="item.type_NAME" :value="item.type_ID" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="isNotEdit === true" type="primary" round @click="startEdit">修 改</el-button>
        <el-button v-else type="success" round @click="submitEdit">确 定</el-button>
        <el-button v-if="isNotEdit === false" plain round @click="cancelEdit">取 消</el-button>
      </div>
  </el-dialog>
  <el-dialog title="笔记审核" :visible.sync="checkDialogVisible">
    <div>
       <el-form :model="form">
        <el-form-item label="笔记标题" :label-width="formLabelWidth">
          <el-input :readonly="true" v-model="form.article_TITLE" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="笔记作者" :label-width="formLabelWidth">
          <el-input :readonly="true" v-model="form.article_AUTHOR" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="笔记简览" :label-width="formLabelWidth">
          <el-input :readonly="true" v-model="form.article_CONTENT_HTML" type="textarea" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="笔记内容" :label-width="formLabelWidth" >
          <el-input :readonly="true" v-model="form.article_CONTENT" type="textarea" autocomplete="off" :autosize="{ minRows: 2, maxRows: 6 }"></el-input>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth" prop="article_SECURITY">
          <el-switch
            :disabled="isNotEdit"
            v-model="articleSecurity"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="所有人可见"
            inactive-text="私密">
          </el-switch>
        </el-form-item>

        <el-form-item label="文章类型" :label-width="formLabelWidth">
          <el-select :disabled="isNotEdit" v-model="form.type_ID" placeholder="请选择文章类型">
              <el-option v-for="(item,index) in constType" :label="item.type_NAME" :value="item.type_ID" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
      <div slot="footer" class="dialog-footer"> 
        <el-button v-if="form.article_STATUS === '1'" type="primary" round @click="submitCheck('3')">通过审核</el-button>
        <el-button v-else-if="form.article_STATUS === '3'" type="danger" round @click="submitCheck('1')">撤回审核</el-button>
      </div>
  </el-dialog>
  </div>
</template>

<script>
import { findAllArticleByPage, getConstType, updateArticleBySuper
  , checkArticleBySuper, deleteArticleBySuper } from '@/api'
import utilFunction from '../utilFunction'
export default {
  data() {
    return {
      total: null,
      pageSize: {
        start: 1,
        end: 7
      },
      tableData: [{
        article: {
          article_ID: ''
        }
      }],
      dialogFormVisible: false,
      checkDialogVisible: false,
      formLabelWidth: '120px',
      form: {
        user_IMG: '',
        article_AUTHOR: '',
        article_ID: '',
        create_DATE: '',
        article_STATUS: '',
        is_DELETE: '',
        article_CONTENT_HTML: '',
        article_ORIGIN_USER_ID: '',
        type_ID: '',
        article_TITLE: '',
        article_CONTENT: '',
        article_SECURITY: '',
        update_DATE: ''
      },
      constType: [],
      isNotEdit: true,
      articleSecurity: null
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('user_ENABLED_DSCP')
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter()
    },
    formatter(row, column) {
      return row.user_TEL
    },
    filterTag(value, row) {
      return row.article.article_SECURITY === value
    },
    filterHandler(value, row, column) {
      console.log(value, row, column['property'])
      const property = column['property']
      return row[property] === value
    },
    loadData() {
      var params = {}
      params.start = this.pageSize.start
      params.end = this.pageSize.end
      findAllArticleByPage(params).then(res => {
        this.total = res.data.data.total
        this.tableData = []
        console.log(res.data.data)
        for (var i = 0; i < res.data.data.userList.length; i++) {
          res.data.data.userList[i].article.create_DATE = utilFunction.timeFormat(res.data.data.userList[i].article.create_DATE, '.')
          res.data.data.userList[i].article.update_DATE = utilFunction.timeFormat(res.data.data.userList[i].article.update_DATE, '.')
          this.tableData.push(res.data.data.userList[i])
        }
      })
      this.getArticleType()
    },
    currentChange(page) {
      this.pageSize.start = page
      this.loadData()
    },
    scanAndEdit(item) {
      this.dialogFormVisible = true
      console.log('----', item)
      this.form.user_IMG = item.user_IMG
      this.form.article_AUTHOR = item.article_AUTHOR
      this.form.article_ID = item.article.article_ID
      this.form.create_DATE = item.article.create_DATE
      this.form.article_STATUS = item.article.article_STATUS
      this.form.is_DELETE = item.article.is_DELETE
      this.form.article_CONTENT_HTML = item.article.article_CONTENT_HTML
      this.form.article_ORIGIN_USER_ID = item.article.article_ORIGIN_USER_ID
      this.form.type_ID = item.article.type_ID
      this.form.article_TITLE = item.article.article_TITLE
      this.form.article_CONTENT = item.article.article_CONTENT
      this.form.article_SECURITY = item.article.article_SECURITY
      this.form.update_DATE = item.article.update_DATE
      if (this.form.article_SECURITY === '2') {
        this.articleSecurity = true
      } else {
        this.articleSecurity = false
      }
    },
    getArticleType() {
      var params = {}
      params.constType = 'ARTICLE_TYPE'
      getConstType(params).then(res => {
        this.constType = res.data.data
      })
    },
    startEdit() {
      this.isNotEdit = false
    },
    cancelEdit() {
      this.isNotEdit = true
    },
    submitEdit() {
      var params = {}
      params.articleId = this.form.article_ID
      params.articleTitle = this.form.article_TITLE
      params.articleContentHtml = this.form.article_CONTENT_HTML
      params.articleContent = this.form.article_CONTENT
      params.typeId = this.form.type_ID
      if (this.articleSecurity === true) {
        params.articleSecurity = '2'
      } else {
        params.articleSecurity = '1'
      }
      updateArticleBySuper(params).then(res => {
        this.dialogFormVisible = false
        this.isNotEdit = true
        this.loadData()
        this.$notify({
          title: 'Tonna',
          message: '笔记信息已成功修改',
          type: 'success'
        })
      })
    },
    deleteArticleBySuper(item) {
      this.$confirm('此操作将删除该条笔记, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = {}
        params.articleId = item.article.article_ID
        deleteArticleBySuper(params).then(res => {
          this.loadData()
          this.$notify({
            title: 'Tonna',
            message: '笔记已成功删除',
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
    goToCheck(item) {
      this.scanAndEdit(item)
      this.dialogFormVisible = false
      this.checkDialogVisible = true
    },
    submitCheck(status) {
      var params = {}
      params.articleId = this.form.article_ID
      params.articleStatus = status
      console.log(params)
      checkArticleBySuper(params).then(res => {
        console.log(res)
        this.checkDialogVisible = false
        if (params.articleStatus === '3') {
          this.$notify({
            title: 'Tonna',
            message: '笔记已通过审核',
            type: 'success'
          })
        } else if (params.articleStatus === '1') {
          this.$notify({
            title: 'Tonna',
            message: '笔记已撤回审核',
            type: 'success'
          })
        }
        this.loadData()
      })
    }
  }
}
</script>

<style scoped>

</style>
