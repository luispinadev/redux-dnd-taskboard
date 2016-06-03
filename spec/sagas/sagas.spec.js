import * as actionTypes from 'constants/actionTypes'
import Api from 'api'
import { Map } from 'immutable'
import { put, call } from 'redux-saga/effects'
import { fetchAppData } from 'sagas'

describe('Sagas::', function(){

  let generator
  let output
  let dummyData


  describe('fetchAppData', function(){

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

      it('ignores (is done) on a MANUAL_CANCEL type error', function(){
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

