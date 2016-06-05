import { createAction } from 'redux-actions'
import * as actionTypes from 'constants/actionTypes'
import uuid from 'uuid'

// ------------------------------------------------------------------------------
// Helpers

// Payload default id creator: sets a unique id (named idAttribute) if 'payload' does not provide an 'id' value
// This is used for synchronous create actions, and for testability
export const idGenHelper = (idAttribute) => 
  ( { [idAttribute]: id = uuid.v1(), ...args } = {} ) => ({ [idAttribute]: id, ...args})


// ------------------------------------------------------------------------------
// Action creators


// ------------------------------------------------------------------------------
// App
// ------------------------------------------------------------------------------

// Initial data loading
export const appLoadRequest = createAction(actionTypes.APP_LOAD_REQUEST)
export const appLoadSuccess = createAction(actionTypes.APP_LOAD_SUCCESS)
export const appLoadFailure = createAction(actionTypes.APP_LOAD_FAILURE)

// Drag and drop state
export const startDrag = createAction(actionTypes.APP_START_DRAG)
export const endDrag = createAction(actionTypes.APP_END_DRAG)


// ------------------------------------------------------------------------------
// Board
// ------------------------------------------------------------------------------

// Synchronous actions (will be deprecated once async ops are implemented)
export const createBoard = createAction(actionTypes.BOARD_CREATE, idGenHelper('boardID') )
export const deleteBoard = createAction(actionTypes.BOARD_DELETE)
export const setBoardTitle = createAction(actionTypes.BOARD_SET_TITLE)


// ------------------------------------------------------------------------------
// Card
// ------------------------------------------------------------------------------

// Card creation
export const createCardRequest = createAction(actionTypes.CARD_CREATE_REQUEST, idGenHelper('cardID'))
export const createCardSuccess = createAction(actionTypes.CARD_CREATE_SUCCESS)
export const createCardFailure = createAction(actionTypes.CARD_CREATE_FAILURE)

// Card deletion
export const deleteCardRequest = createAction(actionTypes.CARD_DELETE_REQUEST)
export const deleteCardSuccess = createAction(actionTypes.CARD_DELETE_SUCCESS)
export const deleteCardFailure = createAction(actionTypes.CARD_DELETE_FAILURE)

// Card move
export const moveCardRequest = createAction(actionTypes.CARD_MOVE_REQUEST)
export const moveCardSuccess = createAction(actionTypes.CARD_MOVE_SUCCESS)
export const moveCardFailure = createAction(actionTypes.CARD_MOVE_FAILURE)

// Card edit
export const editCardRequest = createAction(actionTypes.CARD_EDIT_REQUEST)
export const editCardSuccess = createAction(actionTypes.CARD_EDIT_SUCCESS)
export const editCardFailure = createAction(actionTypes.CARD_EDIT_FAILURE)


