import React from 'react'

import styles from './CardList.styl'
import Card from 'views/components/Card'

export default ({cards}) =>
	<div className={styles.container} style={ cards.isEmpty() ? { paddingTop: 0} : {}} >
    { cards.map( (c, i) => <Card key={i} cardID={c}/> )}
	</div>
