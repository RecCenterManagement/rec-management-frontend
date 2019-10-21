import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}))

export default function ReservationsList() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' color="primary">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='Reservations category tabs'
          centered
        >
          <Tab label='Past'/>
          <Tab label='Pending'/>
          <Tab label='Upcoming'/>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Past reservations
      </TabPanel>
      <TabPanel value={value} index={1}>
        Pending Reservations
      </TabPanel>
      <TabPanel value={value} index={2}>
        Upcoming Reservations
      </TabPanel>
    </div>
  )
}
