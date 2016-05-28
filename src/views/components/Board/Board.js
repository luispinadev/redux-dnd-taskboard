import React from 'react'
import styles from './Board.styl'
import CardList from 'views/components/CardList'

export default ({ boardID, title, createCard }) => 
  <div className={styles.wrapper } >
    <div className={styles.container} >
      <div className={styles.header} >{title+''}</div>
      <div className={styles.cardsBlock} >
        <div className={styles.newButton} onClick={createCard}>new card</div>
        <CardList boardID={boardID} />
      </div>
    </div>
  </div>

