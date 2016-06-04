import { PropTypes } from 'react'
import { compose, branch, pure, setPropTypes, setDisplayName, withState, mapProps, withHandlers, renderComponent } from 'recompose'

import Card from './Card'
import EditingCard from './EditingCard'
import dndCardHOC from './dndCardHOC'


export default compose(
  setDisplayName('Card'),

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
      props.editCard({ cardID: props.cardID, text: props.inputText })
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
 
  branch(
    props => !props.isEditing && props.pending,
    comp => comp,
    comp => dndCardHOC(comp)
  ),

  branch(
    props => props.isEditing,
    renderComponent(EditingCard),
    comp => comp
  ),

  pure,

  setPropTypes({
    cardID: PropTypes.string, // .isRequired,
    deleteCard: PropTypes.func, // .isRequired,
    index: PropTypes.number,
    startDrag: PropTypes.func,
    endDrag: PropTypes.func,
    text: PropTypes.string.isRequired,
    pending: PropTypes.bool.isRequired,
    setText: PropTypes.func, // .isRequired
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
  })

)(Card)


