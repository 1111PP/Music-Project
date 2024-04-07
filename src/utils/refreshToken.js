import request from '@/utils/request'
let promise
//刷新token 过程
export const refreshTokenAPI = async () => {
  //如果多个刷新token的请求进来了，那么都返回第一次刷新token所创建的promise
  if (promise) return promise
  //第一次发送刷新token的请求会最先进行刷新token的流程
  promise = new Promise(async (resolve) => {
    console.log('刷新token')
    localStorage.setItem('token', localStorage.getItem('refreshToken'))
    const r = await request.get('/refreshToken', {
      //用一个额外配置标记此次请求的特殊性，为刷新token的请求
      __isRefreshToken: true,
    })
    resolve(r)
  })
  //无论刷新token流程最后结果如何，都要置空promise
  //不要影响下一次短token失效时的刷新token流程
  promise.finally(() => {
    promise = null
  })
  //console.log(promise)
  //返回结果
  return promise
}

export function isRefreshReuqest(config) {
  return !!config.__isRefreshToken
}
