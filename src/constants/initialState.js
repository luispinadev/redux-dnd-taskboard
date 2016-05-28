import { fromJS } from 'immutable'

const initialState = fromJS({
  cards: {},
  cardsByBoard: {},
  boards: [],
  dashboard: {},
})

export default initialState
