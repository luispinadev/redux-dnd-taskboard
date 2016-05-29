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

  it('handles CARD_CREATE', function(){
    initialState = Map()
    action = actionCreators.createCard()
    finalState = cards(initialState, action)

    expect(finalState.get(action.payload.id)).to.equal( new Card(action.payload) )
  })

  it('handles CARD_DELETE', function(){
    initialState = Map({ cardID: new Card({ id: 'cardID'}) })
    action = actionCreators.deleteCard({ id: 'cardID'})
    finalState = cards(initialState, action)

    expect(finalState).to.be.empty
  })

  it('handles CARD_EDIT', function(){
    initialState = Map({ cardID: new Card({ id: 'cardID', text: 'Lorem'}) })
    action = actionCreators.editCard({ id: 'cardID', text: 'Ipsum'})
    finalState = cards(initialState, action)

    expect(finalState.get('cardID').get('text')).to.equal('Ipsum')
  })


})
