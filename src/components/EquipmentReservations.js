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
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { get_equipment_reservations, put_equipment_reservation } from '../actions/equipment-reservations'

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

  const [open, setOpen] = useState(false)
  const [selectedEntity, setSelectedEntity] = useState({})
  const [editable, setEditable] = useState('view')

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = (type, entity) => {
    setEditable(type === 'edit')
    setSelectedEntity(entity)
    setOpen(true)
  }

  useEffect(
    () => {
      dispatch(get_equipment_reservations())
    },
    [dispatch]
  )

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          className={classes.cardHeader}
          title="Equipment Reservations"
        />
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Count</TableCell>
              <TableCell align="left">Equipment</TableCell>
              <TableCell align="left">Equipment Inventory</TableCell>
              <TableCell align="left">Reservation Title</TableCell>
              <TableCell align="left">Reservation Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entities &&
              entities.map(row => (
                <TableRow key={row.id}>
                  <TableCell align="left">{row.count}</TableCell>
                  <TableCell align="left">{row.equipment.name}</TableCell>
                  <TableCell align="left">
                    {row.equipment.inventorySize}
                  </TableCell>
                  <TableCell align="left">{row.reservation.event}</TableCell>
                  <TableCell align="left">{row.reservation.status}</TableCell>
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
      <EquipmentReservationDialog
        open={open}
        handleClose={handleClose}
        entity={selectedEntity}
        editable={editable}
      />
    </>
  )
}

const EquipmentReservationDialog = props => {
  const { open, handleClose, editable } = props
  const dispatch = useDispatch()

  const [entity, setEntity] = useState({
    id: 0,
    count: 0,
    equipment: {
      id: 0,
      name: '',
      inventorySize: 0
    },
    reservation: {
      id: 0,
      event: '',
      estimatedParticipants: 0,
      status: 'PENDING'
    }
  })

  useEffect(
    () => {
      if (props.entity && props.entity.id) {
        setEntity({
          id: props.entity.id,
          count: props.entity.count,
          equipment: {
            id: props.entity.equipment.id,
            name: props.entity.equipment.name,
            inventorySize: props.entity.equipment.inventorySize
          },
          reservation: {
            id: props.entity.reservation.id,
            event: props.entity.reservation.event,
            estimatedParticipants:
              props.entity.reservation.estimatedParticipants,
            status: props.entity.reservation.status
          }
        })
      }
    },
    [props.entity]
  )

  const handleChange = name => event => {
    setEntity({ ...entity, [name]: event.target.value })
  }

  const handleSave = () => {
    dispatch(put_equipment_reservation(entity))
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle id="form-dialog-title">
        Equipment Reservation Editor
      </DialogTitle>
      <DialogContent>
        <TextField
          style={{ margin: '12px' }}
          id="id"
          label="Entity Count"
          type="number"
          fullWidth
          onChange={handleChange('count')}
          value={entity.count}
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id="name"
          label="Equipment Name"
          value={entity.equipment.name}
          type="text"
          onChange={handleChange('name')}
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id="name"
          label="Inventory Size"
          value={entity.equipment.inventorySize}
          type="number"
          onChange={handleChange('inventorySize')}
          fullWidth
        />
      </DialogContent>
      {editable && (
        <DialogActions>
          <Button onClick={handleSave} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="secondary">
            Save
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

export default Reservations
