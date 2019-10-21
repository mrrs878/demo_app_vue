import axios from 'axios'
import { Toast } from 'vant'

import store from '@/store'
import vue from '@/App'

const tip = message => {
  Toast(message)
}

const toLogin = () => {
  store.state.user.request('updateDeviceToken', { type: store.state.user.data.type, token: '' })
  store.state.user.logout()
  vue.$router.push('/login/login').then(r => {})
}

const errHandler = (status, other) => {
  switch (status) {
    case 400:
      tip(other)
      break
    case 401:
      if (localStorage.getItem('accessToken')) {
        tip('登录信息失效 请重新登录')
        localStorage.removeItem('accessToken')
        setTimeout(() => {
          toLogin()
        }, 3000)
      }
      break
    case 403:
      if (localStorage.getItem('accessToken')) {
        tip('该账号已在其他设备登录 请重新登录')
        localStorage.removeItem('accessToken')
        setTimeout(() => {
          toLogin()
        }, 3000)
      }
      break
    case 404:
      tip('请求的资源不存在')
      break
    default:
      tip('出错了，稍后重试')
      break
  }
}

let instance = axios.create({ timeout: 1000 * 12 })
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken')
    token && (config.headers.Authorization = token)
    return config
  },
  err => Promise.reject(err)
)
instance.interceptors.response.use(
  res => {
    return res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res)
  },
  err => {
    const { response } = err
    if (response) {
      errHandler(response.status, response.data.message)
    } else {
      Promise.reject(err).then(r => {})
    }
  }
)

export default instance
