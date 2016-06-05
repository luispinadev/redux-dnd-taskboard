import * as actionCreators from 'actions'

// Note:
// I'm using actionTypes directly as strings to also check for proper action type declaration

describe('Action helpers::', function(){
  it('idGenHelper creates an unique id if payload does not contain one', function(){
    // returns an id
    expect( actionCreators.idGenHelper('someID')({ stuff: 100 }).someID ).to.be.a('string')
    // does not destroy existing attributes
    expect( actionCreators.idGenHelper('someID')({ stuff: 100 }).stuff ).to.equal(100)
    // uses provided id
    expect( actionCreators.idGenHelper('someID')({ someID: '123', stuff: 100 }) ).to.deep.equal({ someID: '123', stuff: 100 })
  })
})

describe('Actions::', function(){

  let action
  let expected

  // tear down
  afterEach(function(){
    action = undefined
    expected = undefined
  })

  // ------------------------------------------------------------------------------
  // App
  // ------------------------------------------------------------------------------

  describe('appLoadRequest', function(){
    it('returns a APP_LOAD_REQUEST type action', function(){
      action = actionCreators.appLoadRequest()
      expected = { type: 'APP_LOAD_REQUEST', payload: undefined }
      expect(action).to.deep.equal(expected)
    })
  })

  describe('appLoadSuccess', function(){
    it('returns a APP_LOAD_SUCCESS type action', function(){
      action = actionCreators.appLoadSuccess()
      expected = { type: 'APP_LOAD_SUCCESS', payload: undefined }
      expect(action).to.deep.equal(expected)
    })
  })

  describe('appLoadFailure', function(){
    it('returns a APP_LOAD_FAILURE type action', function(){
      action = actionCreators.appLoadFailure({ type: 'some error' })
      expected = { type: 'APP_LOAD_FAILURE', payload: { type: 'some error' } }
      expect(action).to.deep.equal(expected)
    })
  })

  describe('startDrag', function(){
    it('returns a APP_START_DRAG type action', function(){
      action = actionCreators.startDrag({ cardID: 'cid', boardID: 'bid', index: '1'})
      expected = { type: 'APP_START_DRAG', payload: { cardID: 'cid', boardID: 'bid', index: '1'} }
      expect(action).to.deep.equal(expected)
    })
  })

  describe('endDrag', function(){
    it('returns a APP_END_DRAG type action', function(){
      action = actionCreators.endDrag()
      expected = { type: 'APP_END_DRAG', payload: undefined }
      expect(action).to.deep.equal(expected)
    })
  })

  // ------------------------------------------------------------------------------
  // Boards
  // ------------------------------------------------------------------------------

  describe('createBoard', function(){
    it('returns a BOARD_CREATE type action', function(){
      action = actionCreators.createBoard({ boardID: 'bid', id: '123'})
      expected = { type: 'BOARD_CREATE', payload: { boardID: 'bid', id: '123'} }
      expect(action).to.deep.equal(expected)
    })
  })

  describe('deleteBoard', function(){
    it('returns a BOARD_DELETE type action', function(){
      action = actionCreators.deleteBoard({ id: 'BoardID' })
      expected = { type: 'BOARD_DELETE', payload: { id: 'BoardID' } }
      expect(action).to.deep.equal(expected)
    })
  })

  describe('setBoardTitle', function(){
    it('returns a BOARD_SET_TITLE type action', function(){
      action = actionCreators.setBoardTitle({ id: 'BoardID', title: 'new title' })
      expected = { type: 'BOARD_SET_TITLE', payload: { id: 'BoardID', title: 'new title' } }
      expect(action).to.deep.equal(expected)
    })
  })

  // ------------------------------------------------------------------------------
  // Cards
  // ------------------------------------------------------------------------------

  describe('createCard', function(){

    it('Request returns a CARD_CREATE_REQUEST type action', function(){
      action = actionCreators.createCardRequest({ boardID: '123', text: 'hello', cardID: 'abc' })
      expected = { type: 'CARD_CREATE_REQUEST', payload: { boardID: '123', text: 'hello', cardID: 'abc' } }
      expect(action).to.deep.equal(expected)
    })

    it('Success returns a CARD_CREATE_SUCCESS type action', function(){
      action = actionCreators.createCardSuccess({ cardID: '123' })
      expected = { type: 'CARD_CREATE_SUCCESS', payload: { cardID: '123' } }
      expect(action).to.deep.equal(expected)
    })

    it('Failure returns a CARD_CREATE_FAILURE type action', function(){
      action = actionCreators.createCardFailure({ cardID: '123' })
      expected = { type: 'CARD_CREATE_FAILURE', payload: { cardID: '123' } }
      expect(action).to.deep.equal(expected)
    })

  })

  describe('moveCard', function(){
  
    it('returns a CARD_MOVE_REQUEST type action', function(){
      action = actionCreators.moveCardRequest({ cardID: '123', 'destID:': 'b1', origID: 'b2' })
      expected = { type: 'CARD_MOVE_REQUEST', payload: { cardID: '123', 'destID:': 'b1', origID: 'b2' } }
      expect(action).to.deep.equal(expected)
    })

    it('returns a CARD_MOVE_SUCCESS type action', function(){
      action = actionCreators.moveCardSuccess({ cardID: '123', 'destID:': 'b1', origID: 'b2' })
      expected = { type: 'CARD_MOVE_SUCCESS', payload: { cardID: '123', 'destID:': 'b1', origID: 'b2' } }
      expect(action).to.deep.equal(expected)
    })

    it('returns a CARD_MOVE_FAILURE type action', function(){
      action = actionCreators.moveCardFailure({ cardID: '123', 'destID:': 'b1', origID: 'b2' })
      expected = { type: 'CARD_MOVE_FAILURE', payload: { cardID: '123', 'destID:': 'b1', origID: 'b2' } }
      expect(action).to.deep.equal(expected)
    })

  })

  // Card delete

  describe('deleteCard', function(){
    
    it('returns a CARD_DELETE_REQUEST type action', function(){
      action = actionCreators.deleteCardRequest({ cardID: '123' })
      expected = { type: 'CARD_DELETE_REQUEST', payload: { cardID: '123' } }
      expect(action).to.deep.equal(expected)
    })

    it('returns a CARD_DELETE_SUCCESS type action', function(){
      action = actionCreators.deleteCardSuccess({ cardID: '123' })
      expected = { type: 'CARD_DELETE_SUCCESS', payload: { cardID: '123' } }
      expect(action).to.deep.equal(expected)
    })

    it('returns a CARD_DELETE_FAILURE type action', function(){
      action = actionCreators.deleteCardFailure({ cardID: '123' })
      expected = { type: 'CARD_DELETE_FAILURE', payload: { cardID: '123' } }
      expect(action).to.deep.equal(expected)
    })

  })

  describe('editCard', function(){
    
    it('returns a CARD_EDIT_REQUEST type action', function(){
      action = actionCreators.editCardRequest({ cardID: '123', 'text': 'new text' })
      expected = { type: 'CARD_EDIT_REQUEST', payload: { cardID: '123', text: 'new text' } }
      expect(action).to.deep.equal(expected)
    })

    it('returns a CARD_EDIT_SUCCESS type action', function(){
      action = actionCreators.editCardSuccess({ cardID: '123', 'text': 'new text' })
      expected = { type: 'CARD_EDIT_SUCCESS', payload: { cardID: '123', text: 'new text' } }
      expect(action).to.deep.equal(expected)
    })

    it('returns a CARD_EDIT_FAILURE type action', function(){
      action = actionCreators.editCardFailure({ cardID: '123', 'text': 'new text' })
      expected = { type: 'CARD_EDIT_FAILURE', payload: { cardID: '123', text: 'new text' } }
      expect(action).to.deep.equal(expected)
    })

  })


})

