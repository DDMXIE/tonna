<template>
  <div>
    <img src = "../assets/connect/connectUs.png" width="100%"/>
    <el-row>
      <el-col :xs="0" :sm="4" :md="5" :lg="6" :xl="16">&nbsp;</el-col>
      <el-col :xs="24" :sm="16" :md="14" :lg="12" :xl="16">
        <div style="padding-top:10px;">
          <i  class="el-icon-caret-right" 
              style="font-size:30px;font-weight:300;color:#5e1307;padding-right:5px;" />
          <span style="font-size:30px;font-weight:300;color:#5e1307">关于我们</span>
        </div>
        <div class="text-div">
            <span style="word-break:normal">
            Tonna是一个具备面向生活、全设备应用、界面整洁清新、具备良好的安全性等优点。国内来自各地、带着不同情感态度的生活分享师可在此进行他们的分享及话题讨论。发表他们在生活中的真实情感，通过PC、甚至不同移动端访问，获取到生活中所需的内容及想法。
            </span>
        </div>
        <div style="padding-top:10px;">
          <i  class="el-icon-caret-right" 
              style="font-size:30px;font-weight:300;color:#5e1307;padding-right:5px;" />
          <span style="font-size:30px;font-weight:300;color:#5e1307">隐私政策</span>
        </div>
        <div class="text-div">
          <span style="word-break:normal;">
            Tonna尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，Poposoft会按照本隐私权政策的规定使用和披露您的个人信息。但Poposoft将以高度的勤勉、审慎义务对待这些信息。除本隐私权政策另有规定外，在未征得您事先许可的情况下，Poposoft不会将这些信息对外披露或向第三方提供。Poposoft会不时更新本隐私权政策。 您在同意Poposoft服务使用协议之时，即视为您已经同意本隐私权政策全部内容。本隐私权政策属于Poposoft服务使用协议不可分割的一部分。
          </span>
        </div>
         <div style="padding-top:10px;">
          <i  class="el-icon-caret-right" 
              style="font-size:30px;font-weight:300;color:#5e1307;padding-right:5px;" />
          <span style="font-size:30px;font-weight:300;color:#5e1307">联系我们</span>
        </div>
        <div class="text-div">
          <span style="word-break:normal">
            Tonna的主创：TONY 来自中国，旨在创作一个高品质的生活博客。具备面向生活、全设备应用、界面整洁清新、具备良好的安全性等优点。国内来自各地、带着不同情感态度的生活分享师可在此进行他们的分享及话题讨论。发表他们在生活中的真实情感，通过PC、甚至不同移动端访问，获取到生活中所需的内容及想法。
          </span>
        </div>
      </el-col>
      <el-col :xs="0" :sm="4" :md="5" :lg="6" :xl="16">&nbsp;</el-col>
    </el-row>
    <Foot></Foot>
  </div>
</template>

<script>
import Foot from '../components/Foot'
export default {
  components: { Foot },
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.text-div{
  padding-left:40px;
  padding-right:40px;
  padding-top:10px;
  padding-bottom:10px;
}
</style>
