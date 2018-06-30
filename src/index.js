import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import Store from './models/store'

const store = new Store()

ReactDOM.render((
  <Router>
    <App store={store} />
  </Router>
), document.getElementById('root'))
