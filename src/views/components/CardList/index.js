import { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { compose, pure, setPropTypes, setDisplayName } from 'recompose'
import { connect } from 'react-redux'
import { deleteCard, moveCard } from 'actions'

import CardList from './CardList'
import dndCardListHOC from './dndCardListHOC'

export default compose(

  setDisplayName('CardList'),
  
  connect(
    (state, props) => ({
      cards: state.get('cardsByBoard').get(props.boardID)
    }),
    (dispatch, props) => ({
      deleteCard: (cardID) => {
        dispatch( deleteCard({ cardID, boardID: props.boardID }) )
      },
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
    deleteCard: PropTypes.func.isRequired
  }),

  dndCardListHOC

)(CardList)

