<!--
  * @FileDescription: Music
  * @Author: liqinglin
-->

<template>
  <div class="music-container">
    <van-nav-bar title="云音乐" fixed safe-area-inset-top />

    <img src="https://visitor-badge.laobi.icu/badge?page_id=lql6639.lql6639" alt="visitor" />

    <!-- 搜索 -->
    <search></search>

    <!-- 轮播图 -->
    <swipe></swipe>

    <!-- 图标列表 -->
    <iconlist></iconlist>

    <!-- 所有榜单 -->
    <toplist></toplist>

    <!-- 推荐歌单 -->
    <personalized></personalized>
  </div>
</template>

<script>

import search from '../../components/music/search.vue'
import swipe from '../../components/music/swipe.vue'
import iconlist from '../../components/music/iconlist.vue'
import toplist from '../../components/music/toplist.vue'
import personalized from '../../components/music/personalized.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Music',
  data () {
    return {}
  },
  components: {
    search,
    swipe,
    iconlist,
    toplist,
    personalized
  }
}
</script>

<style lang="less" scoped>
.music-container {
  padding: 46px 0 100px 0;
  position: relative;

  img {
    position: absolute;
    top: 13px;
    right: 30px;
    z-index: 99;
    position: fixed;

  }
}
</style>
