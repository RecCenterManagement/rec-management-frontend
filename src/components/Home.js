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
import { Drawer } from '@material-ui/core';
import { Link } from "react-router-dom";

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
    flexGrow: 1
  },
  jhNavbar: {
    backgroundColor: '#1f242b',
    padding: '0.2em 1em'
  },
  profileImage: {
      margin: '-10px 0px',
      height: '40px',
      width: '40px',
      borderRadius: '50%'
  }
}));

const Home = () => {
  const classes = useStyles()
  const authenticated = useSelector(state => state.authentication.isAuthenticated)
  const [menuOpen, setMenuOpen] = useState(false)
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
                onClick={() => setMenuOpen(true)}
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
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
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

export default Home