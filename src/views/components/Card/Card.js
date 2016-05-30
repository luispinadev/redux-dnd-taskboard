import React from 'react'
import styles from './Card.styl'

export default ({ text, onEdit, onDelete }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container} >
        <div className={styles.text} title={text}>{text}</div>
        <div className={styles.controlsBlock} >
          <i title="edit" className={`fa fa-pencil ${styles.icon}`} onClick={onEdit} />
          <i title="delete" className={`fa fa-trash-o ${styles.icon}`} onClick={onDelete} />
        </div> 
      </div>
    </div>
  )
}
