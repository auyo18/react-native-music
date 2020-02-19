import React            from 'react'
import PropTypes        from 'prop-types'
import * as VectorIcons from '@expo/vector-icons'

export default function Iconfont({
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
}

Iconfont.propTypes = {
  Icons: PropTypes.func,
  name:  PropTypes.string.isRequired,
  style: PropTypes.string,
  size:  PropTypes.string,
  color: PropTypes.string,
}
