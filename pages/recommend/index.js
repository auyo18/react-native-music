import React, {
  useEffect,
  useCallback
}                       from 'react'
import {
  Text,
  ScrollView,
}                       from 'react-native'
import {
  Iconfont,
  Header
}                       from '../../components'
import {
  HOME_MENU,
}                       from '../../constants'
import { connect }      from 'react-redux'
import { setBanner }    from '../../store'
import { getRecommend } from '../../api'
import * as styles      from '../../styles'

const {
        Recommend: RecommendMenu
      }     = HOME_MENU
const title = RecommendMenu.name

function Recommend({
  banners,
  setBanner
}) {
  console.log('banners',banners)
  const getData = useCallback(async () => {
    const { response: { focus: { data: { content } } } } = await getRecommend()
    setBanner(content)
  }, [setBanner])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <>
      <Header title={title}/>
      <ScrollView style={{ backgroundColor: styles.full_base }}>
        <Text>
          Recommend
        </Text>
        <Text>
          Recommend
        </Text>
        <Text>
          Recommend
        </Text>
        <Text>
          Recommend
        </Text>
        <Text>
          Recommend
        </Text>
        <Text>
          Recommend
        </Text>
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
  banners: state.recommend.banners
})
const mapDispatchToProps = dispatch => ({
  setBanner(banners) {
    dispatch(setBanner(banners))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Recommend)
