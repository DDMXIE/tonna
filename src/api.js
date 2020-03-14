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
 * 用户注册
 * @param {*} data
 */
export function saveSignUser(data) {
  return request({
    url: address.saveSignUser(),
    method: 'post',
    data
  })
}

/**
 * 用户通过id获取自身信息
 * @param {*} params
 */
export function findUserInfoById(params) {
  return request({
    url: address.findUserInfoById(),
    method: 'get',
    params: params
  })
}

/**
 * 用户保存更新用户信息
 * @param {*} params
 */
export function saveUserInfoById(data) {
  return request({
    url: address.saveUserInfoById(),
    method: 'post',
    data
  })
}

/**
 * 用户修改密码
 * @param {*} params
 */
export function saveUserPassById(data) {
  return request({
    url: address.saveUserPassById(),
    method: 'post',
    data
  })
}

/**
 * 用户上传保存头像
 * @param {*} params
 */
export function updateUserAvatarById(data) {
  return request({
    url: address.updateUserAvatarById(),
    method: 'post',
    data
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
 * 模糊查询笔记信息
 * @param {*} params
 */
export function findArticleByName(params) {
  return request({
    url: address.findArticleByName(params),
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
/**
 * 加载用户主页文章内容
 * @param {*} params
 */
export function findAuthorArticle(params) {
  return request({
    url: address.findAuthorArticle(),
    method: 'get',
    params: params
  })
}

/**
 * 获取热度笔记
 * @param {*} params
 */
export function findHotArticle(params) {
  return request({
    url: address.findHotArticle(),
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
// -------------------------------------点赞-------------------------------------
/**
 * 用户新增或删除赞
 * @param {*} data
 */
export function likeArticleByUser(data) {
  return request({
    url: address.likeArticleByUser(),
    method: 'post',
    data
  })
}
/**
 * 用户查看此篇文章点赞情况
 * @param {*} params
 */
export function findUserLikeByAticleId(params) {
  return request({
    url: address.findUserLikeByAticleId(),
    method: 'get',
    params: params
  })
}
// -------------------------------------收藏-------------------------------------
/**
 * 用户新增或取消收藏
 * @param {*} data
 */
export function collectArticleByUser(data) {
  return request({
    url: address.collectArticleByUser(),
    method: 'post',
    data
  })
}
/**
 * 用户查看此篇文章收藏情况
 * @param {*} params
 */
export function findUserCollectByAticleId(params) {
  return request({
    url: address.findUserCollectByAticleId(),
    method: 'get',
    params: params
  })
}

/**
 * 用户查看自己的收藏
 * @param {*} params
 */
export function findCollectByUserId(params) {
  return request({
    url: address.findCollectByUserId(),
    method: 'get',
    params: params
  })
}
// -------------------------------------关注-------------------------------------
/**
 * 用户新增或取消关注
 * @param {*} data
 */
export function addAttentionByUser(data) {
  return request({
    url: address.addAttentionByUser(),
    method: 'post',
    data
  })
}
/**
 * 用户查看该作者关注情况
 * @param {*} params
 */
export function findUserAttentionById(params) {
  return request({
    url: address.findUserAttentionById(),
    method: 'get',
    params: params
  })
}

/**
 * 加载用户主页的关注信息
 * @param {*} params
 */
export function findUserAndAuthorAttention(params) {
  return request({
    url: address.findUserAndAuthorAttention(),
    method: 'get',
    params: params
  })
}
// -------------------------------------动态-------------------------------------
/**
 * 用户根据id查询用户动态
 * @param {*} params
 */
export function findUserActivityByPage(params) {
  return request({
    url: address.findUserActivityByPage(),
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
// -------------------------------------后台-------------------------------------
/**
 * 管理员分页获取用户信息
 * @param {*} params
 */
export function findUserByPage(params) {
  return request({
    url: address.findUserByPage(),
    method: 'get',
    params: params
  })
}
/**
 * 后台-加载文章类型和统计数量
 * @param {*} params
 */
export function findAriticleTypeNum(params) {
  return request({
    url: address.findAriticleTypeNum(),
    method: 'get',
    params: params
  })
}
/**
 * 管理员获取系统化基础信息
 * @param {*} params
 */
export function findSystemInfo(params) {
  return request({
    url: address.findSystemInfo(),
    method: 'get',
    params: params
  })
}
/**
 * 管理员分页获取笔记信息
 * @param {*} params
 */
export function findAllArticleByPage(params) {
  return request({
    url: address.findAllArticleByPage(),
    method: 'get',
    params: params
  })
}
