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
// Util: return random number between 50 and 500 (used as delay millisecs in delayed promise generator)
function getRandomMS() {
  return Math.floor(Math.random() * (500 - 50 + 1)) + 50
}
// Util: returns a Promise that resolves in m millisecs
const delayed = () => new Promise( res => setTimeout(res, getRandomMS()) )

// ------------------------------------------------------------------------------
// API
// ------------------------------------------------------------------------------

// App initial load
export const getBoards = () => delayed().then( () => Object.assign([], dummyData.boards) ).catch( err => ({ error: err }) )
export const getCards = () => delayed().then( () => Object.assign([], dummyData.cards) ).catch( err => ({ error: err }) )

// Board
export const createBoard = (payload) => delayed().then( () => payload )
export const setBoardTitle = (payload) => delayed().then( () => payload )
export const deleteBoard = (payload) => delayed().then( () => payload )

// Card
export const createCard = payload => delayed().then( () => ({ 
  cardID: payload.cardID 
}) )
export const deleteCard = (payload) => delayed().then( () => payload )
export const editCard = (payload) => delayed().then( () => payload )
export const moveCard = (payload) => delayed().then( () => payload )


