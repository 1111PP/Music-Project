import request from '@/utils/request/common.js'

//验证token
export const verifyTokenAPI = () => {
  return request.get('/verifyToken')
}

//注册
export const registerAPI = (userInfo) => {
  return request.post('/register', userInfo)
}

//登录
export const loginAPI = (userInfo) => {
  return request.post('/login', userInfo)
}

//获取用户信息
export const getUserInfoAPI = ({ username }) => {
  //  console.log(data)
  return request.post('/getUserInfo', {
    username,
    password: '',
  })
}
