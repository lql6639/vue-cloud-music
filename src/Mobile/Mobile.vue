<!--
  * @FileDescription: 移动端
  * @Author: liqinglin
-->

<template>
  <div class="mobile-container">
    <!-- 路由占位符 -->
    <router-view />
    <!-- Footer 播放控件 -->
    <Footer></Footer>
    <!-- Tabbar 标签栏 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="music-o" to="/music">音乐</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="smile-o" to="/weather">天气</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
    <!-- 开启底部安全区适配 -->
    <van-number-keyboard safe-area-inset-bottom />
  </div>
</template>

<script>

import { ref } from 'vue'

import Footer from './views/Footer/Footer.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Mobile',
  data () {
    return {}
  },
  setup () {
    const active = ref(0)
    return { active }
  },
  components: {
    Footer
  },
  created () {
    console.log(
      '%c 这是移动端... %c',
      'background:#41b883 ; padding: 1px; border-radius: 2px;  color: #fff',
      'background:transparent'
    )
    console.log(
      '%c 歌曲来源于网易云音乐 (https://music.163.com) %c',
      'background:#41b883 ; padding: 1px; border-radius: 2px;  color: #fff',
      'background:transparent'
    )
    console.log(
      '%c GitHub (https://github.com/lql6639/vue-cloud-music) %c',
      'background:#41b883 ; padding: 1px; border-radius: 2px;  color: #fff',
      'background:transparent'
    )
  }
}
</script>

<style lang="less" scoped></style>
