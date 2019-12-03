import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import RecCenterVector from '../static/RecCenter.svg'
import { Button, Tooltip } from '@material-ui/core'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import RecCalendar from './RecCalendarCreate'

const useStyles = makeStyles(theme => ({
  backgroundHome: {
    background: `url(${RecCenterVector}) no-repeat right center`,
    backgroundColor: '#343434',
    overflow: 'hidden',
    position: 'relative',
    height: 'calc(100vh - 64px)'
  },
  homepagetitle: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    fontSize: '2em',
    color: 'white',
    fontWeight: 'bold',
    float: 'right',
    margin: '15px'
  },
  homeButton: {
    height: '150px',
    marginBottom: '15px',
    transition: 'background-color 0.5s ease',
    backgroundColor: theme.palette.secondary.main,
     color: theme.palette.secondary.contrastText,
     [theme.breakpoints.down('lg')]: {
      width: '200px'
         },
    [theme.breakpoints.down('md')]: {
      width: '150px'
                 },
    [theme.breakpoints.down('xs')]: {
      height: '75px',
      width: '100%'
    },
    "&.Mui-disabled": {
      backgroundColor: "darkgray",
    },
    "& .MuiButton-label": {
      textAlign: "center",
    }
  },
  homeButtonContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '150px',
    marginLeft: '50px',
    paddingTop: '50px',
    paddingBottom: '50px',
    [theme.breakpoints.down('xs')]: {
      width: 'auto',
      marginLeft: '10px',
      marginRight: '10px'
    }
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
  const classes = useStyles();
  const authenticated = useSelector(
    state => state.authentication.isAuthenticated
  );

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
            Preview Reservations
          </Button>
          {authenticated ? (
            <Button
              component={Link}
              to="/create-reservation"
              className={classes.homeButton}
              color="secondary"
              variant="outlined"
            >
              Create<br/>Reservation
            </Button>
          ) : (
            <Tooltip title="Login required">
              <Button
                component={Link}
                to="/login"
                className={classes.homeButton}
                color="secondary"
                variant="outlined"
              >
                Create<br/>Reservation<br/>
              </Button>

            </Tooltip>
          )}
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
