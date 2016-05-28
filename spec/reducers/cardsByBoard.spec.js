import { fromJS, Map } from 'immutable'

import cardsByBoard from 'reducers/cardsByBoard'
import * as actionCreators from 'actions'

describe('Reducer:: cardsByBoard', function(){
  
  let initialState
  let finalState

  // tear down
  afterEach(function(){
    initialState = undefined
    finalState = undefined
  })


  it('returns expected initial state', function(){
    finalState = cardsByBoard( undefined, {})

    expect(finalState).to.equal( Map() )
  })

  it('handles CARD_CREATE', function(){
    initialState = fromJS({ '123': [] })
    finalState = cardsByBoard( initialState, actionCreators.createCard({
      boardID: '123'
    }))

    expect(finalState.get('123')).to.have.size(1)
  })

  it('handles CARD_DELETE', function(){
    initialState = fromJS({ '123': ['cardID'] })
    finalState = cardsByBoard( initialState, actionCreators.deleteCard({
      boardID: '123',
      id: 'cardID'
    }))

    expect(finalState.get('123')).to.be.empty
  })

  it('handles BOARD_CREATE', function(){
    initialState = Map()
    finalState = cardsByBoard( initialState, actionCreators.createBoard())

    expect(finalState).to.have.size(1)
  })

  it('handles BOARD_DELETE', function(){
    initialState = fromJS({
      'boardID': []
    })
    finalState = cardsByBoard( initialState, actionCreators.deleteBoard({
      id: 'boardID'
    }))

    expect(finalState).to.equal( Map() )
  })


})

