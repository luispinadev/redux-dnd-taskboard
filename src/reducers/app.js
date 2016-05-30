import { Map } from 'immutable'
import { handleActions } from 'redux-actions'

import { APP_START_DRAG, APP_END_DRAG } from 'constants/actionTypes'
import { DraggingCard } from 'records'

export default handleActions({
  [APP_START_DRAG]: (state, { payload }) => state.set('draggingCard', new DraggingCard(payload) ),
  [APP_END_DRAG]: state => state.set('draggingCard', null)
}, Map({ draggingCard: null }) )

