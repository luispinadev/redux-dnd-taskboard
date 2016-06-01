import * as actionTypes from 'constants/actionTypes'
// import Api from 'api'
import { Map } from 'immutable'
import { put, call } from 'redux-saga/effects'
// import { fetchAppData } from 'sagas'

describe('Sagas::', function(){

  let generator
  let output
  let dummyData


  describe('fetchAppData', function(){

    // it('yields parallel calls to api getAccountData and getCardata', function(){
    //   generator = fetchAppData()
    //   output = generator.next().value
    //   expect( output ).to.deep.equal( [call(Api.getAccountData), call(Api.getCardata)] )  
    // })

    // it('creates full app state on APP_LOAD_SUCCESS')

    // describe('then it either', function(){

    //   beforeEach(function() {
    //     // move generator to relevant iteration (after it has received call result)
    //     generator = fetchAppData()
    //     generator.next()
    //   })


    //   it('puts an APP_LOAD_SUCCESS (payload: {merged data})', function(){
    //     // test does not work with nested immutable despite chai-immutable, so using regular obj
    //     // (expected behaviour according to https://github.com/astorije/chai-immutable/issues/34)
    //     dummyData = [ Map({prop1: {}, prop2: {} }), Map({prop3: {}, prop4: [] }) ]

    //     output = generator.next(dummyData).value
    //     output.PUT.payload = output.PUT.payload.toJS() // convert immutable record to js
        
    //     dummyData = dummyData[0].merge(dummyData[1])

    //     expect( output ).to.deep.equal( put({ type: actionTypes.APP_LOAD_SUCCESS, payload: dummyData.toJS() }) )  
    //   })

    //   it('ignores (be done) on a MANUAL_CANCEL type error', function(){
    //     output = generator.throw({ type: 'MANUAL_CANCEL' })
    //     expect( output ).to.deep.equal({ value: undefined, done: true })
    //   })

    //   it('puts an APP_LOAD_FAILURE on thrown error', function(){
    //     dummyData = { type: 'some error' }
    //     output = generator.throw(dummyData).value
    //     expect( output ).to.deep.equal( put({ type: actionTypes.APP_LOAD_FAILURE, payload: dummyData.type }) )  
    //   })

    // })

  })

  describe('createCard', function(){

    it('yields a call to api.createCard')

    describe('then it either', function(){
      it('puts an CARD_CREATE_SUCCESS on success')
      it('puts an CARD_CREATE_FAILURE on thrown error')
    })
  })

  describe('deleteCard', function(){

    it('yields a call to api.deleteCard')

    describe('then it either', function(){
      it('puts an CARD_DELETE_SUCCESS on success')
      it('puts an CARD_DELETE_FAILURE on thrown error')
    })
  
  })

  describe('moveCard', function(){

    it('yields a call to api.moveCard')

    describe('then it either', function(){
      it('puts an CARD_MOVE_SUCCESS on success')
      it('puts an CARD_MOVE_FAILURE on thrown error')
    })

  })

  describe('createBoard', function(){

    it('yields a call to api.createBoard')

    describe('then it either', function(){
      it('puts an BOARD_CREATE_SUCCESS on success')
      it('puts an BOARD_CREATE_FAILURE on thrown error')
    })

  })

  describe('deleteBoard', function(){

    it('yields a call to api.createBoard')

    describe('then it either', function(){
      it('puts an BOARD_DELETE_SUCCESS on success')
      it('puts an BOARD_DELETE_FAILURE on thrown error')
    })

  })

})

