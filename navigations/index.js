import { createStackNavigator } from 'react-navigation-stack'
import {
  createAppContainer,
  getActiveChildNavigationOptions
}                               from 'react-navigation'
import {
  createBottomTabNavigator
}                               from 'react-navigation-tabs'
import {
  Recommend,
  Singer,
  Rank,
  Search,
  Player,
  Playlist,
}                               from '../pages'
import { initialHomeTabName }   from '../constants'
import * as styles              from '../styles'

const HomeTab = createBottomTabNavigator({
    Recommend,
    Singer,
    Rank,
    Search,
  },
  {
    initialRouteName:  initialHomeTabName,
    navigationOptions: ({ navigation, screenProps }) =>
                         getActiveChildNavigationOptions(navigation, screenProps),
    tabBarOptions:     {
      activeTintColor:   styles.colorMain,
      inactiveTintColor: styles.colorSub,
      style:             {
        borderTopColor: '#eeeeee',
      }
    }
  })

const MainNavigator = createStackNavigator({
  Home: HomeTab,
  Player,
  Playlist

}, {
  defaultNavigationOptions: {
    headerShown:            false,
    headerTitleAlign:       'center',
    headerBackTitleVisible: false,
    gestureEnabled:         true // 安卓开启手势退后
  }
})

export default createAppContainer(MainNavigator)
