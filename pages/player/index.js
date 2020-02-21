import React, {
  useCallback,
  useEffect,
  useMemo
}                            from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
}                            from 'react-native'
import { connect }           from 'react-redux'
import {
  StatusBarEvents,
  LeftBackButton,
  Iconfont, Mask
}                            from '../../components'
import { STATUS_BAR_HEIGHT } from '../../constants'
import * as styles           from '../../styles'
import { playModes }         from '../../constants'
import { Audio }             from 'expo-av'
import { getSongUrl }        from '../../api'
import {
  setAudio,
  setMode,
  setCurrentId,
  setPlaying,
  setCurrentIndex,
  setLoaded,
}                            from '../../store'
import {
  MaterialIcons,
  Ionicons
}                            from '@expo/vector-icons'

function Player({
  navigation,
  audio,
  playing,
  playlist,
  mode,
  currentIndex,
  currentSong,
  currentId,
  loaded,
  setAudio,
  setMode,
  setCurrentId,
  setPlaying,
  setCurrentIndex,
  setLoaded,
}) {
  const playMode       = useMemo(() => playModes[mode], [mode])
  const playlistLength = useMemo(() => playlist.length, [playlist])

  const loadAudio = useCallback(async url => {
    if (url) {
      try {
        if (audio !== null) {
          await audio.unloadAsync()
        }
        const { sound } = await Audio.Sound.createAsync(
          {
            uri: url
          },
          {
            shouldPlay: true
          }
        )
        setAudio(sound)
        setPlaying(true)
      } catch (error) {
        console.log(error)
      }
    }
    setLoaded(true)
  }, [setAudio, setPlaying, setLoaded, audio])

  const getData = useCallback(async () => {
    if (!loaded) return
    const { id } = currentSong
    if (id === currentId) return
    setLoaded(false)
    setCurrentId(id)
    const { data: [data] } = await getSongUrl({ id })
    loadAudio(data.url)
  }, [loaded, currentSong, loadAudio, currentId, setCurrentId, setLoaded])

  const play = useCallback(async () => {
    await audio.playAsync()
    setPlaying(true)
  }, [audio, setPlaying])

  const pause = useCallback(async () => {
    await audio.pauseAsync()
    setPlaying(false)
  }, [audio, setPlaying])

  const onPlayPausePressed = useCallback(() => {
    if (audio != null) {
      if (playing) {
        pause()
      } else {
        play()
      }
    }
  }, [audio, playing, pause, play])

  const prevSong = useCallback(() => {
    if (!loaded) return
    let index = currentIndex - 1
    if (currentIndex === 0) {
      index = playlistLength - 1
    }
    setCurrentIndex(index)
  }, [currentIndex, loaded, playlistLength, setCurrentIndex])

  const nextSong = useCallback(() => {
    if (!loaded) return
    let index = currentIndex + 1
    if (currentIndex === playlistLength - 1) {
      index = 0
    }
    setCurrentIndex(index)
  }, [currentIndex, loaded, playlistLength, setCurrentIndex])

  const setPlayerMode = useCallback(() => {
    const m = (mode + 1) % 3
    setMode(m)
  }, [mode, setMode])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <>
      <View style={{ height: STATUS_BAR_HEIGHT }}>
        <StatusBarEvents barStyle='light-content'/>
      </View>
      <Image
        source={{ uri: currentSong.image + '?param=300y300' }}
        style={{
          width:           '100%',
          height:          '100%',
          position:        'absolute',
          top:             0,
          left:            0,
          backgroundColor: styles.colorSub
        }}
        resizeMode='cover'
        blurRadius={100}
      />
      <Mask opacity={.5}/>
      <View>
        <LeftBackButton
          navigation={navigation}
          color={styles.colorLight}
        />
        <View style={{
          position:       'absolute',
          height:         '100%',
          left:           40,
          right:          40,
          justifyContent: 'center',
        }}>
          <Text numberOfLines={1} style={{
            textAlign: 'center',
            fontSize:  styles.font_size_large,
            color:     styles.colorLight
          }}>{currentSong.name}</Text>
          <Text numberOfLines={1} style={{ textAlign: 'center', color: styles.colorLight }}>{currentSong.singer}</Text>
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <View style={{
          marginTop:   100,
          borderColor: 'rgba(255,255,255,.2)',
          borderWidth: 6,
        }}>
          <Image
            source={{ uri: currentSong.image + '?param=300y300' }}
            style={{
              width: 250, height: 250
            }}
          />
        </View>
      </View>
      <View style={{
        flexDirection:  'row',
        justifyContent: 'space-around',
        alignItems:     'center',
        position:       'absolute',
        width:          '100%',
        bottom:         50
      }}>
        <TouchableOpacity
          onPress={setPlayerMode}
          style={{ width: 40 }}
        >
          <Iconfont
            Icons={playMode.Icon}
            name={playMode.icon}
            color='white'
            size={40}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={prevSong}
        >
          <Iconfont
            Icons={MaterialIcons}
            name='skip-previous'
            color={loaded ? 'white' : styles.full_grey}
            size={40}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPlayPausePressed}
        >
          <Iconfont
            name={playing ? 'pausecircle' : 'play'}
            color={loaded ? 'white' : styles.full_grey}
            size={60}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={nextSong}
        >
          <Iconfont
            Icons={MaterialIcons}
            name='skip-next'
            color={loaded ? 'white' : styles.full_grey}
            size={40}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: 30 }}
        >
          <Iconfont
            Icons={Ionicons}
            name='md-list-box'
            color='white'
            size={30}
          />
        </TouchableOpacity>
      </View>
    </>
  )
}

const mapStateToProps    = state => ({
  audio:        state.player.audio,
  playing:      state.player.playing,
  mode:         state.player.mode,
  playlist:     state.player.playlist,
  currentIndex: state.player.currentIndex,
  currentId:    state.player.currentId,
  currentSong:  state.player.playlist[state.player.currentIndex] || {},
  loaded:       state.player.loaded,
})
const mapDispatchToProps = dispatch => ({
  setAudio(a) {
    dispatch(setAudio(a))
  },
  setCurrentIndex(i) {
    dispatch(setCurrentIndex(i))
  },
  setCurrentId(l) {
    dispatch(setCurrentId(l))
  },
  setPlaying(p) {
    dispatch(setPlaying(p))
  },
  setLoaded(l) {
    dispatch(setLoaded(l))
  },
  setMode(m) {
    dispatch(setMode(m))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Player)
