import service from '../utils/request'

export function getBanner() {
  return service({
    url:    '/banner',
    params: {
      type: 1
    }
  })
}

export function getTopList(params) {
  return service({
    url: '/top/list',
    params
  })
}
