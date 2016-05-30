import { PropTypes } from 'react'
// import ImmutablePropTypes from 'react-immutable-proptypes'
import { compose, pure, setPropTypes, setDisplayName } from 'recompose'
import { connect } from 'react-redux'
import { createCard } from 'actions'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import Board from './Board'

export default compose(
  DragDropContext(HTML5Backend),

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


