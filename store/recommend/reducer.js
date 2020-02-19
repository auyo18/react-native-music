import {
  ACTION_SET_BANNERS,
  ACTION_SET_ALBUMS,
  ACTION_SET_RECOM_PLAYLIST,
  ACTION_SET_PLAYLIST,
} from './actions'

const defaultState = {
  banners:       [],
  albums:        [],
  recomPlaylist: [],
  playlist:      []
}

export default (state = defaultState, action) => {
  const { type, payload } = action
  switch (type) {
    case ACTION_SET_BANNERS:
      return Object.assign({}, state, {
        banners: payload
      })
    case ACTION_SET_ALBUMS:
      return Object.assign({}, state, {
        albums: payload
      })
    case ACTION_SET_RECOM_PLAYLIST:
      return Object.assign({}, state, {
        recomPlaylist: payload
      })
    case ACTION_SET_PLAYLIST:
      return Object.assign({}, state, {
        playlist: payload
      })
    default:
      return state
  }
}
