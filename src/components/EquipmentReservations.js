import React, { useEffect } from 'react'
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
import { get_equipment_reservations } from '../actions/equipment-reservations'

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
  const entities = useSelector(state => state.equipment_reservations.entities)
  const dispatch = useDispatch()

  useEffect(
    () => {
      dispatch(get_equipment_reservations())
    },
    [dispatch]
  )

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.cardHeader} title="Reservation Entities" />
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">Count</TableCell>
            <TableCell align="left">Equipment</TableCell>
            <TableCell align="left">Reservation</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entities &&
            entities.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.count}</TableCell>
                <TableCell align="left">{row.equipment.name}</TableCell>
                <TableCell align="left">{row.reservation.event}</TableCell>
                <TableCell align="center">
                  <ButtonGroup>
                    <Button>View</Button>
                    <Button>Save</Button>
                    <Button>Delete</Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>
  )
}

export default Reservations
