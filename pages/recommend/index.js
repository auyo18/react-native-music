import React, {
  useEffect,
  useCallback,
  memo,
  useMemo,
}                       from 'react'
import {
  Text,
  ScrollView,
  View,
  Image,
  StyleSheet
}                       from 'react-native'
import Swiper           from 'react-native-swiper'
import {
  Iconfont,
  Header,
  MusicList,
  PlaylistItem
}                       from '../../components'
import PropTypes        from 'prop-types'
import {
  HOME_MENU,
}                       from '../../constants'
import {
  normalizeSongs
}                       from '../../utils'
import { connect }      from 'react-redux'
import {
  setRecommend,
  setPlaylist,
  setCurrentIndex,
}                       from '../../store'
import * as styles      from '../../styles'
import {
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
}                       from '@expo/vector-icons'
import Navigation       from '../../utils/navigation'

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
        style={{ width: 185, height: 185, borderRadius: 5, backgroundColor: styles.colorDesc }}
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

const Banner = memo(function ({
  uri,
  titleColor,
  typeTitle
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
        style={{ width: '100%', height: 140, borderRadius: 5, backgroundColor: styles.colorDesc }}
        resizeMode='stretch'
      />
      <View
        style={{
          position:              'absolute',
          bottom:                10,
          right:                 15,
          paddingVertical:       3,
          paddingHorizontal:     5,
          backgroundColor:       titleColor,
          borderTopStartRadius:  5,
          borderBottomEndRadius: 5
        }}
      >
        <Text style={{
          color: styles.colorLight,
        }}>{typeTitle}</Text>
      </View>
    </View>
  )
})

Banner.propTypes = {
  uri:        PropTypes.string.isRequired,
  titleColor: PropTypes.string.isRequired,
  typeTitle:  PropTypes.string.isRequired,
}

const Menu = memo(function ({
  Icons,
  icon,
  name,
  isEveryday
}) {
  return (
    <View style={{ alignItems: 'center' }}>
      {
        isEveryday &&
        <Text
          style={{ position: 'absolute', color: styles.colorMain, top: 11, fontSize: styles.font_size_small }}
        >{new Date().getDate()}</Text>
      }
      <Iconfont
        Icons={Icons}
        name={icon}
        color={styles.colorMain}
        size={30}
      />
      <View>

      </View>
      <Text style={{ marginTop: 10, color: styles.colorSub }}>{name}</Text>
    </View>
  )
})

Menu.propTypes = {
  Icons:      PropTypes.func.isRequired,
  icon:       PropTypes.string.isRequired,
  name:       PropTypes.string.isRequired,
  isEveryday: PropTypes.bool.isRequired,
}

function Recommend({
  banners,
  personalizedPlaylist,
  topList,
  setRecommend,
  navigation
}) {
  Navigation.setNavigation(navigation)

  const localTopList = useMemo(() => normalizeSongs(topList.slice(0, 20)), [topList])

  const setData = useCallback(async () => {
    setRecommend()
  }, [setRecommend])

  const menu = [
    { name: '每日推荐', Icons: Ionicons, icon: 'ios-calendar' },
    { name: '歌单', Icons: Ionicons, icon: 'md-list-box' },
    { name: '排行榜', Icons: Foundation, icon: 'graph-bar' },
    { name: '电台', Icons: Ionicons, icon: 'ios-radio' },
    { name: '直播', Icons: MaterialCommunityIcons, icon: 'youtube-tv' },
  ]


  /*const setPlayer = index => {
    setPlaylist(localTopList)
    setCurrentIndex(index)
    Navigation.goPage('Player')
  }*/

  useEffect(() => {
    setData()
  }, [setData])

  return (
    <>
      <Header title={title}/>
      <ScrollView style={{ backgroundColor: styles.full_base }}>
        <Swiper
          style={{ height: 170 }}
          dotColor='rgba(255,255,255,.2)'
          activeDotColor={styles.colorMain}
        >
          {
            banners.map(banner => (
              <Banner
                key={banner.targetId}
                uri={banner.pic}
                titleColor={banner.titleColor}
                typeTitle={banner.typeTitle}
              />
            ))
          }
        </Swiper>
        <View style={[_style.module, { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }]}>
          {
            menu.map((item, index) => (
              <Menu
                key={item.name}
                Icons={item.Icons}
                icon={item.icon}
                name={item.name}
                isEveryday={index === 0}
              />
            ))
          }
        </View>
        <View style={_style.module}>
          <Text style={_style.moduleSubTitle}>
            排行榜
          </Text>
          <Text style={_style.moduleTitle}>
            热歌风向标
          </Text>
          <View style={[_style.paddingHorizontal, { marginVertical: 20 }]}>
            <MusicList
              list={localTopList}
            />
          </View>
        </View>
        <View style={[_style.module, { marginVertical: 20 }]}>
          <Text style={_style.moduleSubTitle}>
            推荐歌单
          </Text>
          <Text style={_style.moduleTitle}>
            为你精挑细选
          </Text>
          <View
            style={{ flexDirection: 'row', paddingHorizontal: 10, flexWrap: 'wrap', justifyContent: 'space-between' }}
          >
            {
              personalizedPlaylist.map(item => (
                <PlaylistItem
                  key={item.id}
                  id={item.id}
                  cover={item.picUrl}
                  title={item.name}
                  number={item.playCount}
                />
              ))
            }
          </View>
        </View>

        {/*<View style={_style.module}>
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
        </View>*/}
        {/*<View style={_style.module}>
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
        </View>*/}
        {/*<View style={_style.module}>
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
        </View>*/}
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
  banners:              state.recommend.banners,
  personalizedPlaylist: state.recommend.personalizedPlaylist,
  topList:              state.recommend.topList,
})
const mapDispatchToProps = dispatch => ({
  setRecommend() {
    dispatch(setRecommend())
  },
  setPlaylist(p) {
    dispatch(setPlaylist(p))
  },
  setCurrentIndex(i) {
    dispatch(setCurrentIndex(i))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Recommend)

const _style = StyleSheet.create({
  module:            {
    marginVertical: 10,
  },
  moduleTitle:       {
    fontSize:       styles.font_size_large,
    fontWeight:     'bold',
    marginVertical: 10,
    paddingLeft:    15
  },
  moduleSubTitle:    {
    paddingHorizontal: 15,
    color:             styles.colorDesc
  },
  paddingHorizontal: {
    paddingHorizontal: 15
  },
  menuIconBox:       {
    backgroundColor: styles.colorMain
  }
})
