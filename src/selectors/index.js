// import { createSelector } from 'reselect'

// ------------------------------------------------------------------------------
// Store data selectors used by components
// ------------------------------------------------------------------------------

export const appSelector = state => ({ dashboard: state.get('dashboard') })

export const boardSelector = (state, props) => ({
  title: state.get('boards').get(props.boardID).get('title')
})

export const cardSelector = (state, props) => ({
  text: state.getIn(['cards', props.cardID, 'text'])
})

export const cardListSelector = (state, props) => {
  const app = state.get('app')
  const dragData = app.get('dragData')
  return {
    cards: state.getIn(['cardsByBoard', props.boardID]),
    dragOrigin: dragData.get('boardID'),
    dragIndex: dragData.get('index'),
    // isDragging: app.get('isDragging')
  }
}

