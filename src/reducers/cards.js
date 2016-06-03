import { Map } from 'immutable'
import { handleActions } from 'redux-actions'

import { APP_LOAD_SUCCESS, CARD_CREATE, CARD_DELETE, CARD_EDIT } from 'constants/actionTypes'
import { Card } from 'records'

export default handleActions({
  [APP_LOAD_SUCCESS]: (state, {payload}) => payload.cards.reduce( (s, c) => s.set( c.cardID, new Card(c) ), state ),
  [CARD_CREATE]: (state, { payload }) => state.set(payload.cardID, new Card(payload) ),
  [CARD_DELETE]: (state, { payload }) => state.delete(payload.cardID),
  [CARD_EDIT]: (state, { payload }) => state.updateIn([payload.cardID], c => c.set('text', payload.text))
}, Map() )

