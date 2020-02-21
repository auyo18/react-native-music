import React, {
  memo,
  useMemo
}                    from 'react'
import { handleNum } from '../../utils'
import {
  Image,
  Text,
  View,
  TouchableOpacity
}                    from 'react-native'
import * as styles   from '../../styles'
import { Iconfont }  from '../index'
import { Feather }   from '@expo/vector-icons'
import PropTypes     from 'prop-types'
import Navigation    from '../../utils/navigation'

const PlaylistItem = memo(function ({
  id,
  cover,
  title,
  number
}) {
  const formalNum = useMemo(() => handleNum(number), [number])

  const onSelect = () => {
    Navigation.goPage('Playlist', { id })
  }

  return (
    <TouchableOpacity
      style={{ width: '32%', marginVertical: 10, }}
      onPress={onSelect}
    >
      <View style={{ borderRadius: 5, overflow: 'hidden' }}>
        <Image
          source={{ uri: cover + '?param=300y300' }}
          style={{ width: '100%', paddingTop: '100%', backgroundColor: styles.colorDesc }}
        />

        <View
          style={{
            flexDirection:  'row',
            position:       'absolute',
            top:            0,
            left:           0,
            width:          '100%',
            padding:        5,
            alignItems:     'center',
            justifyContent: 'flex-end',
          }}>
          <Iconfont Icons={Feather} name='play' color='white' size={10}/>
          <Text
            style={{
              color:    'white',
              fontSize: styles.font_size_small,
            }}
          >{formalNum}</Text>
        </View>
      </View>
      <Text
        numberOfLines={2}
        style={{ marginTop: 5, color: styles.colorSub }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
})

PlaylistItem.propTypes = {
  id:     PropTypes.number.isRequired,
  cover:  PropTypes.string.isRequired,
  title:  PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
}

export default PlaylistItem
