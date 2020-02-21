import React, { memo }  from 'react'
import PropTypes        from 'prop-types'
import * as VectorIcons from '@expo/vector-icons'

const Iconfont = memo(function ({
  Icons = VectorIcons.AntDesign,
  name,
  style,
  size = 20,
  color
}) {
  return (
    <Icons
      style={[
        {
          height:     size,
          lineHeight: size
        },
        style
      ]}
      name={name}
      size={size}
      color={color}
    />
  )
})

Iconfont.propTypes = {
  Icons: PropTypes.func,
  name:  PropTypes.string.isRequired,
  style: PropTypes.string,
  size:  PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
}

export default Iconfont
