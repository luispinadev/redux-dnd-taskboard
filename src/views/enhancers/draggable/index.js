import React, { Component } from 'react'

// ------------------------------------------------------------------------------
// Draggable Setup
// ------------------------------------------------------------------------------

import dragTypes from 'constants/dragTypes'
import { DragSource } from 'react-dnd'

// ------------------------------------------------------------------------------
// Drag source

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

export default (WrappedComponent) =>
  DragSource(dragTypes.CARD, dragSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))(
    class Draggable extends Component {
      render(){
        const props = this.props
        return props.connectDragSource(
          <div>
            <WrappedComponent {...props} />
          </div>
        )
      }
    }
  )



