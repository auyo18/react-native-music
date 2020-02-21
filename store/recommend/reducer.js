import {
  ACTION_SET_BANNERS,
  ACTION_SET_PERSONALIZED_PLAYLIST,
  ACTION_SET_TOP_LIST,
} from './actions'

const defaultState = {
  banners:              [], // 发现页面banner图
  personalizedPlaylist: [], // 推荐歌单
  topList:              [], // 热歌排行榜
}

export default (state = defaultState, action) => {
  const { type, payload } = action
  switch (type) {
    case ACTION_SET_BANNERS:
      return Object.assign({}, state, {
        banners: payload
      })
    case ACTION_SET_PERSONALIZED_PLAYLIST:
      return Object.assign({}, state, {
        personalizedPlaylist: payload
      })
    case ACTION_SET_TOP_LIST:
      return Object.assign({}, state, {
        topList: payload
      })
    default:
      return state
  }
}
