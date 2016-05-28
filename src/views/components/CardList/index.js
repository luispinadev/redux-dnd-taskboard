import { PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { compose, pure, setPropTypes, setDisplayName } from 'recompose'
import { connect } from 'react-redux'

import CardList from './CardList'

export default compose(
  setDisplayName('CardList'),
  
  connect(
    (state, props) => ({
      cards: state.get('cardsByBoard').get(props.boardID)
    })
  ),
 
  pure,

  setPropTypes({
    boardID: PropTypes.string.isRequired,    
    // Injected by Redux
    cards: ImmutablePropTypes.list.isRequired
  })

)(CardList)

