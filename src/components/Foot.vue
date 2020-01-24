<template>
  <el-row class="row-advertise">
        <el-col :span="24">
            <div class="div-tip-bottom">
                <span class="text-tip-bottom-title">Tonna中国 生活博客交流社区</span>
                <el-row :gutter="40">
                  <el-col :xs="24" :sm="15" :md="15" :lg="15" :xl="6">
                    <div style="padding-top:30px;font-size:14px;">
                      <span>Tonna中国 生活博客交流社区是一个致力于分享、发现、生活的专业平台，来自全国各地的每一位生活分享师是我们忠实的用户。世界很大，不如来Tonna逛一逛。</span>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="9" :md="9" :lg="9" :xl="18">
                    <div style="text-align:center;">
                      <img class="tip-bottom-img" src="../assets/surf/tonna2.png">
                    </div>
                  </el-col>
                </el-row>

                <div style="padding-top:30px;">
                  <span>帮助中心</span> ｜ <span>服务条款</span> ｜ <span>联系我们</span> &nbsp;&nbsp;&nbsp;
                  <span>Copyright © 2019 Tonna. 保留所有权利</span>
                </div>
            </div>
        </el-col>
    </el-row>
</template>


<style scoped>

.row-advertise{
  background-color:#f1f1f1;
  margin-top:40px;
}
.div-tip-bottom{
  padding-left:40px;
  padding-right:40px;
  padding-top:30px;
  padding-bottom: 50px;
}
.text-tip-bottom-title{
  font-size:20px;
  font-weight:500;
}
.tip-bottom-img{
  width:80%;
}
@media(max-width:500px){
  .tip-bottom-img{
    padding-top: 30px;
    width:50%;
  }
}
</style>
