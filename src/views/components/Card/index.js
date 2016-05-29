import { PropTypes } from 'react'
import { compose, pure, setPropTypes, setDisplayName, withState, mapProps, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { editCard /* , deleteCard */} from 'actions'

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
        dispatch( editCard({ cardID: props.cardID, text }) )
      }
      // deleteCard: (text) => {
      //   dispatch( deleteCard({ id: props.cardID, boardID: props.boardID }) )
      // } pass from parent?
    })
  ),

  withState('isEditing', 'setEditStatus', false),
  
  mapProps(({ setEditStatus, ...rest }) => ({
    startEdit: () => setEditStatus(true),
    stopEdit: () => setEditStatus(false),
    ...rest
  })),

  withHandlers({
    onEdit: props => event => {
      props.startEdit()
    },
    onSave: props => val => {
      props.setText(val)
      props.stopEdit()
    },
    onCancel: props => event => {
      props.stopEdit()
    }
    // onDelete: props => event => {
    //   props.deleteCard()
    // }
  }),
 
  pure,

  setPropTypes({
    cardID: PropTypes.string.isRequired,
    boardID: PropTypes.string.isRequired,
    // Injected by mapProps
    startEdit: PropTypes.func.isRequired,
    stopEdit: PropTypes.func.isRequired,
    // Injected by withState
    isEditing: PropTypes.bool.isRequired,
    // Injected by withHandlers
    onEdit: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    // Injected by Redux
    text: PropTypes.string.isRequired,
    setText: PropTypes.func.isRequired
  })

)(Card)


