import React, {
  useEffect,
  useCallback,
  memo, useMemo
}                       from 'react'
import {
  Text,
  ScrollView,
  View,
  Image,
  FlatList,
  StyleSheet
}                       from 'react-native'
import Swiper           from 'react-native-swiper'
import {
  Iconfont,
  Header
}                       from '../../components'
import PropTypes        from 'prop-types'
import {
  HOME_MENU,
}                       from '../../constants'
import {
  handleNum,
  handleSinger
}                       from '../../utils'
import { connect }      from 'react-redux'
import {
  setBanner,
  setAlbums,
  setRecomPlaylist,
  setPlaylist,
}                       from '../../store'
import { getRecommend } from '../../api'
import * as styles      from '../../styles'

const {
        Recommend: RecommendMenu
      }     = HOME_MENU
const title = RecommendMenu.name

const PlayItem = memo(function ({
  cover,
  title,
  nick
}) {
  return (
    <View style={{ width: '50%', marginVertical: 10 }}>
      <Image
        source={{ uri: cover }}
        style={{ width: 185, height: 185, borderRadius: 5 }}
      />
      <Text
        numberOfLines={1}
        style={{ marginTop: 10 }}
      >{title}</Text>
      <Text style={{ marginTop: 5, color: styles.colorSub }}>{nick}</Text>
    </View>
  )
})

PlayItem.propTypes = {
  cover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  nick:  PropTypes.string.isRequired,
}

const Item = memo(function ({
  cover,
  title,
  number,
  singers
}) {
  const formalNum  = useMemo(() => handleNum(number), [number])
  const singerName = useMemo(() => handleSinger(singers), [singers])
  return (
    <View style={{ width: 120, marginVertical: 10, marginHorizontal: 4 }}>
      <View style={{ borderRadius: 5, overflow: 'hidden' }}>
        <Image
          source={{ uri: cover }}
          style={{ width: 120, height: 120 }}
        />
        <View
          style={{
            position:        'absolute',
            top:             0,
            bottom:          0,
            left:            0,
            right:           0,
            backgroundColor: 'rgba(0,0,0,.2)',
          }}
        />
        <View
          style={{
            flexDirection:  'row',
            position:       'absolute',
            bottom:         0,
            left:           0,
            width:          '100%',
            padding:        5,
            alignItems:     'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color:    'white',
              fontSize: styles.font_size_small,
            }}
          >{formalNum}</Text>
          <Iconfont name='play' color='white'/>
        </View>
      </View>
      <Text
        numberOfLines={2}
        style={{ marginTop: 10 }}
      >
        {title}
      </Text>
      {
        Boolean(singerName) &&
        <Text
          style={{
            color:     styles.colorDesc,
            fontSize:  styles.font_size_small,
            marginTop: 5
          }}
        >
          {singerName}
        </Text>
      }
    </View>
  )
})

Item.propTypes = {
  cover:   PropTypes.string.isRequired,
  title:   PropTypes.string.isRequired,
  number:  PropTypes.number,
  singers: PropTypes.array,
}

const Banner = memo(function ({
  uri
}) {
  return (
    <View
      style={[
        _style.paddingHorizontal,
        {
          paddingVertical: 10,
        }]}
    >
      <Image
        source={{ uri }}
        style={{ width: '100%', height: 160, borderRadius: 5 }}
      />
    </View>
  )
})

Banner.propTypes = {
  uri: PropTypes.string.isRequired
}

function Recommend({
  banners,
  albums,
  recomPlaylist,
  playlist,
  setBanner,
  setAlbums,
  setRecomPlaylist,
  setPlaylist,
}) {
  const getData = useCallback(async () => {
    const data = await getRecommend()
    const {
            response: {
                        focus:         { data: { content } },
                        new_album:     { data: { albums } },
                        recomPlaylist: { data: { v_hot } },
                        playlist:      { data: { v_playlist } },
                      }
          }    = data
    setBanner(content)
    setAlbums(albums)
    setRecomPlaylist(v_hot)
    setPlaylist(v_playlist)
    console.log(data, v_playlist)
  }, [setBanner, setAlbums, setRecomPlaylist, setPlaylist])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <>
      <Header title={title}/>
      <ScrollView style={{ backgroundColor: styles.full_base }}>
        <Swiper
          style={{ height: 190 }}
          dotColor='rgba(255,255,255,.2)'
          activeDotColor='white'
        >
          {
            banners.map(banner => (
              <Banner
                key={banner.id}
                uri={banner.pic_info.url}
              />
            ))
          }
        </Swiper>
        <View style={_style.module}>
          <Text style={_style.moduleTitle}>
            达人歌单
          </Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
          >
            <View style={{ height: 370, flexWrap: 'wrap', paddingHorizontal: 10 }}>
              {
                recomPlaylist.map(item => (
                  <Item
                    key={item.content_id}
                    cover={item.cover}
                    title={item.title}
                    number={item.listen_num}
                  />
                ))
              }
            </View>

          </ScrollView>
        </View>
        <View style={_style.module}>
          <Text style={_style.moduleTitle}>
            推荐歌单
          </Text>
          <View style={_style.paddingHorizontal}>
            <FlatList
              data={playlist}
              numColumns={2}
              keyExtractor={item => item.tid}
              initialNumToRender={10}
              renderItem={({ item }) => (
                <PlayItem
                  cover={item.cover_url_big}
                  title={item.title}
                  nick={item.creator_info.nick}
                />
              )}
            />
          </View>
        </View>
        <View style={_style.module}>
          <Text style={_style.moduleTitle}>
            最新专辑
          </Text>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
          >
            <View
              style={{ flexDirection: 'row', paddingHorizontal: 10 }}
            >
              {
                albums.map(item => (
                  <Item
                    key={item.id}
                    cover={`https://y.gtimg.cn/music/photo_new/T002R800x800M000${item.mid}_1.jpg?max_age=2592000`}
                    title={item.name}
                    singers={item.singers}
                  />
                ))
              }
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </>
  )
}

Recommend.navigationOptions = {
  headerShown: false,
  tabBarIcon:  ({ tintColor }) => <Iconfont Icons={RecommendMenu.Icons} name={RecommendMenu.icon} color={tintColor}/>,
  tabBarLabel: title
}

const mapStateToProps    = state => ({
  banners:       state.recommend.banners,
  albums:        state.recommend.albums,
  recomPlaylist: state.recommend.recomPlaylist,
  playlist:      state.recommend.playlist,
})
const mapDispatchToProps = dispatch => ({
  setBanner(b) {
    dispatch(setBanner(b))
  },
  setRecomPlaylist(r) {
    dispatch(setRecomPlaylist(r))
  },
  setAlbums(a) {
    dispatch(setAlbums(a))
  },
  setPlaylist(p) {
    dispatch(setPlaylist(p))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Recommend)

const _style = StyleSheet.create({
  module:            {
    marginVertical: 10,
  },
  moduleTitle:       {
    fontSize:          styles.font_size_large,
    fontWeight:        'bold',
    marginBottom:      10,
    paddingHorizontal: 15
  },
  paddingHorizontal: {
    paddingHorizontal: 15
  }
})
