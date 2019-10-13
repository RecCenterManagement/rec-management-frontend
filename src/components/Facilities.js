import React, { useState, useEffect } from 'react'
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
import { get_facilities } from '../actions/facilities'

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

const Facilities = props => {
  const classes = useStyles()
  const entities = useSelector(state => state.facilities.entities)
  const dispatch = useDispatch()

  useEffect(
    () => {
      dispatch(get_facilities())
    },
    [dispatch]
  )

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.cardHeader} title="Facility Entities" />
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="right">Footage</TableCell>
            <TableCell align="right">Capacity</TableCell>
            <TableCell align="right">AV Support</TableCell>
            <TableCell align="right">Food Allowed</TableCell>
            <TableCell align="right">Color Code</TableCell>
            <TableCell align="right">Description</TableCell>
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
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="right">{row.footage}</TableCell>
                <TableCell align="right">{row.capacity}</TableCell>
                <TableCell align="right">{row.avSupport}</TableCell>
                <TableCell align="right">{row.foodAllowed}</TableCell>
                <TableCell align="right">{row.colorCode}</TableCell>
                <TableCell align="right">{row.description}</TableCell>
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

export default Facilities
