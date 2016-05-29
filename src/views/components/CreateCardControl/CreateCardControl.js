import React from 'react'

import styles from './createCardControl.styl'
import Card from 'views/components/Card/Card'

export default ({ startCreate, isCreating, setInputText, inputText, onSave, onCancel }) => 
  <div>
    { isCreating ?
      <Card
        text={inputText}
        isEditing={true}
        onSave={ onSave }
        onCancel={ onCancel }
        setInputText={ setInputText }
      /> :
      <div className={styles.createButton} onClick={ startCreate }>create card</div>
    }
  </div>

