import { List } from 'immutable'

import dashboard from 'reducers/dashboard'
import * as actionCreators from 'actions'

describe('Reducer:: dashboard', function(){
  
  let initialState
  let finalState

  // tear down
  afterEach(function(){
    initialState = undefined
    finalState = undefined
  })


  it('returns expected initial state', function(){
    finalState = dashboard( undefined, {})

    expect(finalState).to.equal( List() )
  })

  describe('board MGMT', function(){

    it('adds board ID to dashboard on BOARD_CREATE', function(){
      initialState = List()
      finalState = dashboard( initialState, actionCreators.createBoard())

      expect(finalState).to.have.size(1)
    })

    it('inserts board at index on BOARD_CREATE', function(){
      initialState = List(['boardID'])
      finalState = dashboard( initialState, actionCreators.createBoard({
        boardID: 'anotherID',
        index: 0
      }))

      expect(finalState).to.equal( List([ 'anotherID', 'boardID']) )
    })

    it('deletes board on BOARD_DELETE', function(){
      initialState = List([ 'anotherID', 'boardID'])
      finalState = dashboard( initialState, actionCreators.deleteBoard({
        boardID: 'anotherID'
      }))
      
      expect(finalState).to.equal( List(['boardID']) )
    })

    it('moves board to index on BOARD_MOVE')

  })


})

