<template>
  <div class="toplist-container">
    <van-collapse v-model="activeNames">
      <van-collapse-item title="特色榜" name="1">
        <!-- 专辑 -->
        <div class="grid">
          <div class="album" v-for="item in state.toplist.slice(0, 6)" :key="item.id">
            <router-link :to="{ path: '/playlist/detail', query: { id: item.id } }">
              <img :src="item.coverImgUrl" />
              <span class="count">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-zanting1"></use>
                </svg>
                <span class="playCount">{{ changeCount(item.playCount) }}</span>
              </span>
            </router-link>
          </div>
        </div>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>

import { reactive, onMounted } from 'vue'

// 所有榜单
import { getToplistDetail } from '../../../api/api.js'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'toplist',
  data () {
    return {
      activeNames: ['1']
    }
  },
  setup () {
    const state = reactive({
      toplist: []
    })
    onMounted(async () => {
      const { data: top } = await getToplistDetail()
      // console.log('所有榜单')
      // console.log(top)
      state.toplist = top.list
      // state.toplist = top.list.filter((v) => v.ToplistType)
      sessionStorage.setItem('feature', JSON.stringify(top))
    })
    return { state }
  },
  methods: {
    changeCount (num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + '亿'
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.toplist-container {
  padding-top: 10px;
  width: 100%;

  /deep/ .van-cell__title {
    font-size: 16px;
    font-weight: bold;
    line-height: 28px;
  }

  .grid {
    display: flex;
    flex-wrap: wrap;
    // 布局居中对齐
    justify-content: space-between;

    .album {
      // 设置盒子基础宽度
      flex-basis: calc(33.33% - 10px);
      height: 0;
      // 高度等比于宽度
      padding-bottom: calc(33.33% - 5px);
      // 相邻盒子底部间距，可以根据需要调整
      margin-bottom: 10px;
      position: relative;

      img {
        width: 100%;
        border-radius: 10px;
      }

      .count {
        position: absolute;
        padding: 8px;
        right: 0;
        // z-index: 99;

        .icon {
          width: 10px;
          height: 10px;
          margin-top: -4px;
          margin-right: 5px;
          vertical-align: middle;
        }

        .playCount {
          color: #fff;
          font-size: 12px;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
