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

  it('handles APP_LOAD_SUCCESS', function(){
    initialState = Map()
    finalState = cardsByBoard( initialState, actionCreators.appLoadSuccess({
      cardsByBoard: { '123': [], abc: ['12']}
    }))

    expect(finalState).to.equal( fromJS({ '123': [], abc: ['12']}) )
  })

  it('handles CARD_CREATE_REQUEST', function(){
    initialState = fromJS({ '123': [] })
    finalState = cardsByBoard( initialState, actionCreators.createCardRequest({
      boardID: '123'
    }))

    expect(finalState.get('123')).to.have.size(1)
  })

  it('handles CARD_CREATE_FAILURE', function(){
    initialState = fromJS({ '123': ['cardID'] })
    finalState = cardsByBoard( initialState, actionCreators.createCardFailure({
      boardID: '123',
      cardID: 'abc'
    }))

    expect(finalState.get('123')).to.be.empty
  })  

  it('handles CARD_DELETE', function(){
    initialState = fromJS({ '123': ['cardID'] })
    finalState = cardsByBoard( initialState, actionCreators.deleteCard({
      boardID: '123',
      cardID: 'cardID'
    }))

    expect(finalState.get('123')).to.be.empty
  })

  it('handles CARD_MOVE', function(){
    initialState = fromJS({ abc: ['cardID'], xyz: [] })
    finalState = cardsByBoard( initialState, actionCreators.moveCard({
      origID: 'abc',
      destID: 'xyz',
      cardID: 'cardID'
    }))

    expect(finalState).to.equal( fromJS({ abc: [], xyz: ['cardID'] }) )
  })

  it('handles CARD_MOVE to index', function(){
    initialState = fromJS({ abc: ['cardID1'], xyz: ['cardID2', 'cardID3'] })
    finalState = cardsByBoard( initialState, actionCreators.moveCard({
      origID: 'abc',
      destID: 'xyz',
      cardID: 'cardID1',
      index: 1
    }))

    expect(finalState).to.equal( fromJS({ abc: [], xyz: ['cardID2', 'cardID1', 'cardID3'] }) )
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
      boardID: 'boardID'
    }))

    expect(finalState).to.equal( Map() )
  })


})

