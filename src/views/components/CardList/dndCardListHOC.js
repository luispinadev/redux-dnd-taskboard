import React from 'react'

// ------------------------------------------------------------------------------
// DropTarget Setup for CardList component
// ------------------------------------------------------------------------------

import dragTypes from 'constants/dragTypes'
import { DropTarget } from 'react-dnd'

// ------------------------------------------------------------------------------
// Drop target Setup

const dropTarget = {
  drop(props, monitor) {
    const data = monitor.getItem()

    // dropped over this comp
    if (!monitor.didDrop()){ // or droppedOver === dragTypes.CARD
      props.moveCard({ cardID: data.cardID, origID: props.dragOrigin })
    } else {
      props.moveCard({ cardID: data.cardID, origID: props.dragOrigin, index: data.hoverIndex })
    }
    
  }

  // hover(props, monitor) {
  //   console.log('HOVER', monitor.getItem())
  // }

}

// The 'div' wrapper is required for react-dnd to work
export default (WrappedComponent) =>
  DropTarget(dragTypes.CARD, dropTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  })
  )( ({ connectDropTarget, ...rest }) =>
    connectDropTarget(
      <div>
        <WrappedComponent {...rest} />
      </div>
    )
  )



