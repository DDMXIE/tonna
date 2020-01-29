import request from './plugins/axios'
import address from './addres'
// const bsae_api = process.env.BASE_API ? './' + process.env.BASE_API : localUrl // 获取项目api请求地址

// 例：根据id获取用户信息
// export const getUserInfoById = (id) => {
//   console.log(bsae_api)
//   return get(`${bsae_api}/web/user/${id}`) // resfulapi风格
// }

/**
 * 通过Token读取实时有效用户数据
 * @param {*} params
 */
export function getUserInfoByToken(params) {
  return request({
    url: address.getUserInfoByToken(),
    method: 'get',
    params: params
  })
}

/**
 * 查询留言数据（可根据用户查询）
 * @param {*} params
 */
export function getMessageByAdmin(params) {
  return request({
    url: address.getMessageByAdmin(),
    method: 'get',
    params: params
  })
}

/**
 * 根据id查询留言数据
 * @param {*} params
 */
export function getMessageById(params) {
  return request({
    url: address.getMessageById(),
    method: 'get',
    params: params
  })
}

/**
 * 根据id软删除留言数据
 * @param {*} params
 */
export function deleteMessageByAdmin(params) {
  return request({
    url: address.deleteMessageByAdmin(),
    method: 'get',
    params: params
  })
}

/**
 * 用户新增留言
 * @param {*} data
 */
export function addMessageByAdmin(data) {
  return request({
    url: address.addMessageByAdmin(),
    method: 'post',
    data
  })
}
// -------------------------------------笔记-------------------------------------
/**
 * 新增修改笔记
 * @param {*} data
 */
export function addUpdateArticle(data) {
  return request({
    url: address.addUpdateArticle(),
    method: 'post',
    data
  })
}

/**
 * 根据笔记id查询笔记详情
 * @param {*} params
 */
export function findArticleById(params) {
  return request({
    url: address.findArticleById(),
    method: 'get',
    params: params
  })
}

/**
 * 发布笔记
 * @param {*} params
 */
export function publishedAriticle(params) {
  return request({
    url: address.publishedAriticle(),
    method: 'get',
    params: params
  })
}

/**
 * 查询所有笔记
 * @param {*} params
 */
export function findAllArticle(params) {
  return request({
    url: address.findAllArticle(params),
    method: 'get',
    params: params
  })
}

/**
 * 用户根据id获取笔记信息
 * @param {*} params
 */
export function findAritcleByIdUser(params) {
  return request({
    url: address.findAritcleByIdUser(),
    method: 'get',
    params: params
  })
}
// -------------------------------------评论-------------------------------------
/**
 * 用户新增或回复评论
 * @param {*} data
 */
export function addOrReplyTalk(data) {
  return request({
    url: address.addOrReplyTalk(),
    method: 'post',
    data
  })
}
/**
 * 根据文章id获取文章评论
 * @param {*} params
 */
export function findAllTalk(params) {
  return request({
    url: address.findAllTalk(),
    method: 'get',
    params: params
  })
}
// -------------------------------------配置-------------------------------------
/**
 * 获取配置类相应类型全部数据
 * @param {*} params
 */
export function getConstType(params) {
  return request({
    url: address.getConstType(),
    method: 'get',
    params: params
  })
}

/**
 * 图片文件上传
 * @param {*} data
 */
export function uploadFile(data) {
  return request({
    url: address.uploadFile(),
    method: 'post',
    // headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}
