import { Map } from 'immutable'
import { handleActions } from 'redux-actions'

import { APP_START_DRAG, APP_END_DRAG, APP_LOAD_REQUEST, APP_LOAD_SUCCESS, APP_LOAD_FAILURE } from 'constants/actionTypes'
import { DraggingCard } from 'records'

export default handleActions({

  [APP_LOAD_REQUEST]: state => state.set('isLoading', true),

  [APP_LOAD_SUCCESS]: state => state.set('isLoading', false),

  [APP_LOAD_FAILURE]: state => state.set('isLoading', false),

  [APP_START_DRAG]: (state, { payload }) => state.set('dragData', new DraggingCard(payload) ).set('isDragging', true),
  
  [APP_END_DRAG]: state => state.set('isDragging', false)

}, Map({ isLoading: true, isDragging: false, dragData: new DraggingCard() }) )

