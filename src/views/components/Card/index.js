import { PropTypes } from 'react'
import { compose, pure, setPropTypes, setDisplayName, withState, mapProps, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { editCard } from 'actions'

import Card from './Card'

export default compose(
  setDisplayName('Card'),
  
  connect(
    (state, props) => ({
      text: state.get('cards').get(props.cardID).get('text')
    }),
    (dispatch, props) => ({
      setText: (text) => {
        if (props.isEditing) props.editDone()
        dispatch( editCard({ id: props.cardID, text }) )
      }
    })
  ),

  withState('isEditing', 'setEditStatus', false),
  withState('inputText', 'setInputText', props => props.text),
  
  mapProps(({ setEditStatus, setInputText, ...rest }) => ({
    startEdit: () => setEditStatus(true),
    stopEdit: () => setEditStatus(false),
    setInputText: text => setInputText(text),
    ...rest
  })),

  withHandlers({
    onEdit: props => () => {
      props.startEdit()
      // focus input ?
    },
    onSave: props => () => {
      props.setText(props.inputText)
      props.stopEdit()
    },
    onCancel: props => () => {
      props.stopEdit()
      props.setInputText(props.text)
    },
    onDelete: props => () => {
      props.deleteCard(props.cardID)
    }
  }),
 
  pure,

  setPropTypes({
    cardID: PropTypes.string, // .isRequired,
    deleteCard: PropTypes.func, // .isRequired,
    // Injected by mapProps
    startEdit: PropTypes.func, // .isRequired,
    stopEdit: PropTypes.func, // .isRequired,
    setInputText: PropTypes.func.isRequired,
    // Injected by withState
    isEditing: PropTypes.bool.isRequired,
    inputText: PropTypes.string, // .isRequired,
    // Injected by withHandlers
    onEdit: PropTypes.func, // .isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func, // .isRequired,
    // Injected by Redux
    text: PropTypes.string.isRequired,
    setText: PropTypes.func, // .isRequired
  })

)(Card)


