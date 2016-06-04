import { takeLatest, takeEvery } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'
import * as Api from 'api'
import { 
  APP_LOAD_REQUEST,
  CARD_CREATE_REQUEST,
  CARD_DELETE_REQUEST
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

export function* createCard(action) {
  try {

    const response = yield call(Api.createCard, action.payload)
    yield put( actionCreators.createCardSuccess(response) )

  } catch (err) {

    console.warn('ERROR: '+action)
    yield put( actionCreators.createCardFailure(err) )

  }
}

export function* deleteCard(action) {
  try {

    const response = yield call(Api.deleteCard, action.payload)
    yield put( actionCreators.deleteCardSuccess(response) )

  } catch (err) {

    console.warn('ERROR: '+action)
    yield put( actionCreators.deleteCardFailure(err) )

  }
}

// ------------------------------------------------------------------------------ 
// Watchers
// ------------------------------------------------------------------------------ 


function* watchFetchAppData() {
  yield* takeLatest(APP_LOAD_REQUEST, fetchAppData)
}

function* watchCreateCard() {
  yield* takeEvery(CARD_CREATE_REQUEST, createCard)
}

function* watchDeleteCard() {
  yield* takeEvery(CARD_DELETE_REQUEST, deleteCard)
}

// function* watchCardMove() {
//   yield* takeEvery(CARD_MOVE_REQUEST, putCardMove)
// }


export default function* root() {
  yield [
    fork(watchFetchAppData),
    fork(watchCreateCard),
    fork(watchDeleteCard)
  ]
}
