import Axios from 'axios'
import { message } from 'antd'

const axios = Axios.create({
  timeout: 20000
})

axios.interceptors.response.use(
  (response) => {
    if (response.data && response.data.flag === 1) {
      /*
          successful response:
          {"flag": 0, "data": ""}

          unsuccessful response:
          {"flag": 1, "msg": "server error"}
      */
      const errorMsg = response.data.msg
      message.error(errorMsg)
      return Promise.reject(errorMsg)
    }
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export function get<D = any>(url: string, data: D) {
  return axios.get(url, {
    params: data
  })
}

export function post<D = any>(url: string, data: D) {
  return axios({
    method: 'post',
    url,
    data
  })
}

export default axios