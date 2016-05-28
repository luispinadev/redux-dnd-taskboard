import React from 'react'

import styles from './App.styl'
import Board from 'views/components/Board'
import CreateBoardControl from 'views/components/CreateBoardControl'

export default ({ dashboard }) =>
<div className={styles.container} >
  <div className={styles.header} >Drag and drop taskboard</div>
  <div className={styles.boardsContainer} >
    { dashboard.map( (boardID, i) => <Board key={i} boardID={boardID} />) }
    <CreateBoardControl />
  </div>
</div>

