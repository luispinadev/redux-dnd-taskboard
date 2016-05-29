import React from 'react'
import styles from './Board.styl'
import CardList from 'views/components/CardList'
import CreateCardControl from 'views/components/CreateCardControl'


export default ({ boardID, title, createCard }) => 
  <div className={styles.wrapper } >
    <div className={styles.container} >
      <div className={styles.header} >{title+''}</div>
      <div className={styles.cardsBlock} >
        <CreateCardControl createCard={createCard} />
        <CardList boardID={boardID} />
      </div>
    </div>
  </div>

