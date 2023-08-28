/**
 * @description 解析歌词
 * @author liqinglin <1740242084@qq.com>
 * @license Apache-2.0
 * @param {string} lrc 执行目标函数的 lrc
 * @example
 * parseLyric(lrc)
 */

export default function parseLyric (lrc) {
  // 切分歌词文本为每一行
  const lines = lrc.split('\n')
  const lyric = lines.map(line => {
    // 提取时间
    const matches = line.match(/^\[(\d{2}:\d{2}\.\d{2,3})\]/g)
    if (matches) {
      /**
       * 时间
       */
      const t = matches[0]
      /**
       * 格式化时间
       */
      const time = t.replace(/\./g, ':')
      /**
       * 歌词文本，将时间部分从整行歌词中移除，使用 replace 方法替换掉时间部分，并使用 trim 方法去除前后的空格
       */
      const text = line.replace(matches, '').trim()
      /**
       * 返回解析结果
       */
      return { time, text }
    }
    return null
  }).filter(line => line !== null)

  return lyric
}
