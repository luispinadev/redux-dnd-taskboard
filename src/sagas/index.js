import { takeLatest, takeEvery } from 'redux-saga'
import { call, fork, put } from 'redux-saga/effects'
// import Api from 'api'
// import { 
//   APP_LOAD_REQUEST, APP_LOAD_SUCCESS, APP_LOAD_FAILURE,
//   CARD_MOVE_REQUEST, CARD_MOVE_SUCCESS, CARD_MOVE_FAILURE
// } from 'constants/actionTypes'


// ------------------------------------------------------------------------------ 
// Subroutines
// ------------------------------------------------------------------------------ 

// Load (in parallel) account + card data so full app state is built
// if one of the calls fail, APP_LOAD_FAILURE will be dispached (and pending calls, if any,  will be canceled)

export function* fetchAppData() {
  try {
  
    const [accountData, cardData]  = yield [
      call(Api.getAccountData),
      call(Api.getCardData)
    ]

    yield put({ type: APP_LOAD_SUCCESS, payload: accountData.mergeDeep(cardData) })
  
  } catch (err) {
  
    if (err.type !== 'MANUAL_CANCEL') yield put({ type: APP_LOAD_FAILURE, payload: err.type })
    console.error(err)
  }
}

export function* putCardMove(action) {
  try {

    const response = yield call(Api.moveCards, action.payload)
    yield put({ type: CARD_MOVE_SUCCESS, payload: response })

  } catch (err) {

    console.warn('ERROR: '+err.type, err.errorDump)
    yield put({ type: CARD_MOVE_FAILURE, payload: err.payload })

  }
}

// ------------------------------------------------------------------------------ 
// Watchers
// ------------------------------------------------------------------------------ 


function* watchFetchAppData() {
  yield* takeLatest(APP_LOAD_REQUEST, fetchAppData)
}

function* watchCardMove() {
  yield* takeEvery(CARD_MOVE_REQUEST, putCardMove)
}


export default function* root() {
  yield [
    fork(watchFetchAppData),
    fork(watchCardMove)
  ]
}
