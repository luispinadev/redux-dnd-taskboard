import { PropTypes } from 'react'
import { compose, pure, setPropTypes, setDisplayName, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { createBoard } from 'actions'

import CreateBoardControl from './CreateBoardControl'


export default compose(  
  setDisplayName('CreateBoardControl'),

  connect(), // used to put dispatch func in props

  pure,
  
  setPropTypes({
    // Injected by Redux
    dispatch: PropTypes.func.isRequired
  }),

  withHandlers({
    onClick: props => () => { 
      props.dispatch( createBoard() )
    },
  })

)(CreateBoardControl)


