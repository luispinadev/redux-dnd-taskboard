import { Map } from 'immutable'

import boards from 'reducers/boards'
import * as actionCreators from 'actions'
import { Board } from 'records'

describe('Reducer:: boards', function(){
  
  let initialState
  let actionPayload
  let finalState

  // tear down
  afterEach(function(){
    initialState = undefined
    actionPayload = undefined
    finalState = undefined
  })


  it('returns expected initial state', function(){
    finalState = boards( undefined, {})

    expect(finalState).to.equal( Map() )
  })

  it('handles BOARD_CREATE', function(){
    initialState = Map()
    finalState = boards( initialState, actionCreators.createBoard())

    expect(finalState).to.have.size(1)
  })

  it('handles BOARD_DELETE', function(){
    initialState = Map({
      'boardID': new Board(actionPayload)
    })
    finalState = boards( initialState, actionCreators.deleteBoard({
      boardID: 'boardID'
    }))

    expect(finalState).to.be.empty
  })


})

