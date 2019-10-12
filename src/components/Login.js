import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Paper,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography
} from '@material-ui/core'
import { login } from '../actions/authentication'

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

function Login() {
  const [state, setState] = useState({
    rememberMe: false,
    username: '',
    password: ''
  })

  const classes = useStyles()
  const dispatch = useDispatch()
  let history = useHistory()
  const handleChange = name => event => {
    switch (name) {
      case 'rememberMe':
        setState({ ...state, [name]: event.target.checked })
        break
      default:
        setState({ ...state, [name]: event.target.value })
        break
    }
  }
  const handleLogin = (username, password, rememberMe = false) => {
    dispatch(login(username, password, rememberMe))
    history.push('/')
  }
  return (
    <>
      <Paper>
        <Grid container>
          <Grid item xs={12} md={4}>
            <div className={classes.firstContainer}>
              <div className={classes.firstWrapper}>
                <div className={classes.firstTitle}>
                  <Typography gutterBottom variant='h5' component='h1'>
                    Sign In
                  </Typography>
                </div>
                <FormControl>
                  <TextField
                    label='Username'
                    id='username-input'
                    margin='normal'
                    variant='outlined'
                    value={state.username}
                    onChange={handleChange('username')}
                  />
                  <TextField
                    label='Password'
                    id='password-input'
                    margin='normal'
                    variant='outlined'
                    type='password'
                    value={state.password}
                    onChange={handleChange('password')}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.rememberMe}
                        onChange={handleChange('rememberMe')}
                        value='rememberMe'
                      />
                    }
                    label='Remember me'
                  />
                  <Typography gutterBottom>
                    Did you forget your password?
                  </Typography>
                  <Button
                    variant='outlined'
                    color='secondary'
                    href='/reset/request'
                  >
                    Reset Password
                  </Button>
                </FormControl>
              </div>
              <div className={classes.button}>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() =>
                    handleLogin(
                      state.username,
                      state.password,
                      state.rememberMe
                    )
                  }
                >
                  Sign In
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={8}>
            <div className={classes.secondContainer}>
              <div className={classes.secondTitle}>
                <Typography gutterBottom variant='h6' component='h2'>
                  Register
                </Typography>
              </div>
              <img
                src={require('../img/grizzbear.svg')}
                className={classes.image}
                alt='Grizz bear with weight'
              />
              <div className={classes.secondTitle}>
                <Typography gutterBottom variant='h6' component='h2'>
                  You don't have an account yet?
                </Typography>
              </div>
              <div className={classes.button}>
                <Button variant='contained' color='secondary' href='/register'>
                  Register
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default Login
