const AddressLocal = {
  /**
   * 通过Token读取实时有效用户数据
   */
  getUserInfoByToken: () => {
    return `/user/showUserInfoByToken`
  },

  /**
   * 查询留言数据（可根据用户查询）
   */
  getMessageByAdmin: () => {
    return `/admin/findMessageByAdmin`
  },

  /**
   * 根据id查询留言数据
   */
  getMessageById: () => {
    return `/admin/findMessageById`
  },

  /**
   * 根据id查询留言数据
   */
  deleteMessageByAdmin: () => {
    return `/admin/deleteMessageByAdmin`
  },

  /**
   * 用户新增留言
   */
  addMessageByAdmin: () => {
    return `/admin/addMessageByAdmin`
  },
  // --------------------------------------笔记--------------------------------------
  /**
   * 新增修改笔记
   */
  addUpdateArticle: () => {
    return `/admin/addUpdateArticle`
  },
  /**
   * 根据笔记id查询笔记详情
   */
  findArticleById: () => {
    return `/admin/findArticleById`
  },
  /**
   * 发布笔记
   */
  publishedAriticle: () => {
    return `/admin/publishedAriticle`
  },
  /**
   * 查询所有笔记
   */
  findAllArticle: () => {
    return `/tonna/findAllArticle`
  },
  /**
   * 用户根据id获取笔记信息
   */
  findAritcleByIdUser: () => {
    return `/tonna/findAritcleByIdUser`
  },
  /**
   * 加载用户主页文章内容
   */
  findAuthorArticle: () => {
    return `/tonna/findAuthorArticle`
  },
  // --------------------------------------评论--------------------------------------
  /**
   * 用户新增或回复评论
   */
  addOrReplyTalk: () => {
    return `/admin/addOrReplyTalk`
  },
  /**
   * 根据文章id获取文章评论
   */
  findAllTalk: () => {
    return `/tonna/findAllTalk`
  },
  // -------------------------------------点赞-------------------------------------
  /**
   * 用户新增或删除赞
   */
  likeArticleByUser: () => {
    return `/admin/likeArticleByUser`
  },
  /**
   * 用户查看此篇文章点赞情况
   */
  findUserLikeByAticleId: () => {
    return `/tonna/findUserLikeByAticleId`
  },
  // -------------------------------------收藏-------------------------------------
  /**
   * 用户新增或取消收藏
   */
  collectArticleByUser: () => {
    return `/admin/collectArticleByUser`
  },
  /**
   * 用户查看此篇文章收藏情况
   */
  findUserCollectByAticleId: () => {
    return `/tonna/findUserCollectByAticleId`
  },
  // -------------------------------------关注-------------------------------------
  /**
   * 用户新增或取消关注
   */
  addAttentionByUser: () => {
    return `/admin/addAttentionByUser`
  },
  /**
   * 用户查看该作者关注情况
   */
  findUserAttentionById: () => {
    return `/tonna/findUserAttentionById`
  },
  /**
   * 加载用户主页的关注信息
   */
  findUserAndAuthorAttention: () => {
    return `/tonna/findUserAndAuthorAttention`
  },
  // -------------------------------------动态-------------------------------------
  /**
   * 用户根据id查询用户动态
   */
  findUserActivityByPage: () => {
    return `/tonna/findUserActivityByPage`
  },
  // --------------------------------------配置--------------------------------------
  /**
   * 获取配置类相应类型全部数据
   */
  getConstType: () => {
    return `/admin/findConstType`
  },
  /**
   * 图片文件上传
   */
  uploadFile: () => {
    return `/admin/uploadFile`
  }
}

export default AddressLocal

