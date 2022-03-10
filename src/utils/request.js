// 引入axios
import axios from 'axios'
// 创建 axios 实例
const service = axios.create({
  baseURL: 'http://localhost:8010/',
  timeout: 15000
})
export default service
