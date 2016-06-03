import React from 'react'
import classnames from 'classnames'
import styles from './modal.styl'

// ------------------------------------------------------------------------------
// Modal HOC
// ------------------------------------------------------------------------------

/*
  This HOC gives the wrapped component a modal behaviour.
  It supports several config options (check comments). Depending on the options,
  this can output a traditional modal popup with backdrop, or just
  add a 'deferred click' like behaviour to trigger a callback on click outside of the component,
  without changing the component's style
*/

export default (WrappedComponent, {
  className= null, // class name for top level div
  closeCallbackName = '', // name for the callback that closes the modal. This should be a prop on the wrapped component
  showCloseButton = false, // wether to show the 'close button' ovr the component
  closeButton = <i className={'fa fa-times '+styles.closeButton} />, // react element or string for the close button
  closeOnBackdropClick = true, // wether to trigger the 'closeCallback' when backdrop is clicked
  isFixed = false, // wether to apply the default 'fixed' styles. These will position the modal in the middle of the screen
  backdropOpacity = 0.3, // numeric opacity value for backdrop, ex: use 0 for transparent, 1 for no transparency
  backdropClass = styles.backdrop, // custom class name for backdrop
  containerClass = styles.container, // custom class name for container
}) => props => 
  <div className={className}>
    <div
      className={backdropClass} 
      style={ {opacity: backdropOpacity }}
      onClick={closeOnBackdropClick && props[closeCallbackName]}
    />
    <div className={classnames(containerClass, { [styles.isFixed]: isFixed })}>
      { showCloseButton && <div onClick={ props[closeCallbackName] } >{closeButton}</div> }
      <WrappedComponent {...props} />
    </div>
  </div>

