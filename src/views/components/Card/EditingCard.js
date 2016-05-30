import React from 'react'

import styles from './Card.styl'
import ControlledInput from 'views/components/ControlledInput'

export default ({ text, onSave, onCancel, setInputText }) => {
  return (
    <div className={styles.wrapper}>
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
    </div>
  )
}
