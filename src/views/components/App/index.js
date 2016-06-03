import ImmutablePropTypes from 'react-immutable-proptypes'
import { compose, pure, setPropTypes, setDisplayName, lifecycle } from 'recompose'
import { connect } from 'react-redux'

import App from './App'
import {appSelector} from 'selectors'
import {appLoadRequest} from 'actions'
import 'shared-styles/global.styl' // Setup global styles


export default compose(
  setDisplayName('App'),

  connect( appSelector, { appLoadRequest } ),

  pure,
  
  setPropTypes({
    // Injected by Redux
    dashboard: ImmutablePropTypes.list.isRequired
  }),

  // TD: branch for app loading?

  lifecycle({
    componentDidMount() { 
      this.props.appLoadRequest()
    }
  })

)(App)


