import React, { memo } from 'react'
import { View }        from 'react-native'
import PropTypes       from 'prop-types'

const Mask = memo(function ({
  opacity = .2
}) {
  return (
    <View
      style={{
        position:        'absolute',
        top:             0,
        bottom:          0,
        left:            0,
        right:           0,
        backgroundColor: `rgba(0,0,0,${opacity})`
      }}
    />
  )
})

Mask.propTypes = {
  opacity: PropTypes.number
}

export default Mask
