import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

export const postInfo = (url, data) => {
  return axios.post(url, data).then(res => res.data)
}
