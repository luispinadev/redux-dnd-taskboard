import { takeLatest, takeEvery } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'
import * as Api from 'api'
import { 
  APP_LOAD_REQUEST, CARD_CREATE_REQUEST, CARD_DELETE_REQUEST, CARD_MOVE_REQUEST
} from 'constants/actionTypes'
import * as actionCreators from 'actions'


// ------------------------------------------------------------------------------ 
// Subroutines
// ------------------------------------------------------------------------------ 

// Load (in parallel) boards + cards data so full app state is built
// if one of the calls fail, APP_LOAD_FAILURE will be dispached (and pending calls, if any,  will be canceled)

export function* fetchAppData() {
  try {
    const [boardData, cardData]  = yield [
      call(Api.getBoards),
      call(Api.getCards)
    ]

    // Build payload merging both data sources
    const payload = boardData.reduce(
      (prev, cur) => {
        prev.dashboard.push(cur.boardID)
        prev.boards.push({ boardID: cur.boardID, title: cur.title })
        prev.cardsByBoard[cur.boardID] = cur.cards
        return prev
      }, { cardsByBoard: {}, boards: [], dashboard: [] }
    )
    yield put(actionCreators.appLoadSuccess( { ...payload, cards: cardData } ))
  } catch (err) {
    if (err.type !== 'MANUAL_CANCEL') {
      console.warn(err)
      yield put(actionCreators.appLoadFailure( err.type ))
    }
  }
}

// Util handler:
// In most of the calls, the dummy API returns the provided payload after a delay, so we are using a generic handler
// In a real world app, each response would probably have some specific response handling implemented
export function* identityPutRoutine(action, apiCall, success, failure){
  try {

    const response = yield call(apiCall, action.payload)
    yield put( success(response) )

  } catch (err) {

    console.warn('ERROR: '+action)
    yield put( failure(err) )

  }
}

export function* createCard(action){
  yield identityPutRoutine(action, Api.createCard, actionCreators.createCardSuccess, actionCreators.createCardFailure)
}

export function* deleteCard(action) {
  yield identityPutRoutine(action, Api.deleteCard, actionCreators.deleteCardSuccess, actionCreators.deleteCardFailure)
}

export function* moveCard(action) {
  yield identityPutRoutine(action, Api.moveCard, actionCreators.moveCardSuccess, actionCreators.moveCardFailure)
}

// ------------------------------------------------------------------------------ 
// Watchers
// ------------------------------------------------------------------------------ 

// Note: If a new request is issued, the previous should be cancelled, so using takeLatest
function* watchFetchAppData() {
  yield* takeLatest(APP_LOAD_REQUEST, fetchAppData)
}

// Note: all of these are non blocking, so using takeEvery.
// if we wanted to make blocking calls, we could use a while(true){ take(ACTION_TYPE, subroutine) }
function* watchCreateCard() {
  yield* takeEvery(CARD_CREATE_REQUEST, createCard)
}

function* watchDeleteCard() {
  yield* takeEvery(CARD_DELETE_REQUEST, deleteCard)
}

function* watchMoveCard() {
  yield* takeEvery(CARD_MOVE_REQUEST, moveCard)
}


export default function* root() {
  yield [
    fork(watchFetchAppData),
    fork(watchCreateCard),
    fork(watchDeleteCard),
    fork(watchMoveCard)
  ]
}
