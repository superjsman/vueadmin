import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
axios.interceptors.request.use(function (config) {
  let mytoken = localStorage.getItem('mytoken')
  if (mytoken) {
    config.headers.Authorization = mytoken
  }
  return config
})
export const postInfo = (url, data) => {
  return axios.post(url, data).then(res => res.data)
}
export const getInfo = (url, data) => {
  return axios.get(url, {params: data})
}
export const putInfo = (data) => {
  return axios({
    method: 'put',
    url: 'users/' + data.uId + '/state/' + data.type
  })
}
export const editUserInfo = (data) => {
  return axios({
    method: 'put',
    url: 'users/' + data.id,
    data
  })
}
export const deleteUser = data => {
  return axios({
    method: 'delete',
    url: 'users/' + data
  })
}
export const assignList = () => {
  return axios.get('roles')
}
export const userAssign = (data) => {
  return axios.put(`users/${data.id}/role`, {rid: data.rid})
}
export const getPowerList = () => {
  return axios.get('rights/list')
}
