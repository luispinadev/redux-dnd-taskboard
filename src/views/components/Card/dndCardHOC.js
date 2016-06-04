import React from 'react'
import { findDOMNode } from 'react-dom'
import compose from 'recompose/compose'
import throttle from 'lodash.throttle'

import dragTypes from 'constants/dragTypes'
import { DragSource, DropTarget } from 'react-dnd'

// ------------------------------------------------------------------------------
// Drag source Setup
// ------------------------------------------------------------------------------

const dragSource = {

  // canDrag(props){ // lock dragging if awaiting async move response for this card
  //   return !props.movePending
  // },

  beginDrag(props) {
    const { cardID, index, text } = props
    props.startDrag({cardID, index}) // update store state
    return { cardID, text, pending: false, hoverIndex: index, previewIndex: index }
  },

  isDragging(props, monitor) {
    return props.cardID === monitor.getItem().cardID
  },

  endDrag(props) { 
    props.endDrag()
  }

}

// ------------------------------------------------------------------------------
// Drop Target Setup
// ------------------------------------------------------------------------------

// mutates monitor item 'hoverItem' and 'hoverIndex' acording to hovered element
// the monitor item will be read by CardList to determine wether and where to draw the hover preview
const hoverHandler = throttle( (props, monitor, component) => {
  let hoverItem = monitor.getItem()
  const { cardID, index } = props

  // ignore self-hover
  if (hoverItem.cardID === cardID) return

  // set hoverID (id of card that is being hovered)
  hoverItem.hoverID = cardID
  
  // set index (index of card that is being hovered)
  hoverItem.hoverIndex = index
  
  // Decide preview index according to hover position relative to component (draw preview over or under element)
  const hoveredBoundingRect = findDOMNode(component).getBoundingClientRect()   // Determine rectangle on screen
  const hoveredMiddleY = (hoveredBoundingRect.bottom - hoveredBoundingRect.top) / 2   // Get vertical middle
  const mousePosition = monitor.getClientOffset()   // Determine mouse position
  const mouseToTop = mousePosition.y - hoveredBoundingRect.top   // Get pixels to the top

  // hovering top half 
  if (mouseToTop < hoveredMiddleY ) {
    hoverItem.previewIndex = index
  } else { // hovering bottom half
    hoverItem.previewIndex = index + 1
  }

}, 50, { leading: true, trailing: false })

const dropTarget = {
  hover(props, monitor, component) {
    hoverHandler(props, monitor, component)
  }
}


// ------------------------------------------------------------------------------
// Component Setup
// ------------------------------------------------------------------------------

// The 'div' wrapper is required for react-dnd to work
export default (WrappedComponent) =>
  compose(

    DropTarget(dragTypes.CARD, dropTarget, connect => ({
      connectDropTarget: connect.dropTarget()
    })),

    DragSource(dragTypes.CARD, dragSource, (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    }))

  )( ({ connectDropTarget, connectDragSource, isDragging, ...rest}) =>
    connectDropTarget(connectDragSource(
      <div style={ isDragging ? { opacity: 0.4 } : null }>
        <WrappedComponent {...rest} />
      </div>
    ))
  )



