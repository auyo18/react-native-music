import { isFullIphone }         from '../utils'
import {
  MaterialIcons,
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
  Ionicons
}                               from '@expo/vector-icons'


/**
 * 公共变量
 */
import { Platform, Dimensions } from 'react-native'

// Device
export const IOS               = Platform.OS === 'ios' // 是否iOS
export const NAV_BAR_HEIGHT    = 40
export const STATUS_BAR_HEIGHT = isFullIphone ? 44 : 20
export const WINDOW_WIDTH      = Dimensions.get('window').width
export const WINDOW_HEIGHT     = Dimensions.get('window').height

// Navigation
export const initialHomeTabName = 'Recommend'

// Service
export const BASE_URL     = 'http://192.168.50.3:3200'

// Storage
export const storageKey = {
  FAVORITE_LIST_KEY: '__FAVORITE__',
  TAGS_KEY:          '__TAGS__'
}

//  Icon
export const HOME_MENU = {
  Recommend: { name: '音乐馆', Icons: FontAwesome, icon: 'music' },
  Singer:    { name: '歌手', Icons: Ionicons, icon: 'md-microphone' },
  Rank:      { name: '排行', Icons: MaterialIcons, icon: 'whatshot' },
  User:      { name: '我的', Icons: AntDesign, icon: 'user' }
}

export const MORE_MENU = {
  Blog:            { name: '博客', Icons: AntDesign, icon: 'link' },
  Custom_Language: { name: '自定义语言', Icons: Entypo, icon: 'language' },
  Sort_Language:   { name: '语言排序', Icons: MaterialCommunityIcons, icon: 'sort' },
  Custom_Tag:      { name: '自定义标签', Icons: AntDesign, icon: 'tago' },
  Sort_Tag:        { name: '标签排序', Icons: MaterialCommunityIcons, icon: 'sort' },
  Remove_Tag:      { name: '标签移除', Icons: MaterialIcons, icon: 'remove' },
  Custom_Theme:    { name: '自定义主题', Icons: AntDesign, icon: 'skin' },
  About_Author:    { name: '关于作者', Icons: Feather, icon: 'user' },
  About:           { name: '关于', Icons: AntDesign, icon: 'github' },
  Feedback:        { name: '反馈', Icons: AntDesign, icon: 'exclamationcircleo' },
}
