import { createSelector } from 'reselect'

// Store data selectors used by connected components
// Note: using reselect when selectors return computed data

// ------------------------------------------------------------------------------
// App
// ------------------------------------------------------------------------------

export const appSelector = state => ({ isLoading: state.getIn(['app', 'isLoading']), dashboard: state.get('dashboard') })


// ------------------------------------------------------------------------------
// Board component
// ------------------------------------------------------------------------------

export const boardSelector = (state, props) => ({
  title: state.get('boards').get(props.boardID).get('title')
})


// ------------------------------------------------------------------------------
// Card list Component
// ------------------------------------------------------------------------------

const cards = state => state.get('cards')
const cardsByBoard = (state, props) => state.getIn(['cardsByBoard', props.boardID])
const cardDataByBoard = createSelector(
  [cards, cardsByBoard],
  (cards, cardsByBoard) => cardsByBoard.map( cid => cards.get(cid) )
)

export const cardListSelector = (state, props) => {
  const dragData = state.getIn(['app', 'dragData'])
  return {
    cards: cardDataByBoard(state, props),
    dragOrigin: dragData.get('boardID'),
    dragIndex: dragData.get('index')
    // isDragging: app.get('isDragging')
  }
}



