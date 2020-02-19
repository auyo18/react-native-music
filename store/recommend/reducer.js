import {
  ACTION_SET_BANNERS
} from './actions'

const defaultState = {
  banners: []
}

export default (state = defaultState, action) => {
  const { type, payload } = action
  switch (type) {
    case ACTION_SET_BANNERS:
      return Object.assign({}, state, {
        banners: payload
      })
    default:
      return state
  }
}
