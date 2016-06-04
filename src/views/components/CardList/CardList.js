import React from 'react'

import styles from './CardList.styl'
import Card from 'views/components/Card'

export default ({cards, deleteCard, editCard, startDrag, endDrag}) =>
	<div className={styles.container} style={ cards.isEmpty() ? { paddingTop: 0} : {}} >
    { cards.map( (c, i) => 
      <Card key={i}
        index={i} 
        cardID={c.get('cardID')} 
        text={c.get('text')}
        pending={c.get('pending')}
        editCard={editCard}
        deleteCard={deleteCard}
        startDrag={startDrag}
        endDrag={endDrag} 
      /> )}
	  
    { /* spacer comp for dnd */ }
  </div>
