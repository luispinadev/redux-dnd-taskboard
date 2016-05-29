import { PropTypes } from 'react'
import { compose, pure, setPropTypes, setDisplayName, withState, mapProps, withHandlers } from 'recompose'

import CreateCardControl from './CreateCardControl'

export default compose(
  setDisplayName('CreateCardControl'),

  withState('isCreating', 'setIsCreating', false),
  withState('inputText', 'setInputText', ''),

  mapProps(({ setIsCreating, setInputText, ...rest }) => ({
    startCreate: () => setIsCreating(true),
    stopCreate: () => setIsCreating(false),
    setInputText: text => setInputText(text),
    ...rest
  })),

  withHandlers({
    onSave: props => () => {
      props.stopCreate()
      props.setInputText('')
      props.createCard(props.inputText)
    },
    onCancel: props => () => {
      props.stopCreate()
      props.setInputText('')
    }
  }),
 
  pure,

  setPropTypes({
    createCard: PropTypes.func.isRequired,
    // Injected by mapProps
    startCreate: PropTypes.func.isRequired,
    stopCreate: PropTypes.func.isRequired,
    setInputText: PropTypes.func.isRequired,
    // Injected by withState
    isCreating: PropTypes.bool.isRequired,
    inputText: PropTypes.string.isRequired,
    // Injected by withHandlers
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  })

)(CreateCardControl)


