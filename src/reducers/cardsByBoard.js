import { List, Map, fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import compose from 'recompose/compose' // Usualy I'd use lodash's implementation, but I'm already using this one in lots of places

import { 
  APP_LOAD_SUCCESS,
  CARD_CREATE_REQUEST, CARD_CREATE_FAILURE,
  CARD_DELETE, CARD_MOVE, BOARD_CREATE, BOARD_DELETE } from 'constants/actionTypes'

// ------------------------------------------------------------------------------
// Composable helpers
// ------------------------------------------------------------------------------

// if the dataset were large, we could build something like this for a lazy filtering api (or 'skip'):
//  state.updateIn([origID], l => Seq.of(...l).filter( id => id !== cardID ).toList() )
const removeCardFromOrigin = ({ cardID, origID, state, ...rest }) => ({
  state: state.updateIn([origID], l => l.delete(l.indexOf(cardID)) ), cardID, origID, ...rest 
})
const addCardToBottom = ({cardID, destID, state, ...rest}) => ({
  state: state.updateIn([destID], l => l.push(cardID)), cardID, destID, ...rest
})
const addCardToIndex = ({cardID, destID, index, state, ...rest}) => ({
  state: state.updateIn([destID], l => l.insert(index, cardID)), cardID, destID, index, ...rest
})
const deleteCardFromBoard = ({ cardID, boardID, state, ...rest }) => ({
  state: state.updateIn([boardID], l => l.delete(l.indexOf(cardID)) ), cardID, boardID, ...rest 
})

// ------------------------------------------------------------------------------
// Reducer
// ------------------------------------------------------------------------------

export default handleActions({
  [APP_LOAD_SUCCESS]: (state, { payload }) =>  fromJS(payload.cardsByBoard),

  [CARD_CREATE_REQUEST]: (state, { payload }) =>
    state.updateIn([payload.boardID], l => 
      payload.hasOwnProperty('index') ? 
        l.insert(payload.index, payload.cardID) : l.unshift(payload.cardID)
    ),
  [CARD_CREATE_FAILURE]: (state, { payload }) => deleteCardFromBoard({ state, ...payload }).state,

  [CARD_DELETE]: (state, { payload }) => deleteCardFromBoard({ state, ...payload }).state,

  [CARD_MOVE]: (state, { payload }) =>
    payload.hasOwnProperty('index') ?
      compose(addCardToIndex, removeCardFromOrigin)({ state, ...payload }).state :
      compose(addCardToBottom, removeCardFromOrigin)({ state, ...payload }).state
  ,
  [BOARD_CREATE]: (state, { payload }) => state.set(payload.boardID, List() ),
  [BOARD_DELETE]: (state, { payload }) => state.delete(payload.boardID)
}, Map() )

