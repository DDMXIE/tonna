<template>
  <div style="width:100%;">
    <div class="title-div">
      <span class="editPage-title">
        在这里,尽情地创建你的文章!
      </span>
    </div>
    <div style="padding-top:10px;">
      <el-form :label-position="'left'" :model="markdownForm" :rules="rules"   label-width="60px" >
        <el-form-item label="标 题" prop="title" style="padding-left:30px;padding-right:30px;">
          <el-input v-model="markdownForm.title" placeholder="请输入您的文章标题"></el-input>
        </el-form-item>
      </el-form>
      <mavon-editor ref="md" @save="save" @imgAdd="imgAdd" @imgDel="imgDel" v-model="markdownForm.contentMarkdown" :codeStyle="markdown.codeStyle" :toolbars="markdown.toolbars"   />
      <br>
      <el-row>
        <el-col :span="2">
          <el-button >返 回</el-button>
        </el-col>
        <el-col :span="2" :offset="20">
          <el-button type="primary" style="float: right;" @click="save">保 存</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        markdown: {
          codeStyle: 'atom-one-dark',
          toolbars: {
            bold: true, // 粗体
            italic: true, // 斜体
            header: true, // 标题
            underline: true, // 下划线
            strikethrough: true, // 中划线
            mark: true, // 标记
            superscript: true, // 上角标
            subscript: true, // 下角标
            quote: true, // 引用
            ol: true, // 有序列表
            ul: true, // 无序列表
            link: true, // 链接
            imagelink: true, // 图片链接
            code: true, // code
            table: true, // 表格
            fullscreen: true, // 全屏编辑
            readmodel: true, // 沉浸式阅读
            htmlcode: true, // 展示html源码
            help: true, // 帮助
            /* 1.3.5 */
            undo: true, // 上一步
            redo: true, // 下一步
            trash: true, // 清空
            save: true, // 保存（触发events中的save事件）
            /* 1.4.2 */
            navigation: true, // 导航目录
            /* 2.1.8 */
            alignleft: true, // 左对齐
            aligncenter: true, // 居中
            alignright: true, // 右对齐
            /* 2.2.1 */
            subfield: true, // 单双栏模式
            preview: false // 预览
          }
        },
        markdownForm: {
          articleId: null,
          title: '',
          contentMarkdown: '',
          contentHtml: null,
          type: 0
        },
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 1, max: 80, message: '长度在1到80个字符', trigger: 'blur' }
          ]
        },
        lastSaveTime: null,
        timer: null
      }
    },
    created() {
      this.getArticle()
    },
    mounted() {
      this.timer = setInterval(this.intervalSave, 2 * 60 * 1000)
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    methods: {
      getArticle() { // 获取文章内容
        // const id = this.$route.query.a
        // if (id == null) {
        //   this.markdownForm.contentMarkdown = ''
        // } else {
        //   getMarkdownArticle(id).then(r => {
        //     this.markdownForm.contentMarkdown = r.data.contentMarkdown == null ? '' : r.data.contentMarkdown
        //     this.markdownForm.articleId = r.data.articleId
        //     this.markdownForm.title = r.data.title
        //     this.markdownForm.type = r.data.type
        //   }).catch(e => {
        //     console.log(e)
        //   })
        // }
      },
      save() { // 保存文章内容
        console.log('文章', this.markdownForm)
        // saveMarkdownArticle(this.markdownForm).then(r => {
        //   this.$message.success('保存成功')
        //   this.markdownForm.articleId = r.data.articleId
        //   this.lastSaveTime = new Date()
        // }).catch(e => {
        //   console.log(e)
        // })
      },
      intervalSave() { // 自动保存
        // const now = new Date()
        // if (now - this.lastSaveTime >= 2 * 60 * 1000) {
        //   saveMarkdownArticle(this.markdownForm).then(r => {
        //     this.$message.success('自动保存成功')
        //     this.lastSaveTime = new Date()
        //   }).catch(e => {
        //     console.log(e)
        //   })
        // }
      },
      imgAdd(pos, file) { // 添加图片，pos为位置
        const markdownImg = {}
        // const $vm = this.$refs.md
        markdownImg.base64Data = file.miniurl // 获取图片base64内容
        markdownImg.type = file.type
        console.log('markdownImg', markdownImg)
        // uploadImg(markdownImg).then(r => {
        //   console.log(r)
        //   $vm.$img2Url(pos, process.env.VUE_APP_BASE_API + '/img/' + r.data)
        // }).catch(e => {
        //   console.log(e)
        // })
      },
      imgDel(pos, url) { // 删除图片，并不是修改就会触发，仅支持工具栏操作
        console.log(pos)
        console.log(url)
      }
    }

  }
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

