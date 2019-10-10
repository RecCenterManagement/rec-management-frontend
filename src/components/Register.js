import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import { Button, Paper, FormControl, Grid, TextField, Typography } from '@material-ui/core';
import { register, reset } from '../actions/registration';

const useStyles = makeStyles(theme => ({
    registerBackground: {
        backgroundColor: theme.primary
    }
}));

function Register() {
    const [state, setState] = useState({
        login: '',
        firstPassword: '',
        secondPassword: '',
        email: '',
    })

    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => () => reset(), []);

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.value });
        event.preventDefault();
        };

    const handleRegister = (login, email, firstPassword ) => {
        dispatch(register(login, email, firstPassword));
    };

    return (
        <Paper>
            <Grid container spacing={2}>
                <Grid item>
                    <Typography gutterBottom variant="h5" component="h2">
                        Register
                </Typography>
                    <FormControl>
                        <TextField
                            label="Username"
                            id="login-input"
                            margin="normal"
                            variant="outlined"
                            value={state.login}
                            onChange={handleChange('login')}
                        />
                        <TextField
                            label="Email"
                            id="email-input"
                            margin="normal"
                            variant="outlined"
                            value={state.email}
                            onChange={handleChange('email')}
                        />
                        <TextField
                            label="Password"
                            id="first-password-input"
                            margin="normal"
                            variant="outlined"
                            type="password"

                            value={state.firstPassword}
                            onChange={handleChange('firstPassword')}
                        />
                        <TextField
                            label="Password Confirmation"
                            id="second-password-input"
                            margin="normal"
                            variant="outlined"
                            type="password"
                            error={state.secondPassword!==state.firstPassword}
                            value={state.secondPassword}
                            onChange={handleChange('secondPassword')}
                            helperText={(state.secondPassword !=='' && state.secondPassword!==state.firstPassword ) ? "Passwords don't match":''}
                        />
                        <Button variant="contained" color="primary" onClick={()=>handleRegister(state.login, state.email, state.firstPassword )}>Register</Button>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Typography gutterBottom variant="h5" component="h2">
                        Get back on track
                    </Typography>
                    <Button variant='outlined' color='secondary' href="/login" >Sign In</Button>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Register;