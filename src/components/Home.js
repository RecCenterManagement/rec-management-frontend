import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import RecCenterVector from '../static/RecCenter.svg'
import { Button } from '@material-ui/core'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import RecCalendar from './RecCalendar'

const useStyles = makeStyles(theme => ({
  backgroundHome: {
    background: `url(${RecCenterVector}) no-repeat right center`,
    backgroundColor: '#343434',
    height: '80vh'
  },
  homepagetitle: {
    margin: '5%',
    position: 'absolute',
    right: '0px',
    fontSize: '2em',
    color: 'white',
    fontWeight: 'bold'
  },
  homeButton: {
    height: '150px',
    margin: '15px',
    maxWidth: '150px'
  },
  homeButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '25%',
    marginLeft: '5%',
    paddingTop: '6%'
  }
}))

export const SignInLogOut = props =>
  props.authenticated ? (
    <Button
      component={Link}
      to="/logout"
      style={{ marginLeft: '20px' }}
      variant="outlined"
      color="secondary"
    >
      Log Out
    </Button>
  ) : (
    <>
      <Button
        component={Link}
        to="/login"
        style={{ marginLeft: '20px', marginRight: '20px' }}
        variant="outlined"
        color="secondary"
      >
        Log In
      </Button>
      <Button
        component={Link}
        to="/register"
        variant="outlined"
        color="secondary"
      >
        Register
      </Button>
    </>
  )

const Membership = () => <div>Yo yoyyu</div>

const Home = () => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.backgroundHome}>
        <div className={classes.homeButtonContainer}>
          <Button
            component={Link}
            to="/membership"
            className={classes.homeButton}
            color="secondary"
            variant="outlined"
          >
            Membership
          </Button>
          <Button
            component={Link}
            to="/calendar"
            className={classes.homeButton}
            color="secondary"
            variant="outlined"
          >
            Room Reservation
          </Button>
          <Button
            className={classes.homeButton}
            color="secondary"
            variant="outlined"
          >
            Equipment Rental
          </Button>
        </div>
        <span className={classes.homepagetitle}>
          {' '}
          UNIVERSITY RECREATION AND WELL-BEING{' '}
        </span>
      </div>
      <Router>
        <Route path="/membership" component={Membership} />
        <Route path="/calendar" component={RecCalendar} />
      </Router>
    </>
  )
}

export default Home
