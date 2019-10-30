import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Header from './components/Header'
import Settings from './components/Settings'
import { useSelector, useDispatch } from 'react-redux'
import { AUTH_KEY, getUserAccount } from './actions/authentication'
import Register from './components/Register'
import UserManagement from './components/UserManagement'
import Footer from './components/Footer'
import Facilities from './components/Facilities'
import Reservations from './components/Reservations'
import Equipment from './components/Equipment'
import RecCalendar from './components/RecCalendar'
import EquipmentReservations from './components/EquipmentReservations'
import Membership from './components/Membership'

function App() {
  const authenticated = useSelector(
    state => state.authentication.isAuthenticated
  )
  const loading = useSelector(
    state => state.authentication.loading
  )
  const dispatch = useDispatch()

  if (!authenticated) {
    if (localStorage.getItem(AUTH_KEY) || sessionStorage.getItem(AUTH_KEY)) {
      dispatch(getUserAccount())
    }
  }

  console.log(!loading, authenticated)
  if (loading) {
    return <div/>
  }

  return (
    <Router>
      <Route
        path="/"
        render={props => props.location.pathname !== '/login' && <Header />}
      />
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/settings" component={Settings}/>
      <Route path="/users" component={UserManagement}/>
      <Route path="/facilities" component={Facilities}/>
      <Route path="/reservations" component={Reservations} />
      <Route path="/equipment" component={Equipment} />
      <Route path="/equipment-reservations" component={EquipmentReservations}/>
      <Route path="/membership" component={Membership} />
      <Route path="/calendar" component={RecCalendar} />
      <Route
        path="/"
        render={props => props.location.pathname !== '/login' && <Footer />}
      />
    </Router>
  )
}

export default App
