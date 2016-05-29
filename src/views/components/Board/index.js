import { PropTypes } from 'react'
// import ImmutablePropTypes from 'react-immutable-proptypes'
import { compose, pure, setPropTypes, setDisplayName } from 'recompose'
import { connect } from 'react-redux'
import { createCard } from 'actions'

import Board from './Board'

export default compose(
  setDisplayName('Board'),
  
  connect(
    (state, props) => ({
      title: state.get('boards').get(props.boardID).get('title')
    }),
    (dispatch, props) => ({
      createCard: (text) => dispatch( createCard({ boardID: props.boardID, text }) )
    })
  ),
 
  pure,

  setPropTypes({
    boardID: PropTypes.string.isRequired,
    // Injected by Redux
    title: PropTypes.string.isRequired,
    createCard: PropTypes.func.isRequired
  })

)(Board)


