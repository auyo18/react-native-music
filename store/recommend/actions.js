import {
  getBanner,
  getPersonalizedPlaylist,
  getTopList,
}                       from '../../api'
import { SUCCESS_CODE } from '../../constants'

export const ACTION_SET_BANNERS               = 'SET_BANNERS'
export const ACTION_SET_PERSONALIZED_PLAYLIST = 'SET_PERSONALIZED_PLAYLIST'
export const ACTION_SET_TOP_LIST              = 'SET_TOP_LIST'

export function setBanner() {
  return async dispatch => {
    const { banners, code } = await getBanner()
    if (code === SUCCESS_CODE) {
      dispatch({
        type:    ACTION_SET_BANNERS,
        payload: banners
      })
    }
  }
}

export function setPersonalizedPlaylist() {
  return async dispatch => {
    const { result, code } = await getPersonalizedPlaylist()
    if (code === SUCCESS_CODE) {
      dispatch({
        type:    ACTION_SET_PERSONALIZED_PLAYLIST,
        payload: result
      })
    }
  }
}

export function setTopList() {
  return async dispatch => {
    const { playlist: { tracks }, code } = await getTopList({ idx: 1 })
    if (code === SUCCESS_CODE) {
      dispatch({
        type:    ACTION_SET_TOP_LIST,
        payload: tracks
      })
    }
  }
}

export function setRecommend() {
  return dispatch => {
    dispatch(setBanner())
    dispatch(setPersonalizedPlaylist())
    dispatch(setTopList())
  }
}
