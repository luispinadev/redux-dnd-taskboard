import { List, Map } from 'immutable'
import { handleActions } from 'redux-actions'

import { CARD_CREATE, CARD_DELETE, BOARD_CREATE, BOARD_DELETE } from 'constants/actionTypes'

export default handleActions({
  [CARD_CREATE]: (state, { payload }) =>
    state.updateIn([payload.boardID], l => 
      payload.hasOwnProperty('index') ? 
        l.insert(payload.index, payload.id) : l.push(payload.id)
    ),
  [CARD_DELETE]: (state, { payload }) =>
    state.updateIn([payload.boardID], l => 
      l.delete(l.indexOf(payload.id))
    ),
  [BOARD_CREATE]: (state, { payload }) => state.set(payload.id, List() ),
  [BOARD_DELETE]: (state, { payload }) => state.delete(payload.id)
}, Map() )

