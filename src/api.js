import request from './plugins/axios'
import address from './addres'
// const bsae_api = process.env.BASE_API ? './' + process.env.BASE_API : localUrl // 获取项目api请求地址

// 例：根据id获取用户信息
// export const getUserInfoById = (id) => {
//   console.log(bsae_api)
//   return get(`${bsae_api}/web/user/${id}`) // resfulapi风格
// }

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
