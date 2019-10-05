import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, Checkbox, FormControl, FormControlLabel, Grid, TextField, Typography } from '@material-ui/core';
import { login } from '../actions/authentication';

const useStyles = makeStyles(theme => ({
    registerBackground: {
        backgroundColor: theme.primary
    }
}));

function Login() {
    const [state, setState] = useState({
        rememberMe: false,
        username: '',
        password: ''
    })

    const classes = useStyles();    
    const dispatch = useDispatch();
    let history = useHistory();
    const handleChange = name => event => {
        switch (name) {
            case 'rememberMe':
                setState({ ...state, [name]: event.target.checked });
                break;
            default:
                setState({ ...state, [name]: event.target.value });
                break;
        }
    };
    const handleLogin = (username, password, rememberMe = false) => {
        dispatch(login(username, password, rememberMe))
        history.push('/')        
    }
     return (
        <>
         <Paper>
            <Grid container spacing={2}>
                <Grid item>
                    <Typography gutterBottom variant="h5" component="h2">
                        Sign In
                </Typography>
                    <FormControl>
                        <TextField
                            label="Username"
                            id="username-input"
                            margin="normal"
                            variant="outlined"
                            value={state.username}
                            onChange={handleChange('username')}
                        />
                        <TextField
                            label="Password"
                            id="password-input"
                            margin="normal"
                            variant="outlined"
                            type="password"

                            value={state.password}
                            onChange={handleChange('password')}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={state.rememberMe}
                                    onChange={handleChange("rememberMe")}
                                    value="rememberMe"
                                />
                            }
                            label="Remember me"
                        />
                        <Typography>Did you forget your password?</Typography>
                        <Button variant='outlined' color='secondary' href="/reset/request">Reset Password</Button>
                        <Button variant="contained" color="primary" onClick={() => handleLogin(state.username, state.password, state.rememberMe)}> Sign In</Button>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Typography gutterBottom variant="h5" component="h2">
                        You don't have an account yet?
          </Typography>
                    <Button variant='outlined' color='secondary' href="/register" >Register</Button>
                </Grid>
            </Grid>
        </Paper>
        </>
    );
}

export default Login;