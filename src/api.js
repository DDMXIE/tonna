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
