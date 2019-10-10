import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Header from './components/Header'
import Settings from './components/Settings'

const Register = () => <div />
function App() {
  return (
    <Router>
      <Route
        path="/"
        render={props => props.location.pathname !== '/login' && <Header />}
      />
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/settings" component={Settings} />
    </Router>
  )
}

export default App
