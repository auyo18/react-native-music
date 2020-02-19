import React          from 'react'
import { View, Text } from 'react-native'
import { Iconfont }   from '../../components'
import { HOME_MENU }  from '../../constants'

const {
        Rank: RankMenu
      }     = HOME_MENU
const title = RankMenu.name

function Rank() {
  return (
    <View>
      <Text>
        Rank
      </Text>
    </View>
  )
}

Rank.navigationOptions = {
  headerShown: false,
  tabBarIcon:  ({ tintColor }) => <Iconfont Icons={RankMenu.Icons} name={RankMenu.icon} color={tintColor}/>,
  tabBarLabel: title
}

export default Rank
