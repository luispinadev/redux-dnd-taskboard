import React from 'react'
import classNames from 'classnames'
import styles from './modal.styl'

export default (WrappedComponent, {
  closeCallback = f => { 
    console.log('CLOSE MODAL')
    return f
  },
  showCloseButton = false,
  closeButton = <i className={"fa fa-times "+styles.closeButton} />,
  closeOnBackdropClick = true,
  isFixed = false,
  backdropOpacity = 0.3, // numeric opacity value for backdrop, ex: use 0 for transparent, 1 for no transparency
  backdropClass = styles.backdrop,
  containerClass = styles.container,
}) => props => 
  <div>
    <div
      className={backdropClass} 
      style={ {opacity: backdropOpacity }}
      onClick={closeOnBackdropClick && closeCallback}
    />
    <div className={classNames(containerClass, { [styles.isFixed]: isFixed })}>
      { showCloseButton && <div onClick={closeCallback}>{closeButton}</div> }
      <WrappedComponent {...props} modalClose={closeCallback} />
    </div>
  </div>

