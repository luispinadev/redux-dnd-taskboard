import React, { Component } from 'react'

// ------------------------------------------------------------------------------
// DropTarget Setup for CardList component
// ------------------------------------------------------------------------------

import dragTypes from 'constants/dragTypes'
import { DropTarget } from 'react-dnd'

// ------------------------------------------------------------------------------
// Drop target Setup

const dropTarget = {
  drop(props) {
    console.log('DROPPED!')
  },

  hover(props, monitor) {
    console.log('HOVER', monitor.getItem())
  }

}

// The 'div' wrapper is required for react-dnd to work
export default (WrappedComponent) =>
  DropTarget(dragTypes.CARD, dropTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  })
  )(props =>
    props.connectDropTarget(
      <div>
        <WrappedComponent {...props} />
      </div>
    )
  )



