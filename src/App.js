import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useSelector } from 'react-redux'
import { Button, Drawer } from '@material-ui/core';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './components/Login'
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: 'white',
    textDecoration: 'none',
    flexGrow: 1,
  },
}));

const Home = () => {
  const classes = useStyles()
  const authenticated = useSelector(state => state.authentication.isAuthenticated)
  const [drawer, setDrawer] = useState(false)

  return (
    <>
    <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} component={Link} to="/">
            RecCenterManagement
          </Typography>
            {authenticated && <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => console.log("HELLO")}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={false}
                onClose={() => console.log("HELLO")}
              >
                <MenuItem onClick={() => console.log("HELLO")}>Profile</MenuItem>
                <MenuItem onClick={() => console.log("HELLO")}>My account</MenuItem>
              </Menu>
            </div>}
        </Toolbar>
      </AppBar>
      <Drawer open={drawer} onClose={() => setDrawer(false)}>
        Hello
      </Drawer>
      </>
      )
}

const Register = () => (<div></div>)
function App() {

  return (
    <Router>
      <div>
      <Button component={Link} to="/">Home</Button>
      <Button component={Link} to="/login">Login</Button>
      <Button component={Link} to="/register">Register</Button>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login} />
        <Route path="/topics" component={Register} />
      </div>
    </Router>
  );
}

export default App;
