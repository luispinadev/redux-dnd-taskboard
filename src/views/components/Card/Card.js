import React, { PropTypes } from 'react'

import styles from './Card.styl'

const Card = (props) => {
  const { text } = props
  
  return (
    <div className={styles.wrapper}> {/* indented at same level because it's just a style wrapper */}
    <div 
      className={styles.container} 
    >
      <div className={styles.text} title={text}>{text}</div>
      <div className={styles.controlsBlock} >
        <i title="options"
          className={`fa fa-ellipsis-v ${styles.icon}`}
        />
      </div>

    </div>
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

