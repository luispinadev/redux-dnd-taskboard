// import { v1 } from 'uuid'

// ------------------------------------------------------------------------------
// Dummy API, simulates calls to a remote API
// ------------------------------------------------------------------------------

/*
  In order to showcase ho redux-saga makes it easy to handle non trivial async processes,
  I've broken the data required by the app for the initial loading into two calls.
  One will retrieve the boards data, the other one will retrieve the cards data,
  following these models:
*/

const dummyData = {
  boards: [
    { boardID: 'board1', title: 'To Do', cards: ['card1', 'card2'] },
    { boardID: 'board2', title: 'In Progress', cards: ['card3'] },
    { boardID: 'board3', title: 'Donezo', cards: [] }
  ],
  cards: [
    { cardID: 'card1', text: 'Do the laundry' },
    { cardID: 'card2', text: 'Do the dishes' },
    { cardID: 'card3', text: 'write code about doing laundry and dishes' }
  ]
}


// ------------------------------------------------------------------------------
// Util: returns a Promise that resolves in m millisecs
const delayed = m => new Promise( res => setTimeout(res, m) )
const delay = 500

// ------------------------------------------------------------------------------
// API
// ------------------------------------------------------------------------------

// App initial load
export const getBoards = () => delayed(delay).then( () => Object.assign([], dummyData.boards) ).catch( err => ({ error: err }) )
export const getCards = () => delayed(delay).then( () => Object.assign([], dummyData.cards) ).catch( err => ({ error: err }) )

// Board
// export const createBoard = (payload) => delayed(delay).then( () => return payload)
// export const setBoardTitle = (payload) => delayed(delay).then( () => return payload)
// export const deleteBoard = (payload) => delayed(delay).then( () => return payload)

// Card
// export const createCard = (payload) => delayed(delay).then( () => return payload)
// export const deleteCard = (payload) => delayed(delay).then( () => return payload)
// export const editCard = (payload) => delayed(delay).then( () => return payload)
// export const moveCard = (payload) => delayed(delay).then( () => return payload)

export default {
  getBoards,
  getCards
}


