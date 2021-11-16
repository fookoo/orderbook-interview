import React from 'react'
import ReactDOM from 'react-dom'
import { Global } from '@emotion/react'
import { App } from './components/app/app.component'

import { globalStyles } from './index.styled'

const baseElement = (
  <React.StrictMode>
    <Global styles={globalStyles} />
    <App />
  </React.StrictMode>
)

ReactDOM.render(baseElement, document.getElementById('root'))
