// import { v1 } from 'uuid'

// ------------------------------------------------------------------------------
// Dummy API, simulates calls to a remote API
// ------------------------------------------------------------------------------

/*
  In order to showcase how redux-saga makes it easy to handle non trivial async processes,
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
// Utils
// ------------------------------------------------------------------------------

// Generates random number between 50 and 500 (used as delay millisecs in delayed promise generator)
function getRandomMS() {
  return Math.floor(Math.random() * (500 - 50 + 1)) + 50
}

// Returns a Promise that resolves in random milliseconds
// if no arg is provided, uses getRandomMS to define delay time
const delayed = m => new Promise( res => setTimeout(res, m ? m : getRandomMS()) )

// Returns a delayed identity Promise generator
const genDelayedIdentity = m => payload => delayed(m).then( () => payload )

// ------------------------------------------------------------------------------
// API
// ------------------------------------------------------------------------------

// App initial load
export const getBoards = () => delayed().then( () => Object.assign([], dummyData.boards) ).catch( err => ({ error: err, type: 'getBoards' }) )
export const getCards = () => delayed().then( () => Object.assign([], dummyData.cards) ).catch( err => ({ error: err, type: 'getCards' }) )

// Board
export const createBoard = genDelayedIdentity()
export const setBoardTitle = genDelayedIdentity()
export const deleteBoard = genDelayedIdentity()

// Card
export const createCard = genDelayedIdentity()
export const deleteCard = genDelayedIdentity()
export const moveCard = genDelayedIdentity()
export const editCard = genDelayedIdentity()


