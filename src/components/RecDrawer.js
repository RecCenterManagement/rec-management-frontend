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
import { BrowserRouter as Link } from 'react-router-dom'

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
        <ListItem button component={Link} to='/aboutus'>
          <ListItemText primary='About' />
        </ListItem>
        <ListItem button component={Link} to='/facilityhours'>
          <ListItemText primary='Facility Hours' />
        </ListItem>
        <ListItem button component={Link} to='/stayconnected'>
          <ListItemText primary='Stay Connected' />
        </ListItem>

        <Divider />
        <ListItem button onClick={() => set_facilities_open(!facilities_open)}>
          <ListItemText primary='Recreation Facilities' />
          {facilities_open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={facilities_open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {[
              'Aquatic Center',
              'Recreation Center',
              'Fitness Court',
              'Outdoor Complex',
              'Planned Projects',
              'Policies'
            ].map((text, index) => (
              <ListItem className={classes.nested} button key={text}>
                <ListItemText primary={text} />
                <ListItemIcon style={{ justifyContent: 'flex-end' }}>
                  <OpenInNew />
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </Drawer>
  )
}

export default RecDrawer
