import service from '../utils/request'

export function getSongUrl({ id }) {
  return service({
    url:    '/song/url',
    params: {
      id
    }
  })
}
