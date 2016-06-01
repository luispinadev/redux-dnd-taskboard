import React from 'react'
import { compose, withState, mapProps } from 'recompose'
import throttle from 'lodash.throttle'
import { fromJS } from 'immutable'

// ------------------------------------------------------------------------------
// DropTarget Setup for CardList component
// ------------------------------------------------------------------------------

import dragTypes from 'constants/dragTypes'
import { DropTarget } from 'react-dnd'

// ------------------------------------------------------------------------------
// Drop target Setup

const hoverHandler = throttle( (props, monitor) => {
  const data = fromJS(monitor.getItem())
  if (!data.equals(props.hoverData)) props.setHoverData(data) 
}, 50, { leading: true, trailing: false })

const dropTarget = {

  drop(props, monitor) {
    const data = monitor.getItem()

    if (!monitor.didDrop()){ // dropped over the board
      props.moveCard({ cardID: data.cardID, origID: props.dragOrigin })
    } else { // dropped over a card
      if (data.cardID === data.hoverID) return // ignore card self drop
      props.moveCard({ cardID: data.cardID, origID: props.dragOrigin, index: data.hoverIndex })
    }
    
  },

  canDrop(props, monitor){
    // edge case: if card already in board and board is otherwise empty, disable drop
    return !(props.cards.size === 1 && props.cards.first() === monitor.getItem().cardID)
  },

  hover(props, monitor){
    hoverHandler(props, monitor)
  }

}

// The 'div' wrapper is required for react-dnd to work
export default (WrappedComponent) =>
  compose(

    withState('hoverData', 'setHoverData', null),

    mapProps(({ setHoverData, ...rest }) => ({
      setHoverData: data => {
        setHoverData(data)
      },
      ...rest
    })),

    DropTarget(dragTypes.CARD, dropTarget, (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver()
    }))

  )( ({ connectDropTarget, ...rest }) =>
    connectDropTarget(
      <div>
        <WrappedComponent {...rest} />
      </div>
    )
  )



