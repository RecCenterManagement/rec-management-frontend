import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import './index.css'
import * as serviceWorker from './serviceWorker'
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#B89F74', // Primary Light
      main: '#877148', // Heritage Gold
      dark: '#58461F', // Primary Dark
      contrastText: '#FFF'
    },
    secondary: {
      light: '#00B398', // Accent Teal
      main: '#0086BF', // Accent Blue
      dark: 'purple', // Accent Purple
      contrastText: '#FFF'
    }
  }
})
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
