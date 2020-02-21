import service from '../utils/request'

export function getPersonalizedPlaylist() {
  return service({
    url: '/personalized'
  })
}

export function getPlaylistDetail({ id }) {
  return service({
    url:    '/playlist/detail',
    params: {
      id
    }
  })
}
