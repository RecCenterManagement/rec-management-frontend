import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Drawer,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@material-ui/core'
import OpenInNew from '@material-ui/icons/OpenInNew'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
}))

const RecDrawer = props => {
  const classes = useStyles()
  const [facilities_open, set_facilities_open] = useState(false)
  return (
    <Drawer open={props.open} onClose={props.onClose}>
      <List>
        <ListItem button component={Link} to="/" onClick={props.onClose}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/aboutus" onClick={props.onClose}>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button component={Link} to='/facilityhours' onClick={props.onClose}>
          <ListItemText primary='Facility Hours' />
        </ListItem>
        <ListItem button component={Link} to='/stayconnected' onClick={props.onClose}>
          <ListItemText primary='Stay Connected' />
        </ListItem>
        <ListItem button component={Link} to='/membership' onClick={props.onClose}>
          <ListItemText primary='Membership Info' />
        </ListItem>

        <Divider />
        <ListItem button onClick={() => set_facilities_open(!facilities_open)}>
          <ListItemText primary='Recreation Facilities' />
          {facilities_open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        
        <Collapse in={facilities_open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem className={classes.nested} button component={Link} to="/aquaticcenter" onClick={props.onClose}>
              <ListItemText primary="Aquatic Center" />
            </ListItem>
            <ListItem className={classes.nested} button component={Link} to="/recreationcenter" onClick={props.onClose}>
              <ListItemText primary="Recreation Center" />
            </ListItem>
            <ListItem className={classes.nested} button component={Link} to="/fitnesscourt" onClick={props.onClose}>
              <ListItemText primary="Fitness Court" />
            </ListItem>
            <ListItem className={classes.nested} button component={Link} to="/outdoorcomplex" onClick={props.onClose}>
              <ListItemText primary="Outdoor Complex" />
            </ListItem>
            <ListItem className={classes.nested} button component={Link} to="/plannedprojects" onClick={props.onClose}>
              <ListItemText primary="Planned Projects" />
            </ListItem>
            <ListItem className={classes.nested} button component={Link} to="/policies" onClick={props.onClose}>
              <ListItemText primary="Policies" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Drawer>
  )
}

export default RecDrawer
