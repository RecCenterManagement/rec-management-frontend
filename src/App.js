import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Header from './components/Header'
import Settings from './components/Settings'
import { useSelector, useDispatch } from 'react-redux'
import { AUTH_KEY, getUserAccount } from './actions/authentication'
import Register from './components/Register'
import UserManagement from './components/entities/UserManagement'
import Footer from './components/Footer'
import Facilities from './components/entities/Facilities'
import Reservations from './components/entities/Reservations'
import Equipment from './components/entities/Equipment'
import RecCalendarCreate from './components/RecCalendarCreate'
import RecCalendarView from './components/RecCalendarView'
import ReservationSubmitted from './components/ReservationSubmitted'
import EquipmentReservations from './components/entities/EquipmentReservations'
import Membership from './components/Membership'
import ReservationManagement from './components/ReservationManagement'
import ReservationsList from './components/ReservationsList'
import AboutUs from './components/static_pages/AboutUs'
import FacilityHoursAndSchedule from './components/static_pages/FacilityHoursAndSchedule'
import StayConnected from './components/static_pages/StayConnected'
import EquipmentBundle from './components/entities/EquipmentBundle'
import AquaticCenter from './components/static_pages/AquaticCenter'
import RecreationCenter from './components/static_pages/RecreationCenter'
import FitnessCourt from './components/static_pages/FitnessCourt'
import OutdoorComplex from './components/static_pages/OutdoorComplex'
import PlannedProjects from './components/static_pages/PlannedProjects'
import Notification from "./components/Notification"
import Policies from "./components/static_pages/Policies"
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  content: {
    minHeight: "calc(100vh - 64px)"
  }
}));

function App() {
  const classes = useStyles();
  const authenticated = useSelector(
    state => state.authentication.isAuthenticated
  );
  const loading = useSelector(state => state.authentication.loading);
  const dispatch = useDispatch();

  if (!authenticated) {
    if (localStorage.getItem(AUTH_KEY) || sessionStorage.getItem(AUTH_KEY)) {
      dispatch(getUserAccount());
    }
  }

  console.log(!loading, authenticated);
  if (loading) {
    return <div />;
  }

  return (
    <>
      <Router>
        <Route
          path="/"
          render={props => <Header />}
        />
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/settings" component={Settings} />
          <Route path="/users" component={UserManagement} />
          <Route path="/facilities" component={Facilities} />
          <Route path="/reservations" component={Reservations} />
          <Route path="/my-reservations" component={ReservationsList} />
          <Route path="/equipment" component={Equipment} />
          <Route
            path="/equipment-reservations"
            component={EquipmentReservations}
          />
          <Route path="/membership" component={Membership} />
          <Route
            path="/reservation-management"
            component={ReservationManagement}
          />
          <Route path="/aboutus" component={AboutUs} />
          <Route path="/facilityhours" component={FacilityHoursAndSchedule} />
          <Route path="/stayconnected" component={StayConnected} />
          <Route path="/equipment-bundles" component={EquipmentBundle} />
          <Route path="/calendar" component={RecCalendarView} />
          <Route path="/create-reservation" component={RecCalendarCreate} />
          <Route path="/submitted" component={ReservationSubmitted} />
          <Route path="/aquaticcenter" component={AquaticCenter} />
          <Route path="/recreationcenter" component={RecreationCenter} />
          <Route path="/fitnesscourt" component={FitnessCourt} />
          <Route path="/outdoorcomplex" component={OutdoorComplex} />
          <Route path="/plannedprojects" component={PlannedProjects} />
          <Route path="/policies" component={Policies} />
        <Route
          path="/"
          render={props => props.location.pathname !== "/login" && <Footer />}
        />
      </Router>
      <Notification />
    </>
  );
}

export default App;
