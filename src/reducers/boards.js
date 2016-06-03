import { Map } from 'immutable'
import { handleActions } from 'redux-actions'

import { APP_LOAD_SUCCESS, BOARD_CREATE, BOARD_DELETE } from 'constants/actionTypes'
import { Board } from 'records'


export default handleActions({
  [APP_LOAD_SUCCESS]: (state, {payload}) => payload.boards.reduce( (s, b) => s.set( b.boardID, new Board(b) ), state ),
  [BOARD_CREATE]: (state, { payload }) => state.set(payload.boardID, new Board(payload) ),
  [BOARD_DELETE]: (state, { payload }) => state.delete(payload.boardID)
}, Map() )

