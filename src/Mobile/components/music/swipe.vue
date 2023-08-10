<template>
  <div class="swipe-container">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>

import { reactive, onMounted } from 'vue'

// banner
import { getBanner } from '../../../api/api.js'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'swipe',
  data () {
    return {}
  },
  setup () {
    const state = reactive({
      images: []
    })
    onMounted(async () => {
      const { data: res } = await getBanner(1)
      // console.log('banner')
      // console.log(res)
      state.images = res.banners
      sessionStorage.setItem('banner', JSON.stringify(res))
    })
    return { state }
  }
}
</script>

<style lang="less" scoped>
.swipe-container {
  padding: 10px;

  .van-swipe {
    width: 100%;
    height: 150px;

    .van-swipe__track {
      .van-swipe-item {
        text-align: center;

        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>
