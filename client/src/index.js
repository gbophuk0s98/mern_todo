import React from 'react'
import ReactDOM from 'react-dom'
import './form-signin.css'
import {RegisterPage} from './pages/RegisterPage'

const App = () => {
  return(
    <RegisterPage />
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))
