import React, { memo }                        from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  FlatList
}                                             from 'react-native'
import * as styles                            from '../../styles'
import { Iconfont }                           from '../index'
import { FontAwesome }                        from '@expo/vector-icons'
import PropTypes                              from 'prop-types'
import { useSong }                            from '../../hooks'
import { setCurrentIndex, setPlaylist }       from '../../store'
import { connect }                            from 'react-redux'
import { Fade, Placeholder, PlaceholderLine } from 'rn-placeholder'

const Item = memo(function ({
  cover,
  name,
  singer,
  index,
  onSelect
}) {
  return (
    <TouchableOpacity
      style={{
        flexDirection:  'row',
        justifyContent: 'space-between',
        alignItems:     'center',
        marginVertical: 5
      }}
      onPress={() => onSelect(index)}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, paddingRight: 80 }}>
        <Image
          source={{ uri: cover + '?param=100y100' }}
          style={{ width: 60, height: 60, marginRight: 10, borderRadius: 5, backgroundColor: styles.colorDesc }}
        />
        <View>
          <Text>{name}</Text>
          <Text style={{ color: styles.colorDesc, marginTop: 5 }}>{singer}</Text>
        </View>
      </View>
      <Iconfont Icons={FontAwesome} name='play-circle' color={styles.colorDesc}/>
    </TouchableOpacity>
  )
})

Item.propTypes = {
  id:       PropTypes.number.isRequired,
  cover:    PropTypes.string.isRequired,
  name:     PropTypes.string.isRequired,
  singer:   PropTypes.string.isRequired,
  index:    PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
}

const MusicList = memo(function ({
  list,
  setPlaylist,
  setCurrentIndex
}) {
  const { setPlayer } = useSong({ list: list, setPlaylist, setCurrentIndex })

  return (
    list.length ?
      <FlatList
        data={list}
        keyExtractor={item => item.id + ''}
        renderItem={({ item, index }) => (
          <Item
            key={item.id}
            id={item.id}
            cover={item.image}
            name={item.name}
            singer={item.singer}
            index={index}
            onSelect={() => setPlayer(index)}
          />
        )}
      /> :
      <Placeholder Animation={Fade}>
        <PlaceholderLine width={70}/>
        <PlaceholderLine width={50}/>
        <PlaceholderLine width={80}/>
        <PlaceholderLine width={30}/>
        <PlaceholderLine width={70}/>
        <PlaceholderLine width={50}/>
        <PlaceholderLine width={80}/>
        <PlaceholderLine width={30}/>
        <PlaceholderLine width={70}/>
        <PlaceholderLine width={50}/>
        <PlaceholderLine width={80}/>
        <PlaceholderLine width={30}/>
        <PlaceholderLine width={70}/>
        <PlaceholderLine width={50}/>
        <PlaceholderLine width={80}/>
        <PlaceholderLine width={30}/>
      </Placeholder>
  )
})

MusicList.propTypes = {
  list: PropTypes.array.isRequired,
}

const mapDispatchToProps = dispatch => ({
  setPlaylist(p) {
    dispatch(setPlaylist(p))
  },
  setCurrentIndex(i) {
    dispatch(setCurrentIndex(i))
  },
})

export default connect(null, mapDispatchToProps)(MusicList)
