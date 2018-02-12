import 'core-js/es6/map'
import 'core-js/es6/set'
import 'core-js/es6/array'
import 'core-js/es6/reflect'

import React from 'react'
import ReactDOM from 'react-dom'
import { Container } from '@cerebral/react'
import App from './components/App'
import controller from './controller'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Container controller={controller}>
    <App />
  </Container>,
  document.getElementById('root')
)

registerServiceWorker()
