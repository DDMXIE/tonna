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
      label="笔记ID"
      width="180"
      show-overflow-tooltip>
      <template slot-scope="scope">
        {{scope.row.article.article_ID}}
      </template> 
    </el-table-column>
    <el-table-column
      prop="article_TITLE"
      label="标题"
      width="180"
      show-overflow-tooltip>
      <template slot-scope="scope">
        {{scope.row.article.article_TITLE}}
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
      show-overflow-tooltip>
      <template slot-scope="scope">
        {{scope.row.article.update_DATE}}
       </template> 
    </el-table-column>



    <el-table-column
      prop="role_ID"
      label="权限"
      width="120"
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
  
  </div>
</template>

<script>
import { findAllArticleByPage } from '@/api'
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
      }]
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
        console.log(res)
        this.total = res.data.data.total
        this.tableData = []
        // this.tableData = res.data.data.userList
        console.log(res.data.data)
        for (var i = 0; i < res.data.data.userList.length; i++) {
          res.data.data.userList[i].article.create_DATE = utilFunction.timeFormat(res.data.data.userList[i].article.create_DATE, '.')
          res.data.data.userList[i].article.update_DATE = utilFunction.timeFormat(res.data.data.userList[i].article.update_DATE, '.')
          //   if (res.data.data.userList[i].user_ENABLED === true) {
          //     res.data.data.userList[i].user_ENABLED_DSCP = '使用中'
          //   } else {
          //     res.data.data.userList[i].user_ENABLED_DSCP = '封号'
          //   }
          this.tableData.push(res.data.data.userList[i])
        }
      })
    },
    currentChange(page) {
      this.pageSize.start = page
      this.loadData()
    }
  }
}
</script>

<style scoped>

</style>
