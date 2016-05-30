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
    console.log('BEGIN DRAG')
    const { cardID, index } = props
    
    // props.onBeginDrag(cardID, index) // update store state

    return { cardID, hoverIndex: index }
  },

  isDragging(props, monitor) {
    return props.cardID === monitor.getItem().cardID
  },

  endDrag(props, monitor) {
    const dropResult = monitor.getDropResult()
    console.log('END DRAG', dropResult)

    // if (dropResult && dropResult.hasOwnProperty('droppedOver')){
    //   props.onCardDroped(dropResult.cardID, dropResult.boardID, dropResult.hoverIndex )
    // }

  }

}

// ------------------------------------------------------------------------------
// Drop Target Setup
// ------------------------------------------------------------------------------

// mutates monitor item 'hoverItem' and 'hoverIndex' acording to hovered element
// the monitor item will be read by CardList to determine wether to draw the hover preview
const throttledHoverHandler =  throttle( (props, monitor, component) => {
  let hoverItem = monitor.getItem()
  const { cardID, index } = props

  // ignore self-hover
  if (hoverItem.cardID === cardID) return

  // Set index according to hover position relative to component
  const hoveredBoundingRect = findDOMNode(component).getBoundingClientRect()   // Determine rectangle on screen
  const hoveredMiddleY = (hoveredBoundingRect.bottom - hoveredBoundingRect.top) / 2   // Get vertical middle
  const mousePosition = monitor.getClientOffset()   // Determine mouse position
  const mouseToTop = mousePosition.y - hoveredBoundingRect.top   // Get pixels to the top

  // hovering top half 
  if (mouseToTop < hoveredMiddleY ) {
    hoverItem.hoverIndex = index
  } else // hovering bottom half
  hoverItem.hoverIndex = index + 1

}, 30, { leading: true, trailing: false })

const dropTarget = {
  hover(props, monitor, component) {
    throttledHoverHandler(props, monitor, component)
  },

  // The returned obj will be catched by target CardList's drop handler.
  // This way, CardList can know if the card was dropped over an existing card or directly over itself
  drop(props, monitor){
    const { cardID, hoverIndex } = monitor.getItem()
    console.log('DROP OVER CARD')
    return { droppedOver: dragTypes.CARD, cardID, hoverIndex }
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

  )( ({ connectDropTarget, connectDragSource, ...rest}) =>
    connectDropTarget(connectDragSource(
      <div>
        <WrappedComponent {...rest} />
      </div>
    ))
  )



