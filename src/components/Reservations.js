import React, { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ButtonGroup,
  Button
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { get_reservations } from '../actions/reservations'
import ReservationsDialog from './ReservationForm.js'

const useStyles = makeStyles(theme => ({
  root: {
    overflowX: 'hide',
    margin: 24
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.light,
    color: 'black'
  }
}))

const Reservations = props => {
  const classes = useStyles()
  const entities = useSelector(state => state.reservations.entities)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [selectedEntity, setSelectedEntity] = useState({})
  const [editable, setEditable] = useState('view')

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = (type, entity) => {
    if (type === 'edit') {
      setEditable(true)
    } else {
      setEditable(false)
    }
    setSelectedEntity(entity)
    setOpen(true)
  }

  useEffect(
    () => {
      dispatch(get_reservations())
    },
    [dispatch]
  )

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          className={classes.cardHeader}
          title="Reservation Entities"
        />
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Event</TableCell>
              <TableCell align="left">Estimated Particpants</TableCell>
              <TableCell align="left">Start Time</TableCell>
              <TableCell align="left">End Time</TableCell>
              <TableCell align="left">User</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entities &&
              entities.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">{row.event}</TableCell>
                  <TableCell align="left">
                    {row.estimatedParticipants}
                  </TableCell>
                  <TableCell align="left">{row.startTime}</TableCell>
                  <TableCell align="left">{row.endTime}</TableCell>
                  <TableCell align="left">{row.user.id}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup>
                      <Button onClick={() => handleOpen('view', row)}>
                        View
                      </Button>
                      <Button onClick={() => handleOpen('edit', row)}>
                        Edit
                      </Button>
                      <Button>Delete</Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>
      <ReservationsDialog
        open={open}
        handleClose={handleClose}
        entity={selectedEntity}
        editable={editable}
        create={false}
      />
    </>
  )
}

export default Reservations
