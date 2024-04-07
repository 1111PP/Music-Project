import request from '@/utils/request.js'

//注册
export const registerAPI = (userInfo) => {
  return request.post('/login', userInfo)
}

//登录
export const loginAPI = (userInfo) => {
  return request.post('/enter', userInfo)
}

//获取用户信息
export const getUserInfoAPI = () => {
  return request.get('/userinfo')
}
//添加评论
export const addCommentAPI = (commentInfo) => {
  return request.post('/user/comment', commentInfo)
}
//获取评论
export const getAllCommentAPI = () => {
  return request.get('/user/getComment')
}
