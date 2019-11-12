import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  FormGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  Grid
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from '@material-ui/pickers'
import { useDispatch, useSelector } from 'react-redux'
import { create_reservation, put_reservation } from '../actions/reservations'
import { get_facilities } from '../actions/facilities'
import { get_equipment } from '../actions/equipment'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}))

const ReservationsListForm = props => {
  const classes = useStyles()

  const { open, handleClose, editable, create } = props

  const facilities = useSelector(state => state.facilities.entities)
  const equipment = useSelector(state => state.equipment.entities)

  const dispatch = useDispatch()

  const [entity, setEntity] = useState({
    id: 0,
    event: '',
    estimatedParticipants: 0,
    startTime: '',
    endTime: '',
    user: '',
    facilities: [''],
    equipmentReservations: [''],
    facilitiesNames: ['']
  })

  useEffect(
    () => {
      setEntity({
        id: props.entity.id,
        event: props.entity.event,
        status: props.entity.status,
        estimatedParticipants: props.entity.estimatedParticipants,
        startTime: props.entity.startTime,
        endTime: props.entity.endTime,
        user: props.entity.user ? props.entity.user.login : props.entity.user,
        facilities: props.entity.facilities,
        equipmentReservations: props.entity.equipmentReservations,
        facilitiesNames: props.entity.facilities
          ? props.entity.facilities.map(f => f.name)
          : [],
        equipmentReservationsNames: props.entity.equipmentReservations
          ? props.entity.equipmentReservations.map(e => e.equipment.name)
          : []
      })
    },
    [props.entity]
  )
  useEffect(
    () => {
      dispatch(get_facilities())
      dispatch(get_equipment())
    },
    [dispatch]
  )

  const handleChange = name => event => {
    setEntity({ ...entity, [name]: event.target.value })
  }

  const handleStartTime = date => {
    setEntity({ ...entity, startTime: date })
  }

  const handleEndTime = date => {
    setEntity({ ...entity, endTime: date })
  }

  const handleSave = () => {
    if (create) {
      dispatch(create_reservation(entity))
    } else {
      dispatch(put_reservation(entity))
    }
    handleClose()
  }

  const handleChangeFacilities = name => event => {
    const facilitiesObject = {}
    const values = event.target.value
    const selected = []
    if (entity && entity.facilitiesNames) {
      facilities.forEach(
        facility => (facilitiesObject[facility.name] = facility)
      )
      values.forEach(name => {
        if (facilitiesObject[name]) selected.push(facilitiesObject[name])
      })
    }
    setEntity({ ...entity, [name]: values, facilities: selected })
  }

  const handleChangeEquipment = name => event => {
    const equipmentReservationsObject = {}
    const values = event.target.value
    const selected = []
    if (entity && entity.equipmentReservationsNames) {
      equipment.forEach(e => (equipmentReservationsObject[e.name] = e))
      console.log('equipmentReservationsObject', equipmentReservationsObject)
      console.log('values', values)
      values.forEach(name => {
        if (equipmentReservationsObject[name]) {
          selected.push({
            id: equipmentReservationsObject[name].id,
            count: 1,
            equipment: equipmentReservationsObject[name]
          })
        }
      })

      console.log('selected reservations', selected)
    }
    setEntity({ ...entity, [name]: values, equipmentReservations: selected })
  }
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
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
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDateTimePicker
              margin="normal"
              id="startime"
              label="Start Time"
              value={entity.startTime}
              onChange={handleStartTime}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              disablePast
              format="yyyy/MM/dd HH:mm"
            />
            <KeyboardDateTimePicker
              margin="normal"
              id="endtime"
              label="End Time"
              value={entity.endTime}
              type="datetime"
              onChange={handleEndTime}
              KeyboardButtonProps={{
                'aria-label': 'change time'
              }}
              minDate={entity.startTime}
              disablePast
              format="yyyy/MM/dd HH:mm"
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <FormGroup>
          <FormControl className={classes.formControl}>
            <InputLabel id="facilities">Facilities</InputLabel>
            <Select
              labelId="facilities-select"
              id="facilities-mutiple-select"
              multiple
              defaultValue={entity.facilitiesNames}
              value={entity.facilitiesNames}
              onChange={handleChangeFacilities('facilitiesNames')}
              input={<Input />}
            >
              {facilities.map(facility => (
                <MenuItem key={facility.id} value={facility.name}>
                  {facility.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="equipmentReservations">
              Equipment Reservations
            </InputLabel>
            <Select
              labelId="equipmentReservations-select"
              id="equipmentReservations-mutiple-select"
              multiple
              value={entity.equipmentReservationsNames}
              defaultValue={entity.equipmentReservationsNames}
              onChange={handleChangeEquipment('equipmentReservationsNames')}
              input={<Input />}
            >
              {equipment.map(e => (
                <MenuItem key={e.id} value={e.name}>
                  {e.name}
                </MenuItem>
              ))}
            </Select>
            {entity &&
              entity.equipmentReservations &&
              entity.equipmentReservations.map(e => (
                <TextField
                  style={{ margin: '12px' }}
                  id="name"
                  label={e && `${e.equipment.name} Count`}
                  value={e && e.count}
                  type="number"
                  fullWidth
                />
              ))}
          </FormControl>
        </FormGroup>
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

export default ReservationsListForm
