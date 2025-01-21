//💡💡💡这些接口为java大作业，mysql数据库
import request from '@/utils/request/common.js'

export const getComment = () => {
  return request.get('/getComment')
}

export const addComment = (data) => {
  return request.post('/setComment', data)
}

export const deleteComment = (data) => {
  //✨delete类型请求必须将请求体添加在一个属性为data的对象中
  return request.delete('/delComment', { data: data })
}

//更新点赞信息
export const updateUpvoteComment = (data) => {
  return request.post('/updateUpvoteComment', data)
}

//获取用户与评论区点赞信息
export const getUpvoteComment = ({ userId, songId }) => {
  return request.get('/getUpvoteComment', {
    params: {
      userId,
      songId,
    },
  })
}
export const setUserStatus = ({ userId, targetId, targetUserStatus }) => {
  console.log(userId, targetId, targetUserStatus)
  return request.post('/setUserStatus', {
    userId,
    targetId,
    targetUserStatus,
  })
}
