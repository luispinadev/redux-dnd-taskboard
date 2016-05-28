import { createAction } from 'redux-actions'
import * as actionTypes from 'constants/actionTypes'
import uuid from 'uuid'

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

// Payload creator: sets a unique id if 'payload' does not provide an 'id' value
export const idGenHelper = ( { id = uuid.v1(), ...args } = {} ) => ({ id, ...args})

// ------------------------------------------------------------------------------
// Action creators
// ------------------------------------------------------------------------------

// App Load
// export const appLoadRequest = createAction(actionTypes.APP_LOAD_REQUEST)
// export const appLoadSuccess = createAction(actionTypes.APP_LOAD_SUCCESS)
// export const appLoadFailure = createAction(actionTypes.APP_LOAD_FAILURE)

// Board
export const createBoard = createAction(actionTypes.BOARD_CREATE, idGenHelper )
export const deleteBoard = createAction(actionTypes.BOARD_DELETE)
export const setBoardTitle = createAction(actionTypes.BOARD_SET_TITLE)

// Card
export const createCard = createAction(actionTypes.CARD_CREATE, idGenHelper)
export const deleteCard = createAction(actionTypes.CARD_DELETE)

// Card Move
// export const cardMove = createAction(actionTypes.CARD_MOVE)
// export const cardMoveRequest = createAction(actionTypes.CARD_MOVE_REQUEST)
// export const cardMoveToBottomRequest = createAction(actionTypes.CARD_MOVE_TO_BOTTOM_REQUEST)
// export const cardMoveSuccess = createAction(actionTypes.CARD_MOVE_SUCCESS)
// export const cardMoveFailure = createAction(actionTypes.CARD_MOVE_FAILURE)

// Card Selection
// export const cardUnselectMultiple = createAction(actionTypes.CARD_UNSELECT_MULTIPLE)
// export const cardToggleSelect = createAction(actionTypes.CARD_TOGGLE_SELECT)
// export const cardClearSelection = createAction(actionTypes.CARD_CLEAR_SELECTION)

// Card dragged
// export const cardSetDragged = createAction(actionTypes.CARD_SET_DRAGGED)
// export const cardClearDragged = createAction(actionTypes.CARD_CLEAR_DRAGGED)

