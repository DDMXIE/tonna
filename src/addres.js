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

