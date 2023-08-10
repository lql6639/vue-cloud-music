import axios from 'axios'

const request = axios.create({
  baseURL: 'https://mu-api.yuk0.com'
})

export default request
