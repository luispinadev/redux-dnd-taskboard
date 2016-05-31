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
      dragOrigin: state.getIn(['app', 'dragData', 'boardID'])
    }),
    (dispatch, props) => ({
      deleteCard: (cardID) => {
        dispatch( deleteCard({ cardID, boardID: props.boardID }) )
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
        dispatch( moveCard({
          destID: props.boardID, ...data
        }))
      }
    })
  ),
 
  pure,

  setPropTypes({
    boardID: PropTypes.string.isRequired,    
    // Injected by Redux
    cards: ImmutablePropTypes.list.isRequired,
    deleteCard: PropTypes.func.isRequired,
    startDrag: PropTypes.func.isRequired,
    endDrag: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired
  }),

)(dndCardListHOC(CardList))

