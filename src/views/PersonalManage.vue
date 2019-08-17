<template>
  <div>
    <div style="width:100%,">
      <Bread></Bread>
    </div>
    <div style="padding-top:60px;">
      <el-row>
        <el-col :span="24">
          <!-- <el-card> -->
          <div style="text-align:center;">
            <div class="block">
              <el-avatar
                shape="square"
                :size="180"
                :fit="fit"
                :src="url"
              ></el-avatar>
            </div>
            <div>
              <span style="font-weight:bold;font-size:30px;">Tony</span>
            </div>
          </div>

          <!-- </el-card> -->
        </el-col>
      </el-row>
      <div style="padding-top:60px;">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-card>
              <div>
                <span>个人信息</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import Bread from '../components/Bread'
export default {
  components: { Bread },
  created() {
    this.getInfo()
  },
  data() {
    return {
      fit: 'cover', // 头像类型
      url:
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=656257457,1108249792&fm=26&gp=0.jpg' // 头像url
    }
  },
  methods: {
    getInfo() {
      this.$axios
        .get('/springdemo1/personInfo/findLikePersonName')
        .then(res => {
          console.log(res)
        })
        .catch(() => {})
    }
  }
}
</script>

