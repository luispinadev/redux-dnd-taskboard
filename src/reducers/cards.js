import { Map } from 'immutable'
import { handleActions } from 'redux-actions'

import { CARD_CREATE, CARD_DELETE } from 'constants/actionTypes'
import { Card } from 'records'


export default handleActions({
  [CARD_CREATE]: (state, { payload }) => state.set(payload.id, new Card(payload) ),
  [CARD_DELETE]: (state, { payload }) => state.delete(payload.id)
}, Map() )

