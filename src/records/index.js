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
  text: ''
  // date created
  // is done
})
