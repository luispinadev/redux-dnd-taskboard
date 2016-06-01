import React, { Component } from 'react'
import { compose, withState, mapProps, lifecycle } from 'recompose'
import throttle from 'lodash.throttle'
import { fromJS, Map } from 'immutable'

// ------------------------------------------------------------------------------
// DropTarget Setup for CardList component
// ------------------------------------------------------------------------------

import dragTypes from 'constants/dragTypes'
import { DropTarget } from 'react-dnd'

// ------------------------------------------------------------------------------
// Drop target Setup

const hoverHandler = throttle( (props, monitor) => {
  const data = fromJS(monitor.getItem())

  if (!data.equals(props.hoverData.get('hoverItem'))) {
    props.updateHoverData(data)
  }

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

    withState('hoverData', 'setHoverData', props => Map({ hoverItem: Map(), cards: props.cards })),

    mapProps(({ setHoverData, cards, ...rest }) => ({
      updateHoverData: data =>
        setHoverData(Map({ 
          hoverItem: data, 
          cards: cards.insert( data.get('previewIndex', data.get('cardID')) )
        })),
      resetHoverData: () => setHoverData(Map({ hoverItem: Map(), cards: cards })),
      cards, ...rest
    })),

    DropTarget(dragTypes.CARD, dropTarget, (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver()
    })),

    // lifecycle({
    //   componentWillReceiveProps: ({isOver, resetHoverData}) => {
    //     // if (!isOver && this.props.isOver) resetHoverData()
    //     console.log(this) // for some reason, 'this' is undefined, despite that if I open this in the debugger, I can use it corectly? ?!?!
    //   }
    // })


  )( // ({ connectDropTarget, hoverData, ...rest }) =>
  class dndCardList extends Component {
  
    componentWillReceiveProps({isOver, cards, resetHoverData}){
      props = this.props
      if (!isOver && this.props.isOver || cards !== props.cards) resetHoverData()
    }

    render(){
      const { connectDropTarget, isOver, hoverData, ...rest } = this.props
      return connectDropTarget(
        <div>
          <WrappedComponent {...rest} cards={hoverData.get('cards')}/>
        </div>
      )
    }
  })



