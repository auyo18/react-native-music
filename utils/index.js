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
