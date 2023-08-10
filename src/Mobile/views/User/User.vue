<!--
  * @FileDescription: User
  * @Author: liqinglin
-->

<template>
  <div class="user-container">
    <van-nav-bar title="我的" fixed safe-area-inset-top />

    <img src="https://img.shields.io/badge/GitHub-181717?logo=Github&logoColor=fff" alt="GitHub" />

  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'User',
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.user-container {
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
