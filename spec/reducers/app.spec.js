import { Map } from 'immutable'

import app from 'reducers/app'
import * as actionCreators from 'actions'
import { DraggingCard } from 'records'

describe('Reducer:: app', function(){
  
  let initialState
  let finalState

  // tear down
  afterEach(function(){
    initialState = undefined
    finalState = undefined
  })


  it('returns expected initial state', function(){
    finalState = app( undefined, {})
    expect(finalState).to.equal( Map({ isLoading: true, isDragging: false, dragData: new DraggingCard() }) )
  })

  it('handles APP_LOAD_REQUEST')
  it('handles APP_LOAD_SUCCESS')
  it('handles APP_LOAD_FAILURE')

  it('handles APP_START_DRAG', function(){
    const action = actionCreators.startDrag({ cardID: 'cid', index: 1, boardID: 'bid'})
    finalState = app( Map({ isDragging: false, dragData: null }), action)

    expect(finalState).to.equal( Map({ 
      isDragging: true, dragData: new DraggingCard({ cardID: 'cid', index: 1, boardID: 'bid'}) 
    }) )
  })

  it('handles APP_END_DRAG', function(){
    initialState = Map({ 
      isDragging: true, dragData: new DraggingCard({ cardID: 'cid', index: 1, boardID: 'bid'}) 
    })
    finalState = app( initialState, actionCreators.endDrag() )

    expect(finalState).to.equal( Map({ 
      isDragging: false, dragData: new DraggingCard({ cardID: 'cid', index: 1, boardID: 'bid'}) 
    }) )
  })


})

