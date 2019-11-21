<template>
<div style="width:100%;">
  <div class="title-div">
    <span class="editPage-title">
      在这里,尽情地创建你的文章!
    </span>
  </div>
  <div>
   <quill-editor ref="myTextEditor">
   </quill-editor>
  </div>
</div>
</template>

<script>
  
</script>

<style scoped>
.editPage-title{
  font-size: 60px;
  font-weight: 400;
  color: white;
}

.title-div{
  text-align: center;
  padding-top: 220px;
  padding-bottom: 220px;
  background: url("../assets/edit/mountain2.jpg") no-repeat;
  background-size:100% 100%;  
  width: 100%;
  height: 39px;
}

@media(max-width:500px){
  /* 当屏幕最大669时，执行下面css */
  .editPage-title{
    font-size: 40px;
    font-weight: 400;
    color: white;
    margin-left: 20px;
    margin-right: 20px;
  }
}
</style>

