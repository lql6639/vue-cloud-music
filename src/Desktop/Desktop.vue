<!--
  * @FileDescription: PC端
  * @Author: liqinglin
-->

<template>
  <div class="desktop-container">
    <div class="layer1"></div>
    <div class="layer2"></div>
    <div class="layer3"></div>
    <div class="title">Sass星空</div>
  </div>
</template>

<script>

import '../Desktop/assets/dist/index.css'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Desktop',
  data () {
    return {}
  },
  created () {
    console.log(
      '%c 这是PC端... %c',
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
