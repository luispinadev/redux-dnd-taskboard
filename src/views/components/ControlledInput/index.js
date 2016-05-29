import { PropTypes } from 'react'
import { compose, pure, setPropTypes, setDisplayName, withState, mapProps, withHandlers, defaultProps } from 'recompose'

import ControlledInput from './ControlledInput'

export default compose(
  setDisplayName('ControlledInput'),  

  withState('value', 'setVal', (props) => props.initVal),
  
  mapProps(({ setVal, ...rest }) => ({
    setVal: val => setVal(val),
    ...rest
  })),

  withHandlers({
    onChange: props => e => {
      const newVal = e.target.value
      props.setVal(newVal)
      props.changeHandler(newVal)
    }
  }),
 
  pure,

  defaultProps({
    initVal: '',
    placeholder: '',
    className: ''
  }),

  setPropTypes({
    initVal: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    changeHandler: PropTypes.func.isRequired,
    // Injected by mapProps
    setVal: PropTypes.func.isRequired,
    // Injected by withState
    value: PropTypes.string.isRequired,
    // Injected by withHandlers
    onChange: PropTypes.func.isRequired,
  })

)(ControlledInput)


