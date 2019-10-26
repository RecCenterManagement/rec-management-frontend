import React, { useEffect, useState } from 'react'
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
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent
} from '@material-ui/core'
import Reservations from './Reservations'
import {
  get_reservations_by_user_id,
  delete_reservation
} from '../actions/reservations'

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
  const [open, setOpen] = useState(false)
  const [openDelte, setOpenDelte] = useState(false)
  const [selectedEntity, setSelectedEntity] = useState({})

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleCloseDelte = () => {
    setOpenDelte(false)
  }
  const handleOpen = (type, entity) => {
    if (type === 'delete') {
      setOpenDelte(true)
    } else if (type === 'edit') {
      setOpen(true)
    } else {
      setOpen(true)
    }
    setSelectedEntity(entity)
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
      setFilteredReservations(
        reservations.filter(
          res => res.status === value
          // &&  (new Date(res.startTime) > date && new Date(res.endTime) > date)
        )
      )
    }
  }
  useEffect(() => {
    handleFilterReservations()
  }, [reservations, value])
  console.log(reservations)
  return (
    <>
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
                      {index === 3 && (
                        <TableCell align='left'>Status</TableCell>
                      )}
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
                              <Button onClick={() => handleOpen('delete', row)}>
                                Delete
                              </Button>
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
      <ConfirmationDialog
        open={openDelte}
        handleCloseDelte={handleCloseDelte}
        entity={selectedEntity}
      />
    </>
  )
}
const ConfirmationDialog = props => {
  const { open, handleCloseDelte } = props
  const dispatch = useDispatch()

  const [entity, setEntity] = useState({
    id: 0,
    event: ''
  })

  useEffect(() => {
    setEntity({
      id: props.entity.id,
      event: props.entity.event
    })
  }, [props.entity])
  const handleDelete = () => {
    dispatch(delete_reservation(entity.id))
    handleCloseDelte()
  }

  return (
    <Dialog open={open} onClose={handleCloseDelte} fullWidth={true}>
      <DialogTitle id='form-dialog-title'>
        Are you sure you want to delete this event?
      </DialogTitle>
      <DialogContent>
        <Typography>
          You are about to delete your reservationt for the following event{' '}
          {entity.event}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDelte} color='secondary'>
          Cancel
        </Button>
        <Button onClick={handleDelete} color='secondary'>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
