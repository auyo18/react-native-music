import React        from 'react'
import { View }     from 'react-native'
import Navigator    from './navigations'
import { Provider } from 'react-redux'
import { store }    from './store'


export default function App() {
  // 关闭全部黄色警告
  console.disableYellowBox = true

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <Navigator/>
      </View>
    </Provider>
  )
}
