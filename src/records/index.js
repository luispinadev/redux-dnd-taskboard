import { Record } from 'immutable'

// Using records enforces state shape (+ self documents, coolio! )

export const Board = new Record({
  boardID: undefined,
  title: ''
  // width ?
  // height ?
  // pos ?
})

export const Card = new Record({
  cardID: undefined,
  text: '',
  pending: false,
  cachedText: undefined
  // date created
  // color
})

export const DraggingCard = new Record({
  cardID: undefined,
  boardID: undefined,
  index: undefined
})
