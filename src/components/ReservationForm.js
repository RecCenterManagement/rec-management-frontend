import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField
} from '@material-ui/core'

const ReservationsDialog = props => {
  const { open, handleClose, editable } = props

  const [entity, setEntity] = useState(props.entity)

  useEffect(
    () => {
      setEntity(props.entity)
    },
    [props.entity]
  )

  const handleChange = event => {
    setEntity(event.target.value)
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
          onChange={handleChange}
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id="name"
          label="Estimated Participants"
          value={entity.estimatedParticipants}
          type="number"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id="name"
          label="Start Time"
          value={entity.startTime}
          type="DateTimeOffset"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id="name"
          label="End Time"
          value={entity.endTime}
          type="datetime"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id="name"
          label="User"
          value={entity.user}
          type="text"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id="name"
          label="Facilities"
          value={entity.facilities}
          type="text"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id="name"
          label="Equipment"
          value={entity.equipmentReservations}
          type="text"
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      {editable && (
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="secondary">
            Save
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

export default ReservationsDialog
