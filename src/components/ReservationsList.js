import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import {
  AppBar,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ButtonGroup,
  Button,
  Typography,
  Box
} from '@material-ui/core'
import Reservations from './Reservations'
import { get_reservations } from '../actions/reservations'

function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}))

export default function ReservationsList() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const accountID = useSelector(state => state.authentication.account.id)
  const allReservations = useSelector(state => state.reservations.entities)
  const dispatch = useDispatch()
  const [reservations, setReservations] = useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  useEffect(() => {
    dispatch(get_reservations())
  }, [dispatch])

  useEffect(() => {
    setReservations(
      allReservations.filter(reservation => reservation.user.id === accountID)
    )
  }, [allReservations])

  const handleFilterReservations = () => { 
    let temp = []
    let date = new Date()
    reservations.map(reservation => {
      let start = new Date(reservation.startTime)
      let end = new Date(reservation.endTime)
      switch (date) {
        case date > start && date > end:
          temp.push(reservation)
          break
        case date <= start /*&& status === approved*/:
          temp.push(reservation)
          break
        case date <= start /*&& status === pending*/:
          temp.push(reservation)
          break
        default:
          break
      }
    })
    setReservations(temp)
  }
  console.log(reservations)
  return (
    <div className={classes.root}>
      <AppBar position='static' color='primary'>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='Reservations category tabs'
          centered
        >
          <Tab label='Past' />
          <Tab label='Pending' />
          <Tab label='Upcoming' />
        </Tabs>
      </AppBar>
      {[0, 1, 2].map((panel, index) => {
        return (
          <TabPanel value={value} index={index}>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='left'>Event</TableCell>
                  <TableCell align='left'>Estimated Particpants</TableCell>
                  <TableCell align='left'>Start Time</TableCell>
                  <TableCell align='left'>End Time</TableCell>
                  { index === 0 && <TableCell align='left'>Status</TableCell>}

                  <TableCell align='center'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reservations &&
                  reservations.map(row => (
                    <TableRow key={row.name}>
                      <TableCell align='left'>{row.event}</TableCell>
                      <TableCell align='left'>
                        {row.estimatedParticipants}
                      </TableCell>
                      <TableCell align='left'>{row.startTime}</TableCell>
                      <TableCell align='left'>{row.endTime}</TableCell>
                      { index === 0 && <TableCell align='left'>Status</TableCell>}
                      <TableCell align='center'>
                        <ButtonGroup>
                          {(index === 1 || index === 2) && (
                            <Button>Cancel</Button>
                          )}
                          {index === 1 && <Button>Edit</Button>}
                          <Button>View</Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabPanel>
        )
      })}
    </div>
  )
}
