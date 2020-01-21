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
  }
}

export default AddressLocal

