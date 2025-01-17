import router from '@/router'
import { useUserStore } from '@/stores'
import axios, { type Method } from 'axios'
import { showToast } from 'vant'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL: 'https://consult-api.itheima.net/',
  timeout: 10000
})

instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const store = useUserStore()
    if (store.user?.token && config.headers) {
      config.headers.Authorization = `Bearer ${store.user.token}`
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败
    if (res.data.code !== 10000) {
      //错误提示
      showToast(res.data.message || '业务失败')
      //返回错误的promise
      return Promise.reject(res.data)
      //传入code 将来catch的时候可以使用
    }
    // TODO 4. 摘取核心响应数据
    return res.data
  },
  (err) => {
    // TODO 5. 处理401错误
    if (err.response?.status === 401) {
      //清除本地的用户信息
      const store = useUserStore()
      store.delUser()
      //跳转到登录页面，携带当前访问页面的地址(包含参数的)
      router.push({ path: '/login', query: { returnUrl: router.currentRoute.value.fullPath } })
    }
    return Promise.reject(err)
  }
)

export default instance

type Data<T> = { code: number; message: string; data: T }

export const request = <T>(url: string, method: Method = 'GET', submitData?: object) => {
  //参数：地址，请求方式，提交的数据
  //返回：promise
  return instance.request<any, Data<T>>({
    url,
    method,
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData
  })
}
