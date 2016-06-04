import { Map } from 'immutable'
import { handleActions } from 'redux-actions'

import { 
  APP_LOAD_SUCCESS, 
  CARD_CREATE_REQUEST, CARD_CREATE_SUCCESS, CARD_CREATE_FAILURE,
  CARD_DELETE_REQUEST, CARD_DELETE_SUCCESS, CARD_DELETE_FAILURE,
  CARD_MOVE_REQUEST, CARD_MOVE_FAILURE, CARD_MOVE_SUCCESS,
  CARD_EDIT } from 'constants/actionTypes'
import { Card } from 'records'

// ------------------------------------------------------------------------------
// Util
// ------------------------------------------------------------------------------

const setPending = (state, cardID, pending) => state.updateIn([cardID], c => c.set('pending', pending))

// ------------------------------------------------------------------------------
// Reducer
// ------------------------------------------------------------------------------

export default handleActions({
  [APP_LOAD_SUCCESS]: (state, {payload}) => payload.cards.reduce( (s, c) => s.set( c.cardID, new Card(c) ), state ),
  
  
  [CARD_CREATE_REQUEST]: (state, { payload }) => state.set(payload.cardID, new Card({pending: true, ...payload}) ),
  [CARD_CREATE_SUCCESS]: (state, { payload }) => setPending(state, payload.cardID, false),
  [CARD_CREATE_FAILURE]: (state, { payload }) => state.delete(payload.cardID),

  [CARD_DELETE_REQUEST]: (state, { payload }) => setPending(state, payload.cardID, true),
  [CARD_DELETE_SUCCESS]: (state, { payload }) => state.delete(payload.cardID),
  [CARD_DELETE_FAILURE]: (state, { payload }) => setPending(state, payload.cardID, false),

  [CARD_MOVE_REQUEST]: (state, { payload }) => setPending(state, payload.cardID, true),
  [CARD_MOVE_SUCCESS]: (state, { payload }) => setPending(state, payload.cardID, false),
  [CARD_MOVE_FAILURE]: (state, { payload }) => setPending(state, payload.cardID, false),
  
  [CARD_EDIT]: (state, { payload }) => state.updateIn([payload.cardID], c => c.set('text', payload.text))
}, Map() )

