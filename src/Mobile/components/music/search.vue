<template>
  <div class="search-container">
    <form action="/">
      <van-search shape="round" v-model="value" placeholder="请输入搜索关键词" @search="onSearch" />
    </form>
  </div>
</template>

<script>

import { ref } from 'vue'
import { showToast } from 'vant'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'search',
  data () {
    return {}
  },
  setup () {
    const value = ref('')
    const onSearch = (val) => showToast(val)
    return { value, onSearch }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 10px;
}
</style>
