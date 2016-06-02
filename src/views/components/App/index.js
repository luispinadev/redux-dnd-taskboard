import ImmutablePropTypes from 'react-immutable-proptypes'
import { compose, pure, setPropTypes, setDisplayName } from 'recompose'
import { connect } from 'react-redux'

import App from './App'
import {appSelector} from 'selectors'
import 'shared-styles/global.styl' // Setup global styles


export default compose(
  setDisplayName('App'),

  connect( appSelector ),

  pure,
  
  setPropTypes({
    // Injected by Redux
    dashboard: ImmutablePropTypes.list.isRequired
  })

)(App)


