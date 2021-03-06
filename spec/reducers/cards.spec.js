import { Map } from 'immutable'

import cards from 'reducers/cards'
import * as actionCreators from 'actions'
import { Card } from 'records'

describe('Reducer:: cards', function(){
  
  let initialState
  let finalState
  let action

  // tear down
  afterEach(function(){
    initialState = undefined
    action = undefined
    finalState = undefined
  })


  it('returns expected initial state', function(){
    finalState = cards( undefined, {})

    expect(finalState).to.equal( Map() )
  })

  it('handles APP_LOAD_SUCCESS', function(){
    initialState = Map()
    action = actionCreators.appLoadSuccess({ cards: [ { cardID: 'card12', text: 'Lorem'} ]})
    finalState = cards(initialState, action)

    expect(finalState).to.equal( Map({ card12: new Card({ cardID: 'card12', text: 'Lorem'}) }) )
  })

  describe('card create', function(){
    it('handles CARD_CREATE_REQUEST', function(){
      initialState = Map()
      action = actionCreators.createCardRequest()
      finalState = cards(initialState, action)

      expect(finalState.get(action.payload.cardID)).to.equal( new Card({pending: true, ...action.payload}) )
    })

    it('handles CARD_CREATE_SUCCESS', function(){
      initialState = Map({ '123': new Card({ cardID: '123', text: 'Lorem', pending: true }) })
      action = actionCreators.createCardSuccess({ cardID: '123' })
      finalState = cards(initialState, action)

      expect(finalState.get('123').get('pending')).to.be.false
    })

    it('handles CARD_CREATE_FAILURE', function(){
      initialState = Map({ 123: new Card({ cardID: '123'}) })
      action = actionCreators.createCardFailure({ cardID: '123'})
      finalState = cards(initialState, action)

      expect(finalState).to.be.empty
    })
    
  })

  describe('card delete', function(){

    it('handles CARD_DELETE_REQUEST', function(){
      initialState = Map({ 123: new Card({ cardID: '123', pending: false}) })
      action = actionCreators.deleteCardRequest({ cardID: '123'})
      finalState = cards(initialState, action)

      expect(finalState.get(action.payload.cardID)).to.equal( new Card({pending: true, ...action.payload}) )
    })

    it('handles CARD_DELETE_SUCCESS', function(){
      initialState = Map({ 123: new Card({ cardID: '123'}) })
      action = actionCreators.deleteCardSuccess({ cardID: '123'})
      finalState = cards(initialState, action)

      expect(finalState).to.be.empty
    })

    it('handles CARD_DELETE_FAILURE', function(){
      initialState = Map({ 123: new Card({ cardID: '123', pending: true}) })
      action = actionCreators.deleteCardFailure({ cardID: '123'})
      finalState = cards(initialState, action)

      expect(finalState.get(action.payload.cardID)).to.equal( new Card({pending: false, ...action.payload}) )
    })
    
  })

  describe('card move', function(){

    it('handles CARD_MOVE_REQUEST', function(){
      initialState = Map({ 123: new Card({ cardID: '123', pending: false}) })
      action = actionCreators.moveCardRequest({ cardID: '123'})
      finalState = cards(initialState, action)

      expect(finalState.get(action.payload.cardID)).to.equal( new Card({pending: true, ...action.payload}) )
    })

    it('handles CARD_MOVE_SUCCESS', function(){
      initialState = Map({ 123: new Card({ cardID: '123'}) })
      action = actionCreators.moveCardSuccess({ cardID: '123'})
      finalState = cards(initialState, action)

      expect(finalState.get(action.payload.cardID)).to.equal( new Card({pending: false, ...action.payload}) )
    })

    it('handles CARD_MOVE_FAILURE', function(){
      initialState = Map({ 123: new Card({ cardID: '123', pending: true}) })
      action = actionCreators.moveCardFailure({ cardID: '123'})
      finalState = cards(initialState, action)

      expect(finalState.get(action.payload.cardID)).to.equal( new Card({pending: false, ...action.payload}) )
    })
    
  })

  describe('card edit', function(){

    it('handles CARD_EDIT_REQUEST', function(){
      initialState = Map({ '123': new Card({ cardID: '123', text: 'Lorem'}) })
      action = actionCreators.editCardRequest({ cardID: '123', text: 'Ipsum'})
      finalState = cards(initialState, action)

      expect(finalState.get('123')).to.equal(
        new Card({ cardID: '123', cachedText: 'Lorem', text: 'Ipsum', pending: true})
      )
    })

    it('handles CARD_EDIT_SUCCESS', function(){
      initialState = Map({ '123': new Card({ cardID: '123', cachedText: 'Lorem', text: 'Ipsum', pending: true}) })
      action = actionCreators.editCardSuccess({ cardID: '123', text: 'Ipsum'})
      finalState = cards(initialState, action)

      expect(finalState.get('123')).to.equal(
        new Card({ cardID: '123', cachedText: undefined, text: 'Ipsum', pending: false})
      )
    })

    it('handles CARD_EDIT_FAILURE', function(){
      initialState = Map({ '123': new Card({ cardID: '123', cachedText: 'Lorem', text: 'Ipsum', pending: true}) })
      action = actionCreators.editCardFailure({ cardID: '123', text: 'Ipsum'})
      finalState = cards(initialState, action)

      expect(finalState.get('123')).to.equal(
        new Card({ cardID: '123', cachedText: undefined, text: 'Lorem', pending: false})
      )
    })

  })

})
