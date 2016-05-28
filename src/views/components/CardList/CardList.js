import React from 'react'

import styles from './CardList.styl'
import ModalHOC from 'views/enhancers/Modal'

const Cena = () => <div>cena</div>
const WrappedCena = ModalHOC(Cena, {})

export default ({cards}) =>
	<div className={styles.container} style={ cards.isEmpty() ? { paddingTop: 0} : {}} >
	  { cards.map( (c, i) => <div key={i} >- {c.text}</div> )}
    <WrappedCena />
	</div>
