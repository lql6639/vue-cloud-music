import requests from '../utils/requests.js'

// 替换成你的 Amap Web API Key
const AmapWebApiKey = '2863ccd3a9e0df85433cf960ed3eaade'

// IP 定位
export function getIP () {
  return requests.get(`/v3/ip?&key=${AmapWebApiKey}`)
}

// 实时天气
export function getReal (city) {
  return requests.get(`/v3/weather/weatherInfo?key=${AmapWebApiKey}&extensions=base`, {
    // 请求参数
    params: {
      // 城市名称
      city
    }
  })
}

// 预报天气
export function getFore (city) {
  return requests.get(`/v3/weather/weatherInfo?key=${AmapWebApiKey}&extensions=all`, {
    // 请求参数
    params: {
      // 城市名称
      city
    }
  })
}
