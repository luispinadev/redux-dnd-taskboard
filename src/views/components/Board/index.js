import { PropTypes } from 'react'
// import ImmutablePropTypes from 'react-immutable-proptypes'
import { compose, pure, setPropTypes, setDisplayName } from 'recompose'
import { connect } from 'react-redux'
import { createCardRequest } from 'actions'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import Board from './Board'
import {boardSelector} from 'selectors'

export default compose(
  DragDropContext(HTML5Backend),

  pure,

  setDisplayName('Board'),
  
  connect(
    boardSelector,
    (dispatch, props) => ({
      createCard: (text) => dispatch( createCardRequest({ boardID: props.boardID, text }) )
    })
  ),
 

  setPropTypes({
    boardID: PropTypes.string.isRequired,
    // Injected by Redux
    title: PropTypes.string.isRequired,
    createCard: PropTypes.func.isRequired
  })

)(Board)


