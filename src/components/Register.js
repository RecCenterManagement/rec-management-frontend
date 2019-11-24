import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Paper,
  FormControl,
  Grid,
  TextField,
  Typography,
  Snackbar,
  SnackbarContent
} from '@material-ui/core'
import { register, reset } from '../actions/registration'

const useStyles = makeStyles(theme => ({
  firstTitle: {
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.primary.dark
  },
  firstContainer: {
    height: '95.5%',
    padding: '0.75em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  firstWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-between'
  },
  secondTitle: {
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.primary.contrastText
  },
  secondContainer: {
    padding: '0.75em',
    backgroundColor: '#8e774d',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  button: {
    display: 'flex',
    alignSelf: 'flex-end'
  },
  image: {
    width: '100%',
    height: 'auto'
  }
}))

function Register() {
  const [state, setState] = useState({
    login: '',
    firstPassword: '',
    secondPassword: '',
    email: ''
  })

  const classes = useStyles()
  const dispatch = useDispatch()
  useEffect(() => () => reset(), [])
  const registrationSuccess = useSelector(
    state => state.register.registrationSuccess
  )
  const registrationFailure = useSelector(
    state => state.register.registrationFailure
  )
  const handleChange = name => event => {
    name === 'email' && emailChecker(event.target.value)
    setState({ ...state, [name]: event.target.value })
    event.preventDefault()
  }

  const handleRegister = (login, email, firstPassword) => {
    dispatch(register(login, email, firstPassword))
  }
  const emailChecker = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  return (
    <Paper>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={registrationFailure || registrationSuccess}
        autoHideDuration={6000}
        message={
          <span id='message-id'>
            {registrationSuccess
              ? 'Registration success! Please check your email to verify your account.'
              : registrationFailure
              ? 'An error occured during your registration. Please try again.'
              : ''}
          </span>
        }
      />
      <Grid container>
        <Grid item xs={12} md={4}>
          <div className={classes.firstContainer}>
            <div className={classes.firstWrapper}>
              <div className={classes.firstTitle}>
                <Typography gutterBottom variant='h5' component='h2'>
                  Register
                </Typography>
              </div>
              <FormControl>
                <TextField
                  label='Username'
                  id='login-input'
                  margin='normal'
                  variant='outlined'
                  value={state.login}
                  onChange={handleChange('login')}
                />
                <TextField
                  label='Email'
                  id='email-input'
                  margin='normal'
                  variant='outlined'
                  value={state.email}
                  error={state.email !== '' && !emailChecker(state.email)}
                  helperText={
                    state.email !== '' &&
                    !emailChecker(state.email) &&
                    'Please input a valid email'
                  }
                  onChange={handleChange('email')}
                />
                <TextField
                  label='Password'
                  id='first-password-input'
                  margin='normal'
                  variant='outlined'
                  type='password'
                  value={state.firstPassword}
                  onChange={handleChange('firstPassword')}
                />
                <TextField
                  label='Password Confirmation'
                  id='second-password-input'
                  margin='normal'
                  variant='outlined'
                  type='password'
                  error={state.secondPassword !== state.firstPassword}
                  value={state.secondPassword}
                  onChange={handleChange('secondPassword')}
                  helperText={
                    state.secondPassword !== '' &&
                    state.secondPassword !== state.firstPassword
                      ? "Passwords don't match"
                      : ''
                  }
                />
              </FormControl>
            </div>
            <div className={classes.button}>
              <Button
                variant='contained'
                color='primary'
                onClick={() =>
                  handleRegister(state.login, state.email, state.firstPassword)
                }
              >
                Register
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <div className={classes.secondContainer}>
            <div className={classes.secondTitle}>
              <Typography gutterBottom variant='h5' component='h2'>
                Sign In
              </Typography>
            </div>
            <img
              src={require('../img/grizzbear.svg')}
              className={classes.image}
              alt='Grizz bear with weight'
            />
            <div className={classes.secondTitle}>
              <Typography gutterBottom variant='h6' component='h2'>
                Get back on track!
              </Typography>
            </div>
            <div className={classes.button}>
              <Button variant='contained' color='secondary' href='/login'>
                Sign In
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Register
