import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_NODE_SERVER_BASE_API,
  timeout: 10000,
})

request.interceptors.request.use((config) => {
  config.headers.token = localStorage.getItem('token')
  return config
})
request.interceptors.response.use((response) => {
  return response.data
})

export default request
