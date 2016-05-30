import * as actionCreators from 'actions'
import * as ActionTypes from 'constants/actionTypes'


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
  // Boards
  // ------------------------------------------------------------------------------

  describe('createBoard', function(){
    it('returns a BOARD_CREATE type action', function(){
      action = actionCreators.createBoard({ boardID: 'bid', id: '123'})
      expected = { type: ActionTypes.BOARD_CREATE, payload: { boardID: 'bid', id: '123'} }
      expect(action).to.deep.equal(expected)
    })
  })

  describe('deleteBoard', function(){
    it('returns a BOARD_DELETE type action', function(){
      action = actionCreators.deleteBoard({ id: 'BoardID' })
      expected = { type: ActionTypes.BOARD_DELETE, payload: { id: 'BoardID' } }
      expect(action).to.deep.equal(expected)
    })
  })

  describe('setBoardTitle', function(){
    it('returns a BOARD_SET_TITLE type action', function(){
      action = actionCreators.setBoardTitle({ id: 'BoardID', title: 'new title' })
      expected = { type: ActionTypes.BOARD_SET_TITLE, payload: { id: 'BoardID', title: 'new title' } }
      expect(action).to.deep.equal(expected)
    })
  })

  // ------------------------------------------------------------------------------
  // Cards
  // ------------------------------------------------------------------------------

  describe('createCard', function(){
    it('returns a CARD_CREATE type action', function(){
      action = actionCreators.createCard({ cardID: '123' })
      expected = { type: ActionTypes.CARD_CREATE, payload: { cardID: '123' } }
      expect(action).to.deep.equal(expected)
    })
  })

  describe('deleteCard', function(){
    it('returns a CARD_DELETE type action', function(){
      action = actionCreators.deleteCard({ cardID: '123' })
      expected = { type: ActionTypes.CARD_DELETE, payload: { cardID: '123' } }
      expect(action).to.deep.equal(expected)
    })
  })

  describe('editCard', function(){
    it('returns a CARD_EDIT type action', function(){
      action = actionCreators.editCard({ cardID: '123', 'text': 'new text' })
      expected = { type: ActionTypes.CARD_EDIT, payload: { cardID: '123', text: 'new text' } }
      expect(action).to.deep.equal(expected)
    })
  })

  describe('moveCard', function(){
    it('returns a CARD_MOVE type action', function(){
      action = actionCreators.moveCard({ cardID: '123', 'boardID': 'bID' })
      expected = { type: ActionTypes.CARD_MOVE, payload: { cardID: '123', 'boardID': 'bID' } }
      expect(action).to.deep.equal(expected)
    })
  })

})

