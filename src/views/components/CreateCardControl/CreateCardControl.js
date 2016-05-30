import React from 'react'

import styles from './createCardControl.styl'
import Card from 'views/components/Card/EditingCard'
import modal from 'views/enhancers/modal'

export const ModalCard = modal(Card, { closeCallbackName: 'onCancel', backdropOpacity: 0 })

export default ({ startCreate, isCreating, setInputText, inputText, onSave, onCancel }) => 
  <div>
    { isCreating ?
      <ModalCard
        text={inputText}
        isEditing={true}
        onSave={ onSave }
        onCancel={ onCancel }
        setInputText={ setInputText }
      /> :
      <div className={styles.createButton} onClick={ startCreate }>create card</div>
    }
  </div>

