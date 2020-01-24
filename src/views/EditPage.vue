<template>
  <div style="width:100%;">
    <back-top></back-top>
    <div class="title-div">
      <span class="editPage-title">
        Tonna 笔记
      </span>
    </div>
    <div style="padding-top:10px;">
      <el-form ref="markdownForm" :label-position="'left'" :model="markdownForm" :rules="rules" label-width="100px" >
        <el-row style="padding-left:20px;padding-right:10px;">
          <el-col :xs="24" :sm="24" :md="13" :lg="13" :xl="11">
              <el-form-item label="标 题" prop="title">
                  <el-input v-model="markdownForm.title" placeholder="请输入您的文章标题"></el-input>
              </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="8" :lg="7" :xl="8">
              <el-form-item class="article-type-item" label="文章类型" prop="articleType">
                <el-select v-model="markdownForm.articleType" placeholder="请选择文章类型">
                    <el-option v-for="(item,index) in constType" :label="item.type_NAME" :value="item.type_ID" :key="index"></el-option>
                </el-select>
              </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="3" :lg="3" :xl="5">
              <el-form-item label="所有人可见" prop="articleSecurity">
                <el-switch v-model="markdownForm.articleSecurity"></el-switch>
              </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <mavon-editor ref="md" @save="save" @imgAdd="imgAdd" @imgDel="imgDel" @change="change"
          v-model="markdownForm.contentMarkdown" :codeStyle="markdown.codeStyle" 
          :toolbars="markdown.toolbars"/>
      <br>
      <el-row style="text-align:center;">
        <el-col :span="12">
          <el-button>返 回</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="save('markdownForm')">保 存</el-button>
        </el-col>
      </el-row>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import Foot from '../components/Foot'
import BackTop from '../components/BackTop'
import { getConstType, uploadFile, addUpdateArticle, findArticleById } from '@/api'
export default {
  components: { BackTop, Foot },
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
        articleType: '',
        articleSecurity: true,
        contentMarkdown: '',
        contentHtml: '',
        createDate: '',
        updateDate: '',
        isDelete: '',
        type: 0
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 1, max: 80, message: '长度在1到80个字符', trigger: 'blur' }
        ],
        articleType: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      },
      lastSaveTime: null,
      timer: null,
      constType: []
    }
  },
  created() {
    this.loadData()
  },
  mounted() {
    this.timer = setInterval(this.intervalSave, 2 * 60 * 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    loadData() {
      this.getArticleType()
      this.getArticle()
    },
    getArticle() { // 获取文章内容
      // const id = this.$route.query.a
      const id = 'fa562fef-9bec-467e-8f72-507a40c0380d'
      if (id == null) {
        this.markdownForm.contentMarkdown = ''
        this.markdownForm.new = 'add'
      } else {
        this.markdownForm.new = 'update'
        console.log('获取文章内容信息')
        var params = {}
        params.articleId = id
        findArticleById(params).then(res => {
          console.log('***********res', res)
          this.markdownForm.contentMarkdown = res.data.data[0].article_CONTENT == null ? '' : res.data.data[0].article_CONTENT
          this.markdownForm.articleId = res.data.data[0].article_ID
          this.markdownForm.title = res.data.data[0].article_TITLE
          this.markdownForm.articleType = res.data.data[0].type_ID
          this.markdownForm.createDate = res.data.data[0].create_DATE
          this.markdownForm.updateDate = res.data.data[0].update_DATE
          this.markdownForm.isDelete = res.data.data[0].is_DELETE
          if (res.data.data[0].article_SECURITY === '2') {
            this.markdownForm.articleSecurity = true
          } else {
            this.markdownForm.articleSecurity = false
          }
        }).catch(e => {
          console.log(e)
        })
      }
    },
    save(formName) { // 保存文章内容
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.markdownForm.userId = this.$store.getters.userId
          this.markdownForm.createDate = new Date(this.markdownForm.createDate)
          console.log('文章', this.markdownForm)
          addUpdateArticle(this.markdownForm).then(res => {
            this.$notify({
              title: '保存成功',
              message: '您的笔记已保存！',
              type: 'success'
            })
            this.markdownForm.articleId = res.data.data.id
            this.lastSaveTime = new Date()
          }).catch(e => {
            console.log(e)
          })
          // alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
    imgAdd(pos, $file) { // 添加图片，pos为位置
      // const markdownImg = {}
      // markdownImg.base64Data = file.miniurl // 获取图片base64内容
      // markdownImg.type = file.type
      const $vm = this.$refs.md
      var formdata = new FormData()
      formdata.append('uploadFile', $file)
      uploadFile(formdata).then(res => {
        $vm.$img2Url(pos, res.data)
        // $vm.$img2Url(pos, process.env.BASE_URL + '/img/' + res.data)
      }).catch(e => {
        console.log(e)
      })
    },
    imgDel(pos, url) { // 删除图片，并不是修改就会触发，仅支持工具栏操作
      console.log(pos)
      console.log(url)
    },
    change(value, render) {
      // render 为 markdown 解析后的结果
      this.markdownForm.contentHtml = render
    },
    getArticleType() {
      var params = {}
      params.constType = 'ARTICLE_TYPE'
      getConstType(params).then(res => {
        this.constType = res.data.data
      })
    }
  }

}
</script>

<style scoped>
.editPage-title{
  font-size: 58px;
  font-weight: 900;
  padding-left: 480px;
  color: white;
}

.title-div{
  text-align: center;
  padding-top: 240px;
  padding-bottom: 240px;
  background: url("../assets/edit/editPage_bg.png") no-repeat;
  background-size:100% 100%;  
  width: 100%;
}

.article-type-item{
  padding-left:30px;
}


@media(max-width:500px){
  /* 当屏幕最大669时，执行下面css */
  .editPage-title{
    font-size: 25px;
    font-weight: 900;
    color: white;
    margin-left: 20px;
    margin-right: 20px;
    padding-left: 0px;
  }
    .title-div{
    text-align: center;
    padding-top: 90px;
    padding-bottom: 80px;
    background: url("../assets/edit/editPage_bg.png") no-repeat;
    background-size:100% 100%;  
    width: 100%;
    height: 39px;
  }
  .article-type-item{
    padding-left:0px;
  }
}
</style>

