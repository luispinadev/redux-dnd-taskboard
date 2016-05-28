import React from 'react'
import styles from './createBoardControl.styl'

export default ({ onClick }) => 
  <div className={styles.wrapper} >
    <div className={styles.container} >
      <div className={styles.clickArea} onClick={onClick} >
        <div>Create board</div>
        <i className="fa fa-plus-circle" aria-hidden="true" ></i>
      </div>
    </div>
  </div>

