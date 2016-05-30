import React, { Component } from 'react'

// ------------------------------------------------------------------------------
// Draggable Setup for Card component
// Made this a HOC so it is composable
// ------------------------------------------------------------------------------

import dragTypes from 'constants/dragTypes'
import { DragSource } from 'react-dnd'

// ------------------------------------------------------------------------------
// Drag source Setup

const dragSource = {
  beginDrag(props) {
    console.log('BEGIN DRAG', props)
    return { id: '123' }
  },

  endDrag(props, monitor) {
    const dropResult = monitor.getDropResult()
    console.log('END DRAG', props, dropResult)
  }

}

// The 'div' wrapper is required for react-dnd to work
export default (WrappedComponent) =>
  DragSource(dragTypes.CARD, dragSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
    })
  )(props =>
    props.connectDragSource(
      <div>
        <WrappedComponent {...props} />
      </div>
    )
  )



