/**
 * @description http 链接转化成 https
 * @author liqinglin <1740242084@qq.com>
 * @license Apache-2.0
 * @param {string} url 执行目标函数的 url
 * @example
 * updateHttpToHttps(url)
 */

export default function updateHttpToHttps (url) {
  /**
   * 如果 url 已经以 https: 开头，则返回原来的 url
   */
  if (url.startsWith('https:')) {
    return url
  }
  return url.replace(/^http:/, 'https:')
}
