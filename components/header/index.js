import React                 from 'react'
import {
  View,
  Text,
  StyleSheet
}                            from 'react-native'
import {
  StatusBarEvents,
  Iconfont
}                            from '../index'
import PropTypes             from 'prop-types'
import { STATUS_BAR_HEIGHT } from '../../constants'
import * as styles           from '../../styles'

function Header({
  title
}) {
  return (
    <View style={{ backgroundColor: styles.full_base }}>
      <View style={{ height: STATUS_BAR_HEIGHT }}>
        <StatusBarEvents/>
      </View>
      <View style={_style.header}>
        <Text style={{ fontSize: styles.font_size_default * 1.5, fontWeight: 'bold', marginRight: 10 }}>
          {title}
        </Text>
        <View style={_style.search}>
          <Iconfont name='search1' color={styles.colorSub}/>
          <Text style={{ color: styles.colorSub, textAlign: 'center' }}>
            搜索
          </Text>
        </View>
      </View>
    </View>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header

const _style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding:       10,
    alignItems:    'center'
  },
  search: {
    flexDirection:   'row',
    flex:            1,
    backgroundColor: styles.full_light,
    height:          35,
    alignItems:      'center',
    justifyContent:  'center',
    borderRadius:    100,
  }
})
