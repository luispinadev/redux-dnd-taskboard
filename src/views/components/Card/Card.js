import React from 'react'

import styles from './Card.styl'
import ControlledInput from 'views/components/ControlledInput'

export default ({ text, onEdit, onSave, onCancel, isEditing, setInputText, onDelete }) => {
  return (
    <div className={styles.wrapper}> {/* indented at same level because it's just a style wrapper */}
      { !isEditing ?
          <div className={styles.container} >
            <div className={styles.text} title={text}>{text}</div>
            <div className={styles.controlsBlock} >
              <i title="edit" className={`fa fa-pencil ${styles.icon}`} onClick={onEdit} />
              <i title="delete" className={`fa fa-trash-o ${styles.icon}`} onClick={onDelete} />
            </div> 
          </div>
          :
          <div className={styles.container} >
            <ControlledInput className={styles.text} placeholder="write here"
              initVal={text}
              changeHandler={setInputText} 
            />
            <div className={styles.controlsBlock} >
              <i title="save" className={`fa fa-check ${styles.icon}`} onClick={onSave} />
              <i title="cancel" className={`fa fa-times ${styles.icon}`} onClick={onCancel} />
            </div> 
          </div>
      }

    </div>
  )
}
