import React, { Component } from 'react'
import { pure, compose, withState, mapProps, setDisplayName } from 'recompose'
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
  if (!data.equals(props.hoverData)) props.updateHoverData(data)

}, 50, { leading: true, trailing: false })

const dropTarget = {

  drop(props, monitor) {
    const data = monitor.getItem()
    if (!monitor.didDrop()){ // dropped over the board
      props.moveCard({ cardID: data.cardID, origID: props.dragOrigin })
    } else { // dropped over a card
      if (data.cardID === data.hoverID) return // ignore card self drop
      props.moveCard({ cardID: data.cardID, origID: props.dragOrigin, index: data.previewIndex })
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
    setDisplayName('dndCardListHOC'),

    pure,

    withState('hoverData', 'setHoverData', Map()),

    mapProps(({ setHoverData, cards, ...rest }) => ({
      updateHoverData: data =>{
        setHoverData(data)
      },
      resetHoverData: () => setHoverData(Map()),
      cards, ...rest
    })),

    DropTarget(dragTypes.CARD, dropTarget, (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver()
    }))

  )( class dndCardList extends Component {
  
    constructor(props) {
      super(props)
      // The list of cards is moved to state, so we can draw a preview of the hovered item if necessary
      this.state = { cards: props.cards }
    }

    // Manage hoverData and state.cards according to drag and drop state
    componentWillReceiveProps({boardID, dragOrigin, dragIndex, isOver, cards, resetHoverData, hoverData}){
      const props = this.props
      // Manage preview based on hover data 

      // if hovered item 'leaving' board area, clear hoverData
      if (!isOver && props.isOver) resetHoverData()
      // Setup preview inside cards list
      else if (hoverData.isEmpty()){ // if no hoverData, display original cards list from props
        this.setState({ cards: cards })
      } else {
        const hoverIndex = hoverData.get('previewIndex')
        if ( 
          dragOrigin !== boardID || // if same board, prevent contiguous preview
          ( 
            hoverIndex !== dragIndex + 1 &&
            hoverIndex !== dragIndex
          )
        ) this.setState({ cards: cards.insert(hoverIndex, hoverData ) })
      }
    }

    shouldComponentUpdate(nextProps, nextState){
      const hoverData = this.props.hoverData
      return (nextState.cards !== this.state.cards || nextProps.hoverData.get('previewIndex') !== hoverData.get('previewIndex'))
    }

    render(){
      const { connectDropTarget, ...rest } = this.props
      return connectDropTarget(
        <div>
          <WrappedComponent {...rest} cards={this.state.cards} />
        </div>
      )
    }

  })



