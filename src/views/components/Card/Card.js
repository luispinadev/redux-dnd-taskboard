import React, { PropTypes } from 'react'

import styles from './Card.styl'

const Card = ({ text, onEdit, onSave, onCancel, isEditing, inputText, onInputChange, onDelete }) => {
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
            <input type="text" placeholder="write here"
              className={styles.text}
              value={inputText}
              onChange={ onInputChange }
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

Card.propTypes = {
  cardID: PropTypes.string,
  text: PropTypes.string.isRequired
  // isSelected: PropTypes.bool.isRequired,
  // isDragging: PropTypes.bool.isRequired,
  // isPreview: PropTypes.bool.isRequired,
  // isFirst: PropTypes.bool.isRequired,
  // onToggleCard: PropTypes.func.isRequired,
}

export default Card

