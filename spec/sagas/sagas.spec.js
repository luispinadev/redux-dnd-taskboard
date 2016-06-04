import * as actionTypes from 'constants/actionTypes'
import { put, call } from 'redux-saga/effects'
import * as Api from 'api'
import { fetchAppData, identityPutRoutine } from 'sagas'

describe('Sagas::', function(){

  describe('handles APP_LOAD_REQUEST', function(){

    let generator
    let output
    let dummyData

    it('yields parallel calls to api getBoards and getCards', function(){
      generator = fetchAppData()
      output = generator.next().value
      expect( output ).to.deep.equal( [call(Api.getBoards), call(Api.getCards)] )  
    })

    describe('then it either', function(){

      beforeEach(function() {
        // move generator to relevant iteration (after it has received call result)
        generator = fetchAppData()
        generator.next()
      })


      it('puts an APP_LOAD_SUCCESS (payload: {reduced data})', function(){
        dummyData = [
          [
            { boardID: 'board1', title: 'To Do', cards: ['card1'] },
            { boardID: 'board2', title: 'In Progress', cards: ['card2'] },
          ],
          [ { cardID: 'card1', text: 'one' }, { cardID: 'card2', text: 'two' } ]
        ]
        const expected = {
          cardsByBoard: { board1: ['card1'], board2: ['card2'] },
          boards: [ { boardID: 'board1', 'title': 'To Do' }, { 'boardID': 'board2', 'title': 'In Progress' }],
          dashboard: ['board1', 'board2'],
          cards: [{cardID: 'card1', 'text': 'one'}, {'cardID': 'card2', 'text': 'two'}]
        }
        output = generator.next(dummyData).value

        expect( output ).to.deep.equal( put({ type: actionTypes.APP_LOAD_SUCCESS, payload: expected }) )  
      })

      it('ignores (done) on MANUAL_CANCEL type error', function(){
        output = generator.throw({ type: 'MANUAL_CANCEL' })

        expect( output ).to.deep.equal({ value: undefined, done: true })
      })

      it('puts an APP_LOAD_FAILURE on thrown error', function(){
        dummyData = { type: 'some error' }
        output = generator.throw(dummyData).value
          
        expect( output ).to.deep.equal( put({ type: actionTypes.APP_LOAD_FAILURE, payload: dummyData.type }) )
      })

    })

  })

  describe('identityPutRoutine handler for CREATE -> SUCCESS || FAILURE actions', function(){

    let generator
    let output
    const action = { type: 'ACTION_REQUEST', payload: 'payload data' }
    const apiCall = payload => new Promise( res => setTimeout(res, 0) ).then( () => payload)
    const successActionCreator = (payload) => ({ type: 'ACTION_SUCCESS', payload })
    const failureActionCreator = (payload) => ({ type: 'ACTION_FAILURE', payload })

    it('yields a call to apiCall method', function(){

      generator = identityPutRoutine(action, apiCall, successActionCreator, failureActionCreator)
      output = generator.next().value

      expect( output ).to.deep.equal( call(apiCall, 'payload data') )
    })

    describe('then it either', function(){

      // move generator to second step
      beforeEach(function() {
        generator = identityPutRoutine(action, apiCall, successActionCreator, failureActionCreator)
        generator.next()
      })

      it('puts a ACTION_SUCCESS', function(){
        output = generator.next('payload data').value

        expect( output ).to.deep.equal( put({ type: 'ACTION_SUCCESS', payload: 'payload data' }) )  
      })

      it('puts a ACTION_FAILURE on thrown error', function(){
        output = generator.throw('some error').value
          
        expect( output ).to.deep.equal( put({ type: 'ACTION_FAILURE', payload: 'some error' }) )
      })

    })
  })

})

