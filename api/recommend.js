import service from '../utils/request'

export function getRecommend() {
  return service({
    url: '/getRecommend'
  })
}
