import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { create_reservation, put_reservation } from '../actions/reservations'
import { get_facilities } from '../actions/facilities'

const ReservationsDialog = props => {
  const { open, handleClose, editable, create } = props
  
  // List of fetched facilities.
  const allFacilities = useSelector(state => state.facilities.entities);
  
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
    status: 'PENDING'
  })

  // Facilities currently selected.
  const filteredFacilities = allFacilities.filter(facility => entity.facilities.includes(String(facility.id)))

  useEffect(
    () => {
      setEntity(oldState => ({
        id: props.entity.id,
        status: 'PENDING',
        event: props.entity.event,
        estimatedParticipants: props.entity.estimatedParticipants,
        startTime: props.entity.startTime,
        endTime: props.entity.endTime,
        user: props.entity.user ? props.entity.user.login : props.entity.user,
        facilities: props.entity.facilities,
        equipmentReservations: props.entity.equipmentReservations,
      }))
      dispatch(get_facilities)
    },
    [dispatch, props.entity]
  )

  const handleChange = name => event => {
    setEntity({ ...entity, [name]: event.target.value });
  }

  const getCapacity = () => {
    // Capacity cannot currently be set on facilities. Fix it!
    return 10;
    //return filteredFacilities.reduce((sum, facility) => (sum + facility.capacity), 0);
  }

  const isFormValid = () => {
    return entity.estimatedParticipants > 0 && (entity.estimatedParticipants <= getCapacity());
  }

  const handleSave = () => {
    // Validation
    if (!isFormValid()) {
      return;
    }
    
    if (create) {
      dispatch(create_reservation(entity))
    } else {
      dispatch(put_reservation(entity))
    }
    handleClose()
  }


  let facility_names = filteredFacilities.map(e => e.name)
  let facility_bundle = filteredFacilities.map(e => e.equipmentBundle)
  const [bundle_checked, set_bundle_checked] = useState({})

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
          error={!(entity.estimatedParticipants > 0 && entity.estimatedParticipants <= getCapacity()) }
          label="Estimated Participants"
          value={entity.estimatedParticipants}
          type="number"
          helperText={(entity.estimatedParticipants > 0 ? (entity.estimatedParticipants > getCapacity() ? "Over capacity" : "Required") : "This field is required.")}
          onChange={handleChange('estimatedParticipants')}
          fullWidth
        />
        <TextField
          disabled={true}
          style={{ margin: '12px' }}
          id="datetime"
          label="Start Time"
          value={entity.startTime}
          type="datetime"
          onChange={handleChange('startTime')}
          fullWidth
        />
        <TextField
          disabled={true}
          style={{ margin: '12px' }}
          id="datetime"
          label="End Time"
          value={entity.endTime}
          type="datetime"
          onChange={handleChange('endTime')}
          fullWidth
        />
        <TextField
          disabled={true}
          style={{ margin: '12px' }}
          id="name"
          label="Facilities"
          value={facility_names}
          type="text"
          onChange={handleChange('facilities')}
          fullWidth
        />
        {facility_bundle.length === 0 &&
          <FormControl component="fieldset">
                  <FormLabel component="legend">Equipment Bundles</FormLabel>
                  <FormGroup>
                  {facility_bundle.map(e => {
                    set_bundle_checked(oldState => ({
                      ...oldState,
                      [e.id]: false
                    }));
                    return(
                      <FormControlLabel
                        control={<Checkbox checked={bundle_checked[e.id]} onChange={() => console.log(e.id)} value={e.id} />}
                        label={e.name}
                    />);
                  })}
            </FormGroup>
          </FormControl>
          }
      </DialogContent>
      {editable && (
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isFormValid()} color="secondary">
            Save
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

export default ReservationsDialog

