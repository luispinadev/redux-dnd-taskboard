import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

// import initialState from 'constants/initialState'
import rootReducer from 'reducers'
import rootSaga from 'sagas'


const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, compose(
  applyMiddleware(
    sagaMiddleware
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

// run saga
sagaMiddleware.run(rootSaga)

// const store = createStore(rootReducer,
//   window.devToolsExtension ? window.devToolsExtension() : f => f
// )


// HMR
if (module.hot){
  module.hot.accept()
  module.hot.accept('reducers', () => {
    const nextRootReducer = require('reducers').default
    store.replaceReducer(nextRootReducer)
  })
}



export default store
