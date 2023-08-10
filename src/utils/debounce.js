/**
 * @description 函数防抖
 * @author liqinglin <1740242084@qq.com>
 * @license Apache-2.0
 * @param {Function} func 要执行的目标函数
 * @param {Number} delay 执行目标函数的时间间隔
 * @example
 * debounce(initGet,3 * 1000)
 */

export function debounce (func, delay) {
  let timer // 定时器
  return function (...args) { // 形成闭包
    // args 为函数调用时传的参数
    const context = this
    // 当函数再次执行时，清除定时器，重新开始计时
    timer && clearTimeout(timer)
    // 利用定时器，让指定函数延迟执行。
    timer = setTimeout(function () {
      // 执行传入的指定函数，利用apply更改this绑定和传参
      func.apply(context, args)
    }, delay)
  }
}
