import request from '../utils/request.js'

// banner   ->   调用此接口 , 可获取 banner( 轮播图 ) 数据
export function getBanner (type) {
  return request.get('/banner', {
    // 请求参数
    params: {
      // 资源类型 0: pc 1: android 2: iphone 3: ipad
      type
    }
  })
}

// 所有榜单   ->   调用此接口，可获取所有榜单内容摘要
export function getToplistDetail () {
  return request.get('/toplist')
}

// 推荐歌单   ->   调用此接口，可获取推荐歌单
export function getPersonalized (limit) {
  return request.get('/personalized', {
    // 请求参数
    params: {
      // 取出数量 , 默认为 30
      limit
    }
  })
}

// 歌单详情   ->   歌单能看到歌单名字, 但看不到具体歌单内容，调用此接口，传入歌单 id, 可 以获取对应歌单内的所有的音乐
export function getPlaylistDetail (id) {
  return request.get('/playlist/detail', {
    // 请求参数
    params: {
      // 歌单id
      id
    }
  })
}

// 歌单详情动态   ->   调用后可获取歌单详情动态部分, 如评论数, 是否收藏, 播放数
export function getPlaylistDetailDynamic (id) {
  return request.get('/playlist/detail/dynamic', {
    // 请求参数
    params: {
      // 歌单id
      id
    }
  })
}

// 歌单所有歌曲   ->   由于网易云接口限制，歌单详情只会提供 10 首歌，通过调用此接口，传入对应的歌单，即可获得对应的所有歌曲 id
export function getPlaylistTrackAll (id) {
  return request.get('/playlist/track/all', {
    // 请求参数
    params: {
      // 歌单id
      id
    }
  })
}

// 歌单评论   ->   说明 : 调用此接口 , 传入歌单 id 和 limit 参数 , 可获得该歌单的所有评论 ( 不需要 登录 )
export function getCommentPlaylist (id) {
  return request.get('/comment/playlist', {
    // 请求参数
    params: {
      // 歌单id
      id
      // 取出评论数量
      // limit
    }
  })
}

// 搜索   ->   调用此接口，传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 可通过 接口传入歌曲 id 获取具体的播放链接/song/url
export function getSearch (keywords) {
  return request.get('/search', {
    // 请求参数
    params: {
      // 关键词
      keywords
    }
  })
}

// 热搜列表   ->   调用此接口，可获取热门搜索列表
export function getSearchHotDetail () {
  return request.get('/search/hot/detail')
}

// 获取歌曲详情   ->   调用此接口，传入音乐 id（支持多个 id， 用 隔开），获得歌曲详情（dt为歌曲时长）
export function getSongDetail (ids) {
  return request.get('/song/detail', {
    // 请求参数
    params: {
      // 音乐id
      ids
    }
  })
}

// 获取音乐url   ->   使用歌单详情接口后，能得到的音乐的 id，但不能得到的音乐 url，调用此接口， 传入的音乐 id（ 可多个，用逗号隔开 ），可以获取对应的音乐的 url，未登录状态或者非会员返回试听片段（返回字段包含被截取的正常歌曲的开始时间和结束时间）
export function getSongUrl (id) {
  return request.get('/song/url', {
    // 请求参数
    params: {
      // 音乐id
      id
    }
  })
}

// 音乐是否可以用   ->   调用此接口,传入歌曲 id, 可获取音乐是否可用,返回 或者{ success: true, message: 'ok' }{ success: false, message: '亲爱的,暂无版权' }
export function getCheckMusic (id) {
  return request.get('/check/music', {
    // 请求参数
    params: {
      // 歌曲id
      id
    }
  })
}

// 获取歌词   ->   调用此接口，传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
export function getLyric (id) {
  return request.get('/lyric', {
    // 请求参数
    params: {
      // 音乐id
      id
    }
  })
}

// 获取逐字歌词   ->   此接口的 字段即为逐字歌词 (可能有歌曲不包含逐字歌词)
export function getLyricNew (id) {
  return request.get('/lyric/new', {
    // 请求参数
    params: {
      // 音乐id
      id
    }
  })
}

// 获取音乐评论   ->   调用此接口，传入音乐 id 和 limit 参数，可获得该音乐的所有评论 （ 不需要登录 ）
export function getCommentMusic (id) {
  return request.get('/comment/music', {
    // 请求参数
    params: {
      // 音乐id
      id
      // 取出评论数量
      // limit
    }
  })
}

// 获取用户歌单详情   ->   登录后调用此接口，传入用户 id，可以获取用户歌单
export function getUserPlaylist (uid) {
  return request.get('/user/playlist', {
    // 请求参数
    params: {
      // 用户id
      uid
    }
  })
}
