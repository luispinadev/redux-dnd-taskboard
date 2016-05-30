import { List } from 'immutable'
import { handleActions } from 'redux-actions'

import { BOARD_CREATE, BOARD_DELETE } from 'constants/actionTypes'

// List of boards

export default handleActions({
  [BOARD_CREATE]: (state, { payload }) => payload.hasOwnProperty('index') ?
    state.insert(payload.index, payload.boardID) :
    state.push(payload.boardID),
  [BOARD_DELETE]: (state, { payload }) => state.delete(state.indexOf(payload.boardID))
}, List() )

