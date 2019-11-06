import React, { useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
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
  Checkbox,
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
        equipmentReservations: props.entity.equipmentReservations
      })
      dispatch(get_facilities())
    },
    [dispatch, props.entity]
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


  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle id='form-dialog-title'>Reservation Editor</DialogTitle>
      <DialogContent>
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id='name'
          label='Event'
          value={entity.event}
          type='text'
          onChange={handleChange('event')}
          fullWidth
        />
        <TextField
          disabled={!editable}
          style={{ margin: '12px' }}
          id='name'
          label='Estimated Participants'
          value={entity.estimatedParticipants}
          type='number'
          onChange={handleChange('estimatedParticipants')}
          fullWidth
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify='space-around'>
            <KeyboardDateTimePicker
              margin='normal'
              id='startime'
              label='Start Time'
              value={entity.startTime}
              onChange={handleStartTime}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
              disablePast
              format='yyyy/MM/dd HH:mm'
            />
            <KeyboardDateTimePicker
              margin='normal'
              id='endtime'
              label='End Time'
              value={entity.endTime}
              type='datetime'
              onChange={handleEndTime}
              KeyboardButtonProps={{
                'aria-label': 'change time'
              }}
              minDate={entity.startTime}
              disablePast
              format='yyyy/MM/dd HH:mm'
            />
          </Grid>
        </MuiPickersUtilsProvider>

        <FormControl className={classes.formControl}>
          <InputLabel id='facilities'>Facilities</InputLabel>
          <Select
            labelId='facilities-select'
            id='facilities-mutiple-select'
            multiple
            value={entity.facilities}
            onChange={handleChange('facilities')}
            input={<Input />}
          >
            {facilities.map(facility => (
              <MenuItem key={facility.id} value={facility}>
                {facility.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      {editable && (
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleSave} color='secondary'>
            Save
          </Button>
        </DialogActions>
      )}
    </Dialog>
  )
}

export default ReservationsListForm
