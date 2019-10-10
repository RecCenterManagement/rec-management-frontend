import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { useSelector } from 'react-redux'
import { Drawer, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    color: 'white',
    textDecoration: 'none',
    flexGrow: 1
  },
  jhNavbar: {
    backgroundColor: '#1f242b'
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

const Header = () => {
  const classes = useStyles()
  const authenticated = useSelector(
    state => state.authentication.isAuthenticated
  )
  const [menuOpen, setMenuOpen] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
    setMenuOpen(true)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setMenuOpen(false)
  }

  return (
    <>
      <AppBar className={classes.jhNavbar} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}
            component={Link}
            to="/"
          >
            RecCenterManagement
          </Typography>
          {authenticated && (
            <div>
              <IconButton
                id="account-icon-button"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={menuOpen}
                onClose={handleClose}
              >
                <MenuItem component={Link} to="/settings">
                  Settings
                </MenuItem>
                <MenuItem onClick={() => console.log('HELLO')}>
                  My account
                </MenuItem>
              </Menu>
            </div>
          )}
          <SignInLogOut authenticated={authenticated} />
        </Toolbar>
      </AppBar>
      <Drawer open={drawer} onClose={() => setDrawer(false)}>
        Hello
      </Drawer>
    </>
  )
}

export default Header
