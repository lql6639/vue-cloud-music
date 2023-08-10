<template>
  <div class="detail-container">
    <van-nav-bar title="歌单" left-text="返回" left-arrow fixed safe-area-inset-top @click-left="left" @click-right="right">
      <template #right>
        <van-icon name="search" size="20" />
      </template>
    </van-nav-bar>
    <img :src="this.playList.coverImgUrl" class="bgImg" />
    <van-back-top right="15vw" bottom="18vh" />
    <!-- top -->
    <div class="detail-top">
      <div class="detail-top-left">
        <!-- 专辑 -->
        <div class="grid">
          <div class="album">
            <img :src="this.playList.coverImgUrl" />
            <span class="count">
              <svg class="icon-count" aria-hidden="true">
                <use xlink:href="#icon-zanting1"></use>
              </svg>
              <span class="playCount">{{ changeCount(this.dynamic.playCount) }}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="detail-top-right">
        <!-- 详情 -->
        <div class="detail-detail">
          <!-- 歌单名字 -->
          <div class="name">{{ this.playList.name }}</div>
          <!-- 歌单作者 -->
          <div class="author">
            <img :src="this.avatarUrl" />
            <div class="author-name">{{ this.nickname }}</div>
          </div>
          <!-- 歌单描述 -->
          <div class="description">
            <div class="descriptions">{{ this.playList.description }}</div>
            <div>...</div>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-message">
      <!-- share -->
      <router-link :to="{ path: '/playlist/detail', query: { id: this.id } }">
        <div class="iconItem">
          <svg class="icon-iconItem" aria-hidden="true" @click="showShare = true">
            <use xlink:href="#icon-a-fenxiang2"></use>
          </svg>
          <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
          <span>{{ this.dynamic.shareCount }}</span>
        </div>
      </router-link>
      <!-- track -->
      <router-link :to="{ path: '/playlist/detail', query: { id: this.id } }">
        <div class="iconItem" @click="download">
          <svg class="icon-iconItem" aria-hidden="true">
            <use xlink:href="#icon-a-xiazai2"></use>
          </svg>
          <span>{{ this.playList.trackCount }}</span>
        </div>
      </router-link>
      <!-- comment -->
      <router-link :to="{ path: '/comment/playlist', query: { id: this.playList.id } }">
        <div class="iconItem">
          <svg class="icon-iconItem" aria-hidden="true">
            <use xlink:href="#icon-xinxi"></use>
          </svg>
          <span>{{ this.dynamic.commentCount }}</span>
        </div>
      </router-link>
      <!-- booked -->
      <router-link :to="{ path: '/playlist/detail', query: { id: this.id } }">
        <div class="iconItem" @click="collect">
          <svg class="icon-iconItem" aria-hidden="true">
            <use xlink:href="#icon-_shoucang"></use>
          </svg>
          <span>{{ this.dynamic.bookedCount }}</span>
        </div>
      </router-link>
    </div>
    <!-- bottom -->
    <div class="detail-bottom">
      <div class="detail-bottom-top">
        <div class="detail-bottom-left">
          <svg class="icon" aria-hidden="true" @click="all">
            <use xlink:href="#icon-bofang"></use>
          </svg>
          <span class="all">播放全部<span class="many">共 {{ this.songList.length }} 首</span></span>
        </div>
        <div class="detail-bottom-right" v-for="(tag, index) in playList.tags" :key="index">
          <span>{{ tag }}</span>
        </div>
      </div>
    </div>
    <!-- song -->
    <div class="detail-song">
      <div class="itemList" v-for="(item, i) in songList" :key="i">
        <div class="listLeft" @click="playMusic(i)">
          <span class="index">{{ i + 1 }}</span>
          <div class="content">
            <div class="al">
              <p>{{ item.name }}</p>
            </div>
            <div class="ar">
              <span v-for="(ar, index) in item.ar" :key="index">{{ ar.name }}&nbsp;&nbsp;&nbsp;</span>
            </div>
          </div>
        </div>
        <div class="listRight">
          <svg class="icon shipin" aria-hidden="true" v-if="item.mv != 0" @click="mv">
            <use xlink:href="#icon-shipinbofang"></use>
          </svg>
          <svg class="icon liebiao" aria-hidden="true" @click="more">
            <use xlink:href="#icon-a-gengduo1"></use>
          </svg>
        </div>
      </div>
      <div class="block"></div>
    </div>
  </div>
</template>

<script>

import { ref } from 'vue'

import { showToast } from 'vant'

// 歌单详情 - 歌单详情动态 - 歌单所有歌曲
import { getPlaylistDetail, getPlaylistDetailDynamic, getPlaylistTrackAll } from '../../../api/api.js'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'detail',
  data () {
    return {
      id: '',
      nickname: '',
      avatarUrl: '',
      playList: [],
      dynamic: [],
      songList: []
    }
  },
  setup () {
    // 显示分享面板
    const showShare = ref(false)
    const options = [
      [
        { name: '微信', icon: 'wechat' },
        { name: '朋友圈', icon: 'wechat-moments' },
        { name: '微博', icon: 'weibo' },
        { name: 'QQ', icon: 'qq' }
      ],
      [
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
        { name: '小程序码', icon: 'weapp-qrcode' }
      ]
    ]
    const onSelect = (option) => {
      showToast(option.name)
      showShare.value = false
    }
    return {
      options,
      onSelect,
      showShare
    }
  },
  created () {
    this.initGet()
  },
  methods: {
    left () {
      showToast('返回')
      this.$router.go(-1)
    },
    right () {
      showToast('搜索')
    },
    download () {
      showToast('下载')
    },
    collect () {
      showToast('收藏')
    },
    all () {
      showToast('播放全部')
    },
    mv () {
      showToast('mv')
    },
    more () {
      showToast('更多')
    },
    async initGet () {
      // 传值
      this.id = this.$router.currentRoute.value.query.id
      // 歌单详情
      const { data: detail } = await getPlaylistDetail(this.id)
      // console.log('歌单详情')
      // console.log(detail)
      this.nickname = detail.playlist.creator.nickname
      this.avatarUrl = detail.playlist.creator.avatarUrl
      this.playList = detail.playlist
      sessionStorage.setItem('detail', JSON.stringify(detail))
      // 歌单详情动态
      const { data: dynamic } = await getPlaylistDetailDynamic(this.id)
      // console.log('歌单详情动态')
      // console.log(dynamic)
      this.dynamic = dynamic
      sessionStorage.setItem('dynamic', JSON.stringify(dynamic))
      // 歌单所有歌曲
      const { data: songs } = await getPlaylistTrackAll(this.id)
      // console.log('歌单所有歌曲')
      // console.log(songs)
      this.songList = songs.songs
      sessionStorage.setItem('songs', JSON.stringify(songs))
    },
    changeCount (num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + '亿'
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
      }
    },
    playMusic (i) {
      const musicItem = this.songList[i]
      this.$store.commit('updatePlayList', [musicItem])
      this.$store.commit('updatePlayListIndex', i - i)
    }
  }
}
</script>

<style lang="less" scoped>
.detail-container {
  padding: 46px 0 100px 0;

  .bgImg {
    width: 100%;
    height: 210px;
    position: absolute;
    top: 0;
    z-index: -1;
    filter: blur(30px);
  }

  .detail-top {
    display: flex;
    padding: 24px 16px 5px 16px;

    .detail-top-left {
      flex: 0;

      .grid {
        .album {
          width: 120px;
          height: 120px;
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

            .icon-count {
              width: 10px;
              height: 10px;
              margin-top: -2px;
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

    .detail-top-right {
      flex: 1;

      .detail-detail {
        width: 90%;
        height: 100%;
        padding-left: 16px;
        position: relative;

        .name {
          display: flex;
          position: absolute;
          top: 0;
          height: 46px;
          line-height: 23px;
          overflow: hidden;
          text-align: justify;
        }

        .author {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 56px;

          img {
            width: 26px;
            height: 26px;
            border-radius: 50%;
          }

          .author-name {
            padding-left: 10px;
          }
        }

        .description {
          display: flex;
          position: absolute;
          bottom: 0;
          height: 24px;
          line-height: 24px;
          color: #969799;
          font-size: 14px;
          overflow: hidden;
          text-align: justify;

          .descriptions {
            width: 180px;
          }
        }
      }
    }
  }

  .detail-message {
    width: 100%;
    height: 75px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    a {
      color: #555;

      .iconItem {
        width: 120%;
        height: 60%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .icon-iconItem {
          fill: #fff;
          width: 23px;
          height: 23px;
        }

        span {
          padding-top: 8px;
          font-size: 14px;

          span {
            color: #969799;
          }
        }
      }
    }
  }

  .detail-bottom {
    width: 100%;
    // height: 200px;
    background-color: #fff;
    border-radius: 16px 16px 0 0;

    .detail-bottom-top {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 16px 0;

      .detail-bottom-left {
        display: flex;
        justify-content: space-around;
        align-items: center;

        .icon {
          width: 23px;
          height: 23px;
        }

        .all {
          font-size: 15px;
          padding-left: 10px;

          .many {
            padding-left: 10px;
            font-size: 14px;
            color: #969799;
          }
        }
      }

      .detail-bottom-right {
        font-size: 14px;
        color: #969799;
      }
    }
  }

  .detail-song {
    width: 100%;
    background: #fff;

    .itemList {
      width: 100%;
      height: 70px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .listLeft {
        width: 80%;
        height: 100%;
        display: flex;
        align-items: center;

        .index {
          display: inline-block;
          width: 30px;
          text-align: center;
          padding: 24px 0 0 12px;
        }

        .content {
          padding-left: 12px;

          .al {
            p {
              width: 210px;
              height: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }

          .ar {
            width: 210px;
            height: 20px;
            font-weight: 400;
            font-size: 12px;
            color: #999;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

        }
      }

      .listRight {
        width: 20%;
        height: 100%;
        display: flex;
        align-items: center;

        .icon {
          fill: #999;
          width: 26px;
          height: 26px;
        }

        .shipin {
          position: absolute;
          right: 70px;
        }

        .liebiao {
          position: absolute;
          right: 20px;
        }
      }
    }

    // .itemList:hover {
    //   background: #ddd;
    // }

    .block {
      width: 100%;
      height: 120px;
    }

  }
}
</style>
