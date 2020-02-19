export const ACTION_SET_BANNERS = 'SET_BANNERS'

export function setBanner(banners) {
  return {
    type:    ACTION_SET_BANNERS,
    payload: banners
  }
}
