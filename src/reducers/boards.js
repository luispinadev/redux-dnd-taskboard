import { Map } from 'immutable'
import { handleActions } from 'redux-actions'

import { BOARD_CREATE, BOARD_DELETE } from 'constants/actionTypes'
import { Board } from 'records'


export default handleActions({
  [BOARD_CREATE]: (state, { payload }) => state.set(payload.boardID, new Board(payload) ),
  [BOARD_DELETE]: (state, { payload }) => state.delete(payload.boardID)
}, Map() )

