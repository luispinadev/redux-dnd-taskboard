import { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { compose, pure, setPropTypes, setDisplayName } from 'recompose'
import { connect } from 'react-redux'
import { deleteCardRequest, moveCardRequest, editCardRequest, startDrag, endDrag } from 'actions'

import CardList from './CardList'
import {cardListSelector} from 'selectors'
import dndCardListHOC from './dndCardListHOC'

export default compose(

  setDisplayName('CardList'),

  connect(
    cardListSelector,
    (dispatch, props) => ({
      editCard: ({cardID, text}) => {
        dispatch( editCardRequest({ cardID, text }) )
      },
      deleteCard: (cardID) => {
        dispatch( deleteCardRequest({ cardID, boardID: props.boardID }) )
      },
      startDrag: ({cardID, index}) => {
        dispatch( startDrag({ 
          cardID, boardID: props.boardID, index
        }) )
      },
      endDrag: () => {
        dispatch( endDrag() )
      },
      moveCard: (data) => {
        dispatch( moveCardRequest({
          destID: props.boardID, ...data
        }))
      }
    })
  ),
 
  pure,
 
  dndCardListHOC,

  setPropTypes({
    boardID: PropTypes.string.isRequired,    
    // Injected by Redux
    cards: ImmutablePropTypes.list.isRequired,
    deleteCard: PropTypes.func.isRequired,
    editCard: PropTypes.func.isRequired,
    startDrag: PropTypes.func.isRequired,
    endDrag: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired
  }),

)(CardList)

