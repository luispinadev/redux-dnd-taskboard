import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from 'store'
import App from 'views/components/App'


// HMR
if (module.hot) module.hot.accept()

// 
// Render root component
// 

render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root')
)

