<template>
  <div class="musiccomment-container">
    <van-nav-bar title="音乐评论" left-text="返回" left-arrow fixed safe-area-inset-top @click-left="left" />
    <van-skeleton title avatar :row="4" />
  </div>
</template>

<script>

import { showToast } from 'vant'

// 音乐评论
import { getCommentMusic } from '../../../api/api.js'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'musiccomment',
  data () {
    return {
      // 音乐评论
      comment: []
    }
  },
  created () {
    this.initGet()
  },
  methods: {
    left () {
      showToast('返回')
      this.$router.go(-1)
    },
    async initGet () {
      const { data: musicComment } = await getCommentMusic()
      // console.log('音乐评论')
      // console.log(musicComment)
      this.comment = musicComment
      sessionStorage.setItem('musiccomment', JSON.stringify(musicComment))
    }
  }
}
</script>

<style lang="less" scoped>
.musiccomment-container {
  padding: 46px 0 100px 0;
}
</style>
