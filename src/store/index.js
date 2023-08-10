import { createStore } from 'vuex'

export default createStore({
  state: {
    // 数据，相当于data
    playList: [{ // 播放列表
      al: {
        id: 131405806,
        name: '致你',
        pic: 109951166254691360,
        picUrl: 'https://p2.music.126.net/VDmN2dNpIFu4gTv4bZe6KQ==/109951166254691365.jpg',
        pic_str: '109951166254691365'
      },
      ar: [{
        id: 36032190,
        name: 'yihuik苡慧'
      }],
      name: '致你',
      id: 1867217766 // 音乐id
    }],
    playListIndex: 0, // 默认下标
    isplay: true, // 暂停？
    detailShow: false // 歌曲详情页的显示
  },
  getters: {
    // ...
  },
  // 里面定义方法，操作state方发
  mutations: {
    // 按钮
    updataIsplay (state, value) {
      state.isplay = value
    },
    // 列表
    updatePlayList (state, value) {
      state.playList = value
    },
    // 歌曲
    updatePlayListIndex (state, value) {
      state.playListIndex = value
    },
    // 详情
    updateDetailShow (state) {
      state.detailShow = !state.detailShow
    }
  },
  // 操作异步操作mutation
  actions: {
    // ...
  },
  modules: {
    // ...
  }
})
