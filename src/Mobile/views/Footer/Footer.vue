<!--
  * @FileDescription: Footer
  * @Author: liqinglin
-->

<template>
  <div class="footer-container">
    <div class="footer">
      <router-link :to="{ path: '/song/detail', query: { id: this.id } }">
        <div class="pic" ref="rotate">
          <img :src="$store.state.playList[0].al.picUrl" />
        </div>
      </router-link>
      <div class="name">
        <Vue3Marquee style="--duration: 8s;">
          {{ $store.state.playList[0].name }} - {{ $store.state.playList[0].ar[0].name }}
        </Vue3Marquee>
      </div>
      <audio ref="audio" :src="this.updataSongUrl"></audio>
      <div class="control">
        <div class="isplay" @click="play">
          <svg class="icon" aria-hidden="true" v-if="$store.state.isplay">
            <use xlink:href="#icon-a-24gf-play"></use>
          </svg>
          <svg class="icon" aria-hidden="true" v-else>
            <use xlink:href="#icon-a-24gf-pause2"></use>
          </svg>
        </div>
        <div class="next">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-a-24gf-next"></use>
          </svg>
        </div>
        <div class="list">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-a-24gf-playlistMusic4"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex'

// 获取音乐url - 音乐是否可以用
import { getSongUrl, getCheckMusic } from '../../../api/api.js'

import updateHttpToHttps from '../../../utils/HttpToHttps.js'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Footer',
  data () {
    return {
      id: 1001,
      songUrl: '',
      updataSongUrl: '',
      message: ''
    }
  },
  computed: {
    ...mapState(['detailShow'])
  },
  methods: {
    ...mapMutations(['updateDetailShow']),
    async initGet () {
      // 传值
      this.id = this.$store.state.playList[0].id
      // 获取音乐url
      const { data: resSong } = await getSongUrl(this.id)
      // console.log('获取音乐url')
      // console.log(this.id, resSong)
      this.songUrl = resSong.data[0].url
      // http to https
      this.updataSongUrl = updateHttpToHttps(this.songUrl)
      // console.log(this.updataSongUrl)
      sessionStorage.setItem('url', JSON.stringify(resSong))
      // 音乐是否可以用
      const { data: resCheck } = await getCheckMusic(this.id)
      // console.log('音乐是否可以用')
      // console.log(this.id, resCheck)
      this.message = resCheck.message
      sessionStorage.setItem('message', JSON.stringify(resCheck))
    },
    play () {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play()
        this.$store.commit('updataIsplay', false) // 播放
        this.$refs.rotate.style.animation = 'rotation 4s linear infinite' // 旋转
      } else {
        this.$refs.audio.pause()
        this.$store.commit('updataIsplay', true) // 暂停
        this.$refs.rotate.style.webkitAnimationPlayState = 'paused' // 不旋转
      }
    }
  },
  mounted () {
    this.initGet()
    const audio = this.$refs.audio
    // 设置 audio 初始音量
    audio.volume = 0.8
    // 监听 audio 的 play 事件
    audio.addEventListener('play', () => { this.$store.commit('updataIsplay', false) })
    // 监听 audio 的 pause 事件
    audio.addEventListener('pause', () => { this.$store.commit('updataIsplay', true) })
  },
  watch: {
    // 监听 playList 的变化
    '$store.state.playList': function (newVal, oldVal) {
      this.$refs.audio.autoplay = true
      if (this.$refs.audio.paused) {
        this.$store.commit('updataIsplay', false)
      }
      this.initGet()
    }
  }
}
</script>

<style lang="less" scoped>
.footer-container {
  position: fixed;
  bottom: 50px;
  width: 100%;
  height: 50px;
  border-radius: 50px;
  background-color: #f5ecec;

  .footer {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .icon {
      width: 23px;
      height: 23px;
    }

    .pic {
      padding-right: 20px;

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }

    .name {
      width: 46%;
      font-weight: bold;
    }

    .control {
      width: 155px;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .isplay {
        padding-left: 20px;
      }

      .next {
        padding-left: 15px;
      }

      .list {
        padding-left: 15px;
      }
    }
  }

  // 旋转播放
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
}
</style>
