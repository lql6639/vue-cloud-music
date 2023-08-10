/**
 * @description 函数节流
 * @author liqinglin <1740242084@qq.com>
 * @license Apache-2.0
 * @param {Function} func 要执行的目标函数
 * @param {Number} delay 执行目标函数的时间间隔
 * @example
 * debounce(initGet,3 * 1000)
 */

export function throttle (func, delay) {
  let timer // 定时器
  return function (...args) { // 形成闭包
    // args 为函数调用时传的参数
    const context = this
    // 如果timer存在，说明函数还未该执行
    if (timer) return
    timer = setTimeout(function () {
      // 当函数执行时，让timer为null。
      timer = null
      func.apply(context, args)
    }, delay)
  }
}
