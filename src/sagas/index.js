import { takeLatest, takeEvery } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'
import Api from 'api'
import {
  APP_LOAD_SUCCESS, APP_LOAD_FAILURE, APP_LOAD_REQUEST
} from 'constants/actionTypes'
import { appLoadSuccess, appLoadFailure } from 'actions'


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
    yield put(appLoadSuccess( { ...payload, cards: cardData } ))
  } catch (err) {
    if (err.type !== 'MANUAL_CANCEL') yield put(appLoadFailure( err.type ))
    console.error(err)
  }
}

// export function* putCardMove(action) {
//   try {

//     const response = yield call(Api.moveCards, action.payload)
//     yield put({ type: CARD_MOVE_SUCCESS, payload: response })

//   } catch (err) {

//     console.warn('ERROR: '+err.type, err.errorDump)
//     yield put({ type: CARD_MOVE_FAILURE, payload: err.payload })

//   }
// }

// ------------------------------------------------------------------------------ 
// Watchers
// ------------------------------------------------------------------------------ 


function* watchFetchAppData() {
  yield* takeLatest(APP_LOAD_REQUEST, fetchAppData)
}

// function* watchBoardCreate() {
//   yield* takeEvery(CARD_MOVE_REQUEST, putCardMove)
// }

// function* watchCardMove() {
//   yield* takeEvery(CARD_MOVE_REQUEST, putCardMove)
// }


export default function* root() {
  yield [
    fork(watchFetchAppData)
    // fork(watchCardMove)
  ]
}
