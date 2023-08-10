<template>
  <div class="playlistcomment-container">
    <van-nav-bar title="歌单评论" left-text="返回" left-arrow fixed safe-area-inset-top @click-left="left" />
    <!-- top -->
    <img :src="this.playList.coverImgUrl" class="bgImg" />
    <van-back-top right="15vw" bottom="18vh" />
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
              <span class="playCount">{{ changeCount(this.playList.playCount) }}</span>
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
    <div class="comments" v-for="item in playlistComment.comments" :key="item">
      <van-skeleton title avatar :row="4" />
    </div>
  </div>
</template>

<script>

import { showToast } from 'vant'

// 歌单详情 - 歌单评论
import { getPlaylistDetail, getCommentPlaylist } from '../../../api/api.js'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'playlistcomment',
  data () {
    return {
      id: '',
      nickname: '',
      avatarUrl: '',
      // 歌单详情
      playList: [],
      // 歌单评论
      playlistComment: []
    }
  },
  mounted () {
    this.initGet()
  },
  methods: {
    left () {
      showToast('返回')
      this.$router.go(-1)
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
      // 歌单评论
      const { data: playlistComment } = await getCommentPlaylist(this.id)
      // console.log('歌单评论')
      // console.log(playlistComment)
      this.playlistComment = playlistComment
      sessionStorage.setItem('playlistComment', JSON.stringify(playlistComment))
    },
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
.playlistcomment-container {
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

  .comments {
    .van-skeleton {
      padding: 30px var(--van-padding-md);
    }
  }

}
</style>
