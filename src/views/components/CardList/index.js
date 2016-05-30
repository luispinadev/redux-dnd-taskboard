import { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { compose, pure, setPropTypes, setDisplayName } from 'recompose'
import { connect } from 'react-redux'
import { deleteCard, moveCard, startDrag, endDrag } from 'actions'

import CardList from './CardList'
import dndCardListHOC from './dndCardListHOC'

export default compose(

  setDisplayName('CardList'),
  
  connect(
    (state, props) => ({
      cards: state.getIn(['cardsByBoard', props.boardID]),
      draggingCard: state.getIn(['app', 'draggingCard'])
    }),
    (dispatch, props) => ({
      deleteCard: (cardID) => {
        dispatch( deleteCard({ cardID, boardID: props.boardID }) )
      },
      startDrag: ({cardID, index}) => {
        dispatch( startDrag({ cardID, boardID: props.boardID }) )
      },
      endDrag: () => {
        dispatch( endDrag() )
      }
      // moveCard: ({ cardID, origID, index}) => {
      //   dispatch( moveCard({cardID, destID: props.boardID }))
      // }
    })
  ),
 
  pure,

  setPropTypes({
    boardID: PropTypes.string.isRequired,    
    // Injected by Redux
    cards: ImmutablePropTypes.list.isRequired,
    deleteCard: PropTypes.func.isRequired,
    startDrag: PropTypes.func.isRequired,
    endDrag: PropTypes.func.isRequired
  }),

  dndCardListHOC

)(CardList)

