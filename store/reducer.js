import { combineReducers }   from 'redux'
import { recommend, player } from './index'

const reducer = combineReducers({
  recommend,
  player
})

export default reducer
