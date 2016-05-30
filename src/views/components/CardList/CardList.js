import React from 'react'

import styles from './CardList.styl'
import Card from 'views/components/Card'

export default ({cards, deleteCard, startDrag, endDrag}) =>
	<div className={styles.container} style={ cards.isEmpty() ? { paddingTop: 0} : {}} >
    { cards.map( (c, i) => <Card key={i} index={i} cardID={c} deleteCard={deleteCard} startDrag={startDrag} endDrag={endDrag} /> )}
	</div>
