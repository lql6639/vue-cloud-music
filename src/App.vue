<!--
  * @FileDescription: App 根组件
  * @Author: liqinglin
-->

<template>
  <div class="app-container">
    <component v-if="$deviceType === 'mobile'" :is="'Mobile'"></component>
    <component v-if="$deviceType === 'desktop'" :is="'Desktop'"></component>
  </div>
</template>

<script>

import UAParser from 'ua-parser-js'

import { showDialog } from 'vant'

import Mobile from './Mobile/Mobile.vue'
import Desktop from './Desktop/Desktop.vue'

const beforeClose = (action) =>
  new Promise((resolve) => {
    setTimeout(() => {
      if (action === 'confirm') {
        resolve(true)
        // window.open('https://github.com/lql6639')
      } else {
        // 拦截取消操作
        resolve(false)
      }
    }, 1200)
  })

showDialog({
  title: '免责声明',
  message: '\n该项目仅为个人爱好\n\n如有侵权请联系删除',
  theme: 'round-button',
  beforeClose
}).then(() => {
  // on close
})

export default {
  name: 'App',
  data () {
    return {}
  },
  components: {
    Mobile,
    Desktop
  },
  created () {
    // 判断 type
    const parser = new UAParser()
    const result = parser.getResult()
    if (result.device.type === 'mobile') {
      this.$deviceType = 'mobile'
    } else {
      this.$deviceType = 'desktop'
    }

    // 设置 title
    const title = document.title
    let time
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        document.title = '离开...'
        clearTimeout(time)
      } else {
        document.title = '在线...'
        time = setTimeout(function () {
          document.title = title
        }, 3000)
      }
    })
  }
}
</script>

<style lang="less" scoped>
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
</style>
