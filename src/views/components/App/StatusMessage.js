import React, { PropTypes } from 'react'
// import styles from './StatusMessage.styl'

const StatusMessage = (props) => 
  <div>
    <div>{props.message || 'Something happened'}</div>
    { props.iconClass ? <div>icon</div> : null}
  </div>

StatusMessage.propTypes = {
  message: PropTypes.string.isRequired,
  iconClass: PropTypes.string
  // dismissable ?
  // dismiss button msg (ex retry, reload, close, cancel)
  // dismiss callback ? (ex: if app load failure, pass reload cb)
}

export default StatusMessage
