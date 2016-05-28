import { Record } from 'immutable'

// Using records enforces state shape (+ self documents, coolio! )

export const Board = new Record({
  id: undefined,
  title: ''
  // width
  // height
  // pos
})

export const Card = new Record({
  id: undefined,
  text: ''
  // date created
  // is done
});
