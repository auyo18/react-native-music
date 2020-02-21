export const ACTION_SET_AUDIO         = 'SET_AUDIO'
export const ACTION_SET_PLAYING       = 'SET_PLAYING'
export const ACTION_SET_PLAYLIST      = 'SET_PLAYLIST'
export const ACTION_SET_SEQUENCE_LIST = 'SET_SEQUENCE_LIST'
export const ACTION_SET_MODE          = 'SET_MODE'
export const ACTION_SET_CURRENT_INDEX = 'SET_CURRENT_INDEX'
export const ACTION_SET_CURRENT_ID    = 'SET_CURRENT_ID'
export const ACTION_SET_LOADED        = 'SET_LOADED'

export const setAudio = audio => ({
  type:    ACTION_SET_AUDIO,
  payload: audio
})

export const setPlaying = playing => ({
  type:    ACTION_SET_PLAYING,
  payload: playing
})

export const setPlaylist = playlist => ({
  type:    ACTION_SET_PLAYLIST,
  payload: playlist
})

export const setSequenceList = sequenceList => ({
  type:    ACTION_SET_SEQUENCE_LIST,
  payload: sequenceList
})

export const setMode         = mode => ({
  type:    ACTION_SET_MODE,
  payload: mode
})

export const setCurrentIndex = currentIndex => ({
  type:    ACTION_SET_CURRENT_INDEX,
  payload: currentIndex
})

export const setCurrentId = currentId => ({
  type:    ACTION_SET_CURRENT_ID,
  payload: currentId
})

export const setLoaded = loaded => ({
  type:    ACTION_SET_LOADED,
  payload: loaded
})
