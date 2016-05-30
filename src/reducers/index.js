import { combineReducers } from 'redux-immutablejs'

import app from './app'
import dashboard from './dashboard'
import boards from './boards'
import cards from './cards'
import cardsByBoard from './cardsByBoard'

export default combineReducers({
  app,
  dashboard,
  boards,
  cards,
  cardsByBoard
})
