/**
 * @description 改变数量
 * @author liqinglin <1740242084@qq.com>
 * @license Apache-2.0
 * @param {number} num 执行目标函数的数量
 * @example
 * changeCount(100000000)
 */

export default function changeCount (num) {
  if (num >= 100000000) {
    return (num / 100000000).toFixed(1) + '亿'
  } else if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万'
  }
}
