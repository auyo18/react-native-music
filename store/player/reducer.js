import {
  ACTION_SET_AUDIO,
  ACTION_SET_PLAYING,
  ACTION_SET_PLAYLIST,
  ACTION_SET_MODE,
  ACTION_SET_CURRENT_INDEX,
  ACTION_SET_CURRENT_ID,
  ACTION_SET_LOADED,
} from './actions'

const defaultState = {
  audio:        null, // 音频实例
  singer:       {}, // 歌手信息
  playing:      false, // 播放状态
  fullScreen:   false, // 播放器展开状态
  playlist:     [], // 播放列表
  sequenceList: [], // 歌曲列表
  mode:         0, // 播放模式
  currentIndex: -1, // 当前播放歌曲索引,
  currentId:    -1, // 当前播放歌曲ID,
  playHistory:  [], //播放历史
  favoriteList: [], // 喜欢的歌曲列表
  loaded:       true, // 是否加载完成
}

export default (state = defaultState, action) => {
  const { type, payload } = action
  switch (type) {
    case ACTION_SET_AUDIO:
      return Object.assign({}, state, {
        audio: payload
      })
    case ACTION_SET_PLAYING:
      return Object.assign({}, state, {
        playing: payload
      })
    case ACTION_SET_PLAYLIST:
      return Object.assign({}, state, {
        playlist: payload
      })
    case ACTION_SET_MODE:
      return Object.assign({}, state, {
        mode: payload
      })
    case ACTION_SET_CURRENT_INDEX:
      return Object.assign({}, state, {
        currentIndex: payload
      })
    case ACTION_SET_CURRENT_ID:
      return Object.assign({}, state, {
        currentId: payload
      })
    case ACTION_SET_LOADED:
      return Object.assign({}, state, {
        loaded: payload
      })
    default:
      return state
  }
}
