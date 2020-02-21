import Navigation                       from '../utils/navigation'

const useSong = function ({
  list,
  setPlaylist,
  setCurrentIndex
}) {
  const setPlayer = index => {
    setPlaylist(list)
    setCurrentIndex(index)
    Navigation.goPage('Player')
  }

  return { setPlayer }
}

export default useSong
