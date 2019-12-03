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
import { useHistory } from 'react-router-dom'
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

  const [bundle_checked, set_bundle_checked] = useState({})
  let bundles = []
  // Facilities currently selected.
  const filteredFacilities = allFacilities.filter(facility => entity.facilities != null && entity.facilities.includes(String(facility.id)))

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
      if (allFacilities && filteredFacilities) {
        let temp_dictionary = {}
        filteredFacilities.forEach(facility => {
          facility.equipmentBundles.forEach(bundle => {
            let associated_equipment = bundle.claims.map(claim => ({count: claim.count, equipment_name: claim.equipment.name, equipment_id: claim.equipment.id}))
            temp_dictionary = {...temp_dictionary, [bundle.id]: {selected: false, name: bundle.name, id: bundle.id, equipment: associated_equipment}}
          })
        })
        set_bundle_checked(temp_dictionary)
      }
    },
    [dispatch, props.entity]
  )

  const handleChange = name => event => {
    setEntity({ ...entity, [name]: event.target.value });
  }

  const getCapacity = () => {
    return filteredFacilities.reduce((sum, facility) => (sum + facility.capacity), 0);
  }

  const isFormValid = () => {
    return entity.estimatedParticipants > 0 && (entity.estimatedParticipants <= getCapacity());
  }

  let history = useHistory()
  const handleSave = () => {
    // Validation
    if (!isFormValid()) {
      return;
    }

    let temp_array=[]

    Object.keys(bundle_checked).forEach(key => {
      bundle_checked[key].equipment.forEach(claim => {
        temp_array.push({
          count: claim.count,
          equipment: {
            id: claim.equipment_id,
            name: claim.equipment_name,
          }
        })
      })
    })

    const mutated_entity = {...entity, equipmentReservations: temp_array}
    if (create) {
      dispatch(create_reservation(mutated_entity))
    } else {
      dispatch(put_reservation(entity))
    }
    handleClose()
    history.push('/submitted')
  }

  const changeBundleSelection = key => {
    set_bundle_checked({...bundle_checked,
      [key]: {
        ...bundle_checked[key],
        selected: !bundle_checked[key].selected
      }
    })
  }

  let facility_names = filteredFacilities.map(e => e.name)

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
          error={(entity.estimatedParticipants > getCapacity()) || (entity.estimatedParticipants <= 0) }
          label="Estimated Participants"
          value={entity.estimatedParticipants}
          type="number"
          helperText={(entity.estimatedParticipants > getCapacity() ? "Over capacity" : "This field is required.")}
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
        {Object.entries(bundle_checked) !== 0 &&
          <FormControl component="fieldset">
                  <FormLabel component="legend">Equipment Bundles</FormLabel>
                  <FormGroup>
                  {Object.keys(bundle_checked).map(key => {
                    return(
                      <>
                      <FormControlLabel
                        control={<Checkbox checked={bundle_checked[key].selected} onChange={() => changeBundleSelection(key)} value={key} />}
                        label={bundle_checked[key].name}
                    />
                    {bundle_checked[key].equipment.map(e => (
                      <div>{`${e.equipment_name} x ${e.count}`}</div>
                    ))}

                    </>
                    );
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

