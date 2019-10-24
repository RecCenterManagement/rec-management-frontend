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
  Box,
  Grid
} from '@material-ui/core'
import Reservations from './Reservations'
import { get_reservations_by_user_id } from '../actions/reservations'

function TabPanel(props) {
  const { children, value, index, name, ...other } = props
  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== name}
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
  const [value, setValue] = React.useState('APPROVED')
  const accountID = useSelector(state => state.authentication.account.id)
  const reservations = useSelector(state => state.reservations.entities)
  const [date, setDate] = useState(new Date())
  const [filteredReservations, setFilteredReservations] = useState([])
  const dispatch = useDispatch()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    if (accountID) {
      console.log(accountID)
      dispatch(get_reservations_by_user_id(accountID))
    }
  }, [dispatch, accountID])

  const handleFilterReservations = () => {
    if (value === 'PAST') {
      setFilteredReservations(
        reservations.filter(
          res => Date(res.startTime) < date && Date(res.endTime) < date
        )
      )
    } else {
      setFilteredReservations(reservations.filter(res => res.status === value))
    }
  }
  useEffect(() => {
    handleFilterReservations()
  }, [reservations, value])

  return (
    <div className={classes.root}>
      <AppBar position='static' color='primary'>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='Reservations category tabs'
          centered
        >
          <Tab value='APPROVED' label='Approved' />
          <Tab value='PENDING' label='Pending' />
          <Tab value='DENIED' label='Denied' />
          <Tab value='PAST' label='History' />
        </Tabs>
      </AppBar>
      {reservations &&
      reservations.filter(res => res.status === value).length !== 0 ? (
        ['APPROVED', 'PENDING', 'DENIED', 'PAST'].map((panel, index) => {
          return (
            <TabPanel value={value} name={panel} index={index}>
              <Table aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell align='left'>Event</TableCell>
                    <TableCell align='left'>Estimated Particpants</TableCell>
                    <TableCell align='left'>Start Time</TableCell>
                    <TableCell align='left'>End Time</TableCell>
                    {index === 3 && <TableCell align='left'>Status</TableCell>}
                    <TableCell align='center'>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredReservations.map(row => (
                    <TableRow key={row.name}>
                      <TableCell align='left'>{row.event}</TableCell>
                      <TableCell align='left'>
                        {row.estimatedParticipants}
                      </TableCell>
                      <TableCell align='left'>{row.startTime}</TableCell>
                      <TableCell align='left'>{row.endTime}</TableCell>
                      {index === 3 && (
                        <TableCell align='left'>Status</TableCell>
                      )}
                      <TableCell align='center'>
                        <ButtonGroup>
                          <Button>View</Button>
                          {index === 1 && <Button>Edit</Button>}
                          {(index === 0 || index === 1) && (
                            <Button>Cancel</Button>
                          )}
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabPanel>
          )
        })
      ) : (
        <div style={{ padding: '20px' }}>
          <Typography>No reservations for this criteria</Typography>
        </div>
      )}
    </div>
  )
}
