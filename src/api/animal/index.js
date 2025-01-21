import request from '@/utils/request/common.js'
import axios from 'axios'

export const getCuteAnimal = () => {
  const r = axios.create({
    // baseURL: '/dog',
    baseURL: 'https://dog.ceo/api/breeds/image/random',
  })
  return r.get()
}
