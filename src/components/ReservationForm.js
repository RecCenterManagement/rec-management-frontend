import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { create_reservation, put_reservation } from '../actions/reservations'

const ReservationsDialog = props => {
  const { open, handleClose, editable, create } = props

  const dispatch = useDispatch()

  const [entity, setEntity] = useState({
    id: 0,
    event: '',
    estimatedParticipants: 0,
    startTime: '',
    endTime: '',
    user: '',
    facilities: [''],
    equipmentReservations: '',
    facilityObject: {}
  })

  useEffect(() => {
    setEntity({
      id: props.entity.id,
      event: props.entity.event,
      estimatedParticipants: props.entity.estimatedParticipants,
      startTime: props.entity.startTime,
      endTime: props.entity.endTime,
      user: props.entity.user ? props.entity.user.login : props.entity.user,
      facilities: props.entity.facilities
        ? props.entity.facilities.name
        : props.entity.facilities,
      facilitiesObject: props.entity.facilities,
      equipmentReservations: props.entity.equipmentReservations
    })
  }, [props.entity])

  const handleChange = name => event => {
    setEntity({ ...entity, [name]: event.target.value })
  }

  const handleSave = () => {
    if (create) {
      dispatch(create_reservation(entity))
    } else {
      dispatch(put_reservation(entity))
    }
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <DialogTitle id="form-dialog-title">Reservation Editor</DialogTitle>
      <DialogContent>
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id="name"
          label="Event"
          value={entity.event}
          type="text"
          onChange={handleChange('event')}
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id="name"
          label="Estimated Participants"
          value={entity.estimatedParticipants}
          type="number"
          onChange={handleChange('estimatedParticipants')}
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id="name"
          label="Start Time"
          value={entity.startTime}
          type="DateTimeOffset"
          onChange={handleChange('startTime')}
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id="name"
          label="End Time"
          value={entity.endTime}
          type="datetime"
          onChange={handleChange('endTime')}
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id="name"
          label="User"
          value={entity.user}
          type="text"
          onChange={handleChange('user')}
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id="name"
          label="Facilities"
          value={entity.facilities}
          type="text"
          onChange={handleChange('facilities')}
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id="name"
          label="Equipment"
          value={entity.equipmentReservations}
          type="text"
          onChange={handleChange('equipmentReservations')}
          fullWidth
        />
      </DialogContent>
      {editable && (
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
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

export default ReservationsDialog
