import { combineReducers } from 'redux-immutablejs'

import dashboard from './dashboard'
import boards from './boards'
import cards from './cards'
import cardsByBoard from './cardsByBoard'

export default combineReducers({
  dashboard,
  boards,
  cards,
  cardsByBoard
})
