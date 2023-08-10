<!--
  * @FileDescription: Video
  * @Author: liqinglin
-->

<template>
  <div class="video-container">
    <van-nav-bar title="视频" fixed safe-area-inset-top />
    <h3 style="text-align: center;">{{ time }}</h3>
  </div>
</template>

<script>

import dayjs from 'dayjs'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Video',
  data () {
    return {
      time: ''
    }
  },
  created () {
    this.getTime()
  },
  methods: {
    getTime () {
      setInterval(() => {
        this.time = dayjs().format('YYYY-MM-DD HH:mm:ss')
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.video-container {
  padding: 46px 0 100px 0;
}
</style>
