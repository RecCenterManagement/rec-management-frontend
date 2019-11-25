import React, { useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { useDispatch, useSelector } from 'react-redux'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { Button, MenuList, useMediaQuery, useTheme } from '@material-ui/core'
import RecDrawer from './RecDrawer'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { Link, useHistory } from 'react-router-dom'
import { logout } from '../actions/authentication'

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
  },
  floatContainer: {
    width: "100%"
  },
  floatDiv: {
    float: "right"
  }
}))

export const SignInLogOut = props => {
  /*
  Invoked when the user presses the 'logout' button.
  Dispatches a logout event to Redux, jumps to homepage and refreshes
  */
  const history = useHistory()
  const dispatch = useDispatch()
  function handleLogOut() {
    dispatch(logout())
    history.push('/')
    window.location.reload()
  }

  return props.authenticated ? (
    <Button
      component={Link}
      style={{ marginLeft: '20px' }}
      variant="outlined"
      color="secondary"
      onClick={handleLogOut}
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
}

const Header = () => {
  const classes = useStyles()
  const authenticated = useSelector(
    state => state.authentication.isAuthenticated
  )
  const roles = useSelector(state => state.authentication.account.authorities)
  let isAdmin = false
  if (roles) {
    isAdmin = roles.includes('ROLE_ADMIN')
  }

  const materialTheme = useTheme();
  const titleVisible = useMediaQuery(materialTheme.breakpoints.up('sm'));
  const [menuOpen, setMenuOpen] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [adminMenu, setAdminMenu] = useState(false)
  const [currentEntity, setCurrentEntity] = useState('')
  const anchorRef = useRef(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
    setMenuOpen(true)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setMenuOpen(false)
  }

  const handleEntityClick = name => {
    setCurrentEntity(name)
    setAdminMenu(false)
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
          {titleVisible && (
            <Typography
              variant="h6"
              className={classes.title}
              component={Link}
              to="/"
            >
              RecCenterManagement
          </Typography>
          )}
          <div className={classes.floatContainer}>
            <div className={classes.floatDiv}>
              {authenticated && (
                <>
                  <Button
                    color="secondary"
                    ref={anchorRef}
                    size="small"
                    aria-owns={true ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={() => setAdminMenu(true)}
                  >
                    Entities
                <ExpandMore />
                  </Button>
                  <Popper
                    open={adminMenu}
                    anchorEl={anchorRef.current}
                    transition
                    disablePortal
                    style={{ zIndex: 1 }}
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === 'bottom' ? 'center top' : 'center bottom'
                        }}
                      >
                        <Paper id="menu-list-grow">
                          <ClickAwayListener
                            onClickAway={() => setAdminMenu(false)}
                          >
                            <MenuList>
                              <MenuItem
                                component={Link}
                                to="/users"
                                onClick={() => handleEntityClick('users')}
                                selected={currentEntity === 'users'}
                              >
                                Users
                          </MenuItem>
                              <MenuItem
                                component={Link}
                                to="/facilities"
                                onClick={() => handleEntityClick('fac')}
                                selected={currentEntity === 'fac'}
                              >
                                Facilities
                          </MenuItem>
                              <MenuItem
                                component={Link}
                                to="/reservations"
                                onClick={() => handleEntityClick('res')}
                                selected={currentEntity === 'res'}
                              >
                                Reservations
                          </MenuItem>
                              <MenuItem
                                component={Link}
                                to="/equipment"
                                onClick={() => handleEntityClick('equ')}
                                selected={currentEntity === 'equ'}
                              >
                                Equipment
                          </MenuItem>
                              <MenuItem
                                component={Link}
                                to="/equipment-reservations"
                                onClick={() => handleEntityClick('equ-res')}
                                selected={currentEntity === 'equ-res'}
                              >
                                Equipment Reservations
                          </MenuItem>
                              <MenuItem
                                component={Link}
                                to="/equipment-bundles"
                                onClick={() => handleEntityClick('equ-bun')}
                                selected={currentEntity === 'equ-bun'}
                              >
                                Equipment Bundles
                          </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
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
                    <MenuItem component={Link} onClick={handleClose} to="/settings">
                      Settings
                </MenuItem>
                    <MenuItem component={Link} onClick={handleClose} to="/my-reservations">
                      My Reservations
                </MenuItem>
                  </Menu>
                </>
              )}
              <SignInLogOut authenticated={authenticated} />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <RecDrawer open={drawer} onClose={() => setDrawer(false)} />
    </>
  )
}

export default Header
