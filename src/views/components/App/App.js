import React from 'react'

import styles from './App.styl'
import Board from 'views/components/Board'
// import CreateBoardControl from 'views/components/CreateBoardControl'

export default ({ dashboard, isLoading }) =>
<div className={styles.container} >
  <div className={styles.header} >Drag and drop taskboard</div>
  { 
    isLoading === true ? 
    
    <div>Loading</div>
    
    :
    <div>
      { /* <CreateBoardControl /> */ }
      <div className={styles.boardsContainer} >
        { dashboard.map( (boardID, i) => <Board key={i} boardID={boardID} />) }
      </div>
    </div>
  }
  
</div>

