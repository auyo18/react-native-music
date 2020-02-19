export const ACTION_SET_BANNERS        = 'SET_BANNERS'
export const ACTION_SET_ALBUMS         = 'SET_ALBUMS'
export const ACTION_SET_RECOM_PLAYLIST = 'SET_RECOM_PLAYLIST'
export const ACTION_SET_PLAYLIST       = 'SET_PLAYLIST'

export function setBanner(banners) {
  return {
    type:    ACTION_SET_BANNERS,
    payload: banners
  }
}

export function setAlbums(albums) {
  return {
    type:    ACTION_SET_ALBUMS,
    payload: albums
  }
}

export function setRecomPlaylist(recomPlaylist) {
  return {
    type:    ACTION_SET_RECOM_PLAYLIST,
    payload: recomPlaylist
  }
}

export function setPlaylist(playlist) {
  return {
    type:    ACTION_SET_PLAYLIST,
    payload: playlist
  }
}
