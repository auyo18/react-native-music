import React, { memo } from 'react'
import { Iconfont }    from '../index'
import { TouchableOpacity } from 'react-native'
import * as styles          from '../../styles'
import Navigation           from '../../utils/navigation'
import PropTypes            from 'prop-types'

const LeftBackButton=memo(function ({
  name = 'left',
  color = styles.colorBase,
  navigation,
  style,
  onBack = () => {
    Navigation.goBack(navigation)
  },
}) {
  return (
    <TouchableOpacity
      style={[{ padding: 8 }, style]}
      onPress={onBack}
    >
      <Iconfont name={name} color={color} size={25}/>
    </TouchableOpacity>
  )
})

LeftBackButton.propTypes = {
  name:       PropTypes.string,
  color:      PropTypes.string,
  navigation: PropTypes.object.isRequired,
  style:      PropTypes.string,
  onBack:     PropTypes.func,
}

export default LeftBackButton
