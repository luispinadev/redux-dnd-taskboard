import { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { compose, pure, setPropTypes, setDisplayName } from 'recompose'
import { connect } from 'react-redux'
import { deleteCard } from 'actions'

import CardList from './CardList'

// ------------------------------------------------------------------------------
// DnD target setup
// ------------------------------------------------------------------------------

import { DropTarget } from 'react-dnd'
import dragTypes from 'constants/dragTypes'

const dragTarget = {

  // Update state acording to monitor item props
  hover(props, monitor, component){
    console.log('HOVERING '+props.boardID)
    // const { cardID, boardID, displayIndex } = monitor.getItem()
    // const currentData = component.state.hoverItemData
    // const newData = Map({cardID, boardID, displayIndex})
    // if (!currentData.equals(newData)) {
    //   component.setState({ hoverItemData: newData })
    // }
  },
  drop(props, monitor, component){
    // component.setState({ droppedHere: true })
    console.log('DROPPED HERE '+props.boardID)
  }
}

// ------------------------------------------------------------------------------
// Component
// ------------------------------------------------------------------------------

export default compose(

  DropTarget(dragTypes.CARD, dragTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  })),

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
  })

)(CardList)

