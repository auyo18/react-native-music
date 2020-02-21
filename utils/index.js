import { Dimensions, Platform } from 'react-native'

export let screenW = Dimensions.get('window').width
export let screenH = Dimensions.get('window').height

// iPhoneX
const X_WIDTH  = 375
const X_HEIGHT = 812

// iPhoneXR
const XR_WIDTH  = 414
const XR_HEIGHT = 896

/**
 * 判断是否为iphoneX
 * @returns {boolean}
 */
function checkFullIphone() {
  return (
    Platform.OS === 'ios' &&
    (((screenH === X_HEIGHT && screenW === X_WIDTH) ||
      (screenH === X_WIDTH && screenW === X_HEIGHT)) ||
      ((screenH === XR_HEIGHT && screenW === XR_WIDTH) ||
        (screenH === XR_WIDTH && screenW === XR_HEIGHT)))
  )
}

export const isFullIphone = checkFullIphone()

/**
 *
 * @param num
 * @returns {string|*}
 */
export function handleNum(num) {
  if (!num) return
  if (num > 100000000) {
    return (num / 100000000).toFixed() + '亿'
  }
  if (num > 10000) {
    return (num / 10000).toFixed() + '万'
  }
  return num
}

/**
 *
 * @param singers
 * @returns {string}
 */
export function handleSinger(singers) {
  if (Array.isArray(singers)) {
    let names = []
    singers.forEach(singer => {
      names.push(singer.name)
    })

    return names.join(' / ')
  }
}


export class Song {
  constructor({
    id,
    name,
    singer,
    image
  }) {
    this.id     = id
    this.name   = name
    this.singer = singer
    this.image  = image
  }
}

export const normalizeSongs = list => {
  let ret = []
  list.length && list.forEach(item => {
    ret.push(new Song({
      id:     item.id,
      name:   item.name,
      singer: handleSinger(item.ar),
      image:  item.al.picUrl,
    }))
  })
  return ret
}
