import { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { compose, pure, setPropTypes, setDisplayName } from 'recompose'
import { connect } from 'react-redux'
import { deleteCard } from 'actions'

import CardList from './CardList'
import dropTargetCardListHOC from './dropTargetCardListHOC'

export default compose(

  setDisplayName('CardList'),
  
  connect(
    (state, props) => ({
      cards: state.get('cardsByBoard').get(props.boardID)
    }),
    (dispatch, props) => ({
      deleteCard: (id) => {
        dispatch( deleteCard({ id, boardID: props.boardID }) )
      }
    })
  ),
 
  pure,

  setPropTypes({
    boardID: PropTypes.string.isRequired,    
    // Injected by Redux
    cards: ImmutablePropTypes.list.isRequired,
    deleteCard: PropTypes.func.isRequired
  }),

  dropTargetCardListHOC

)(CardList)

