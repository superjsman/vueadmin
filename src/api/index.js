import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
axios.interceptors.request.use(function (config) {
  let mytoken = localStorage.getItem('mytoken')
  if (mytoken) {
    console.log('应该加响应头')
    config.headers.Authorization = mytoken
  }
  return config
})
export const postInfo = (url, data) => {
  return axios.post(url, data).then(res => res.data)
}
