import React, {
  useCallback,
  useEffect,
  useState
}                            from 'react'
import {
  Image,
  StyleSheet,
  View,
  Text
}                            from 'react-native'
import { getPlaylistDetail } from '../../api'
import {
  STATUS_BAR_HEIGHT,
  SUCCESS_CODE
}                            from '../../constants'
import { normalizeSongs }    from '../../utils'
import {
  MusicList,
  LeftBackButton,
  StatusBarEvents,
  Mask
}                            from '../../components'
import * as styles           from '../../styles'
import ParallaxScrollView    from 'react-native-parallax-scroll-view'

const HEADER_HEIGHT = STATUS_BAR_HEIGHT + 40

function Playlist({ navigation }) {
  const { id }                          = navigation.state.params
  const [playlistInfo, setPlaylistInfo] = useState(() => ({ cover: '', name: '', list: [] }))

  const getData = useCallback(async () => {
    const { playlist: { tracks, coverImgUrl, creator: { nickname, avatarUrl }, name, description }, code } = await getPlaylistDetail({ id })
    if (code === SUCCESS_CODE) {
      setPlaylistInfo(playlistInfo => Object.assign({}, playlistInfo, {
        cover:       coverImgUrl,
        nickname,
        avatar:      avatarUrl,
        name,
        list:        normalizeSongs(tracks),
        description: description ? description.replace(/[\r\n]/g, ' ') : ''
      }))
    }
  }, [id])

  const parallaxConfig = {
    renderBackground() {
      return (
        <View>
          <Image
            blurRadius={100}
            style={{ width: '100%', height: '100%' }}
            source={{ uri: playlistInfo.cover + '?param=300y300' }}
          />
          <Mask/>
        </View>
      )
    },
    renderForeground() {
      return (
        <View style={[_style.paddingHorizontal, {
          alignItems:    'center',
          flex:          1,
          flexDirection: 'row',
          paddingTop:    40,
        }]}>
          <Image
            style={{ width: 150, height: 150, borderRadius: 5 }}
            source={{ uri: playlistInfo.cover + '?param=300y300' }}/>
          <View style={{ marginLeft: 20, flex: 1 }}>
            <Text
              style={{ color: 'white', fontSize: styles.font_size_medium, marginBottom: 5 }}>
              {playlistInfo.name}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 20 }}>
              <Image
                source={{ uri: playlistInfo.avatar + '?param=70y70' }}
                style={{ width: 30, height: 30, borderRadius: 50, marginRight: 10 }}
              />
              <Text
                style={{ color: 'white', marginBottom: 5 }}>
                {playlistInfo.nickname}
              </Text>
            </View>
            <Text numberOfLines={2}
                  style={{
                    color:    styles.full_grey,
                    fontSize: styles.font_size_small
                  }}>{playlistInfo.description}</Text>
          </View>
        </View>
      )
    },
    renderStickyHeader() {
      return (
        <View style={{
          alignItems:      'center',
          height:          HEADER_HEIGHT,
          justifyContent:  'flex-end',
          backgroundColor: 'transparent',
        }}>
          <Text style={{ margin: 10, fontSize: styles.font_size_medium, color: 'white' }}>{playlistInfo.name}</Text>
        </View>
      )
    },
    renderFixedHeader() {
      return (
        <View style={{
          position:       'absolute',
          justifyContent: 'flex-end',
          height:         HEADER_HEIGHT,
        }}>
          <LeftBackButton
            navigation={navigation}
            color='white'
          />
        </View>
      )
    }
  }

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <>
      <StatusBarEvents barStyle='light-content'/>
      <ParallaxScrollView
        backgroundColor={styles.colorBase}
        parallaxHeaderHeight={300}
        stickyHeaderHeight={HEADER_HEIGHT}
        {...parallaxConfig}
      >
        <View style={[_style.paddingHorizontal, {
          marginVertical: 15
        }]}>
          <MusicList
            list={playlistInfo.list}
            onSelect={() => {
            }}
          />
        </View>
      </ParallaxScrollView>
    </>
  )
}

export default Playlist

const _style = StyleSheet.create({
  paddingHorizontal: {
    paddingHorizontal: 15
  },
})
