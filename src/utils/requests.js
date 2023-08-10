import axios from 'axios'

const requests = axios.create({
  baseURL: 'https://restapi.amap.com'
})

export default requests
