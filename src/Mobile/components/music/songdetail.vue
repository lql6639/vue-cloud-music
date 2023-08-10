<template>
  <div class="songdetail-container">
    <van-nav-bar title="音乐详情" left-text="返回" left-arrow fixed safe-area-inset-top @click-left="left" />
    <img :src="picUrl" class="bgImg" />
    <div class="songdetail">
      <h3>id: {{ id }}</h3>
      <h3>name: {{ songs.name }}</h3>
      <h3 v-for="(alia, index) in songs.alia" :key="index">alia: {{ alia }}</h3>
      <h3 v-for="(ar, index) in songs.ar" :key="index">author[{{ index + 1 }}]: {{ ar.name }}</h3>
      <h3>album: {{ album }}</h3>
      <h3>lyric: </h3>
      <div class="lyric">
        <h4 v-for="(lyric, index) in lyric" :key="index">{{ lyric.text }}</h4>
      </div>

      <br />

      <h3>looking forword ...</h3>
    </div>
  </div>
</template>

<script>

import { showToast } from 'vant'

// 获取歌曲详情 - 获取歌词 - 获取音乐评论
import { getSongDetail, getLyric, getCommentMusic } from '../../../api/api.js'

import parseLyric from '../../../utils/parseLyric.js'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'songdetail',
  data () {
    return {
      id: '',
      picUrl: '',
      songs: [],
      // 专辑
      album: '',
      // 歌词
      lyric: ''
    }
  },
  methods: {
    left () {
      showToast('返回')
      this.$router.go(-1)
    },
    async initGet () {
      // 传值
      this.id = this.$router.currentRoute.value.query.id
      // 歌单详情
      const { data: songdetail } = await getSongDetail(this.id)
      // console.log('歌曲详情')
      // console.log(songdetail)
      this.songs = songdetail.songs[0]
      this.picUrl = this.songs.al.picUrl
      this.album = this.songs.al.name
      sessionStorage.setItem('songdetail', JSON.stringify(songdetail))
      // 歌词
      const { data: lyric } = await getLyric(this.id)
      // console.log('歌词')
      // console.log(lyric)
      this.lyric = parseLyric(lyric.lrc.lyric)
      sessionStorage.setItem('lyric', JSON.stringify(lyric))
      // 音乐评论
      const { data: commentmusic } = await getCommentMusic(this.id)
      // console.log('音乐评论')
      // console.log(commentmusic)
      sessionStorage.setItem('commentmusic', JSON.stringify(commentmusic))
    }
  },
  mounted () {
    this.initGet()
  }
}
</script>

<style lang="less" scoped>
.songdetail-container {
  padding: 46px 0 100px 0;

  .bgImg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: -1;
    filter: blur(30px);
  }

  .songdetail {
    padding-left: 12px;

    .lyric {
      text-align: center;
    }
  }
}
</style>
