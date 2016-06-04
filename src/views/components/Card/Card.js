import React from 'react'
import styles from './Card.styl'

export default ({ text, onEdit, onDelete, pending }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container} >
        <div className={styles.text}>{text}</div>
        { pending ? 

          <div className={styles.controlsBlock}>
            <i className="fa fa-spinner" />
          </div>

          :
          
          <div className={styles.controlsBlock} >
            <i title="edit" className={`fa fa-pencil ${styles.icon}`} onClick={onEdit} />
            <i title="delete" className={`fa fa-trash-o ${styles.icon}`} onClick={onDelete} />
          </div> 
        }
      </div>
    </div>
  )
}
