<template>
  <div class="iconlist-container">
    <div class="iconItem" @click="one">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-rili"></use>
      </svg>
      <span>每日推荐</span>
    </div>
    <div class="iconItem" @click="two">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-diantai"></use>
      </svg>
      <span>私人漫游</span>
    </div>
    <div class="iconItem" @click="three">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="iconItem" @click="four">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbang"></use>
      </svg>
      <span>排行榜</span>
    </div>
    <div class="iconItem" @click="five">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shiwu-shu"></use>
      </svg>
      <span>有声书</span>
    </div>
  </div>
</template>

<script>

import { showToast } from 'vant'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'iconlist',
  data () {
    return {}
  },
  methods: {
    one () {
      showToast('每日推荐')
    },
    two () {
      showToast('私人漫游')
    },
    three () {
      showToast('歌单')
    },
    four () {
      showToast('排行榜')
    },
    five () {
      showToast('有声书')
    }
  }
}
</script>

<style lang="less" scoped>
.iconlist-container {
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;

  .iconItem {
    width: 20%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .icon {
      width: 35px;
      height: 35px;
    }

    span {
      padding-top: 8px;
      font-size: 14px;
    }
  }
}
</style>
