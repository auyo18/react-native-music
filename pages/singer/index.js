import React          from 'react'
import { Text, View } from 'react-native'
import { Iconfont }   from '../../components'
import { HOME_MENU }  from '../../constants'

const {
        Singer: SingerMenu
      }     = HOME_MENU
const title = SingerMenu.name

function Singer() {
  return (
    <View>
      <Text>
        Singer
      </Text>
    </View>
  )
}

Singer.navigationOptions = {
  headerShown: false,
  tabBarIcon:  ({ tintColor }) => <Iconfont Icons={SingerMenu.Icons} name={SingerMenu.icon} color={tintColor}/>,
  tabBarLabel: title
}

export default Singer
