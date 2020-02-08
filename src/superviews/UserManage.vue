<template>
  <div style="padding-left:10px;">
  <el-button @click="resetDateFilter">清除用户状态筛选</el-button>
  <el-button @click="clearFilter">清除所有筛选</el-button>
  <el-table
    stripe
    ref="filterTable"
    :data="tableData"
    style="width: 100%;">
    <el-table-column
      prop="user_ENABLED_DSCP"
      label="用户状态"
      width="180"
      sortable
      column-key="user_ENABLED_DSCP"
      :filters="[{text: '使用中', value: '使用中'}, {text: '封号', value: '封号'}]"
      :filter-method="filterHandler"
    >
    </el-table-column>
    <el-table-column
      prop="user_NAME"
      label="用户名"
      width="180">
    </el-table-column>

    <el-table-column
      prop="user_TEL"
      label="电话"
      :formatter="formatter"
      width="180">
    </el-table-column>

    <el-table-column
      prop="user_INTRODUCE"
      label="个人简介"
      >
    </el-table-column>
       <el-table-column
      label="用户头像">
      <template slot-scope="scope">
        <img :src="scope.row.user_IMG" width="40px" style="border-radius:10px;"/>
      </template>
       </el-table-column>

    <el-table-column
      prop="role_ID"
      label="用户权限"
      width="120"
      sortable
      :filters="[{ text: '用户', value: '2565bhg2-bg9f-4dd6-9f03-b1235e883365' }, { text: '系统管理员', value: '14b8a5f2-659f-4dd6-9f03-b1235e883470' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="'success'"
          disable-transitions v-if="scope.row.role_ID === '2565bhg2-bg9f-4dd6-9f03-b1235e883365'">
          用户
          </el-tag>
          <el-tag
          :type="'danger'"
          disable-transitions v-else>
          管理员
          </el-tag>
      </template>
    </el-table-column>
  </el-table>
    <div style="text-align:center;padding-top:30px;">
        <el-pagination
          :page-size="2"
          background
          layout="prev, pager, next"
          @current-change="currentChange"
          :total="total">
        </el-pagination>
    </div>
  
  </div>
</template>

<script>
import { findUserByPage } from '@/api'
export default {
  data() {
    return {
      total: null,
      pageSize: {
        start: 1,
        end: 2
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        tag: '家'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        tag: '公司'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        tag: '家'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        tag: '公司'
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
      return row.role_ID === value
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
      findUserByPage(params).then(res => {
        this.total = res.data.data.total
        this.tableData = []
        for (var i = 0; i < res.data.data.userList.length; i++) {
          if (res.data.data.userList[i].user_ENABLED === true) {
            res.data.data.userList[i].user_ENABLED_DSCP = '使用中'
          } else {
            res.data.data.userList[i].user_ENABLED_DSCP = '封号'
          }
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
