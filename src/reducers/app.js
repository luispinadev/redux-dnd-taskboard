import { Map } from 'immutable'
import { handleActions } from 'redux-actions'

import { APP_START_DRAG, APP_END_DRAG } from 'constants/actionTypes'
import { DraggingCard } from 'records'

export default handleActions({
  [APP_START_DRAG]: (state, { payload }) => state.set('dragData', new DraggingCard(payload) ).set('isDragging', true),
  [APP_END_DRAG]: state => state.set('isDragging', false)
}, Map({ isDragging: false, dragData: new DraggingCard() }) )

