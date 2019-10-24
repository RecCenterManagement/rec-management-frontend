import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Fab
} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import ReservationForm from './ReservationForm'
import { get_reservations } from '../actions/reservations'
import { get_facilities } from '../actions/facilities'

const useStyles = makeStyles(theme => ({
  calendar_overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '100',
    textAlign: 'center',
    paddingTop: '48px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '48px',
    pointerEvents: 'auto'
  }
}))

const RecCalendar = () => {
  const reservations = useSelector(state => state.reservations.entities)

  const localizer = momentLocalizer(moment)
  const facilities = useSelector(state => state.facilities.entities)
  const classes = useStyles()

  const dispatch = useDispatch()

  const [value, setValue] = useState(0)
  const [temporaryEvent, setTemporaryEvent] = useState({})
  const [open, setOpen] = useState(false)

  const username = useSelector(state => state.authentication.account.login)

  const handleChange = event => {
    setValue(event.target.value)
  }

  useEffect(
    () => {
      dispatch(get_facilities())
      dispatch(get_reservations())
    },
    [dispatch]
  )

  const getEventProperties = (event, start, end, isSelected) => {
    return {
      style: event.temporary
        ? {
            backgroundColor: '#909090',
            border: '2px dashed black'
          }
        : {}
    }
  }

  const handleSelectSlot = ({ start, end }) => {
    setTemporaryEvent({
      id: 1,
      title: 'Your New Reservation',
      allDay: false,
      start,
      end,
      desc: 'Click "Submit" to finalize',
      temporary: true
    })
  }

  const eventToEntity = () => ({
    event: temporaryEvent.title,
    startTime: temporaryEvent.start,
    endTime: temporaryEvent.end,
    facilities: value,
    user: username
  })

  return (
    <div>
      <FormControl style={{ margin: 24 }} component="fieldset">
        <FormLabel component="legend">Facility Selection</FormLabel>
        <RadioGroup
          aria-label="position"
          name="position"
          value={value}
          onChange={handleChange}
          row
        >
          {facilities.map(facility => (
            <FormControlLabel
              value={facility.name}
              key={facility.id}
              control={<Radio color="secondary" />}
              label={facility.name}
              labelPlacement="bottom"
            />
          ))}
        </RadioGroup>
      </FormControl>

      <div style={{ position: 'relative', height: '100%' }}>
        {value === 0 && (
          <div className={classes.calendar_overlay}>
            Please choose one or more room(s) to reserve.
          </div>
        )}
        <Calendar
          style={{ height: '800px' }}
          localizer={localizer}
          selectable
          onSelectSlot={handleSelectSlot}
          defaultView={Views.WEEK}
          events={[
            reservations.map(reservation => {
              return {
                id: reservation.id,
                allDay: false,
                title: reservation.event,
                start: new Date(reservation.startTime),
                end: new Date(reservation.endTime),
                desc: `${reservation.estimatedParticipants} participants`
              }
            }),
            temporaryEvent
          ]}
          views={['week', 'month']}
          startAccessor="start"
          endAccessor="end"
          showMultiDayTimes
          eventPropGetter={getEventProperties}
          defaultDate={new Date()}
        />
      </div>
      <Fab
        color="secondary"
        onClick={() => setOpen(true)}
        style={{ position: 'absolute', bottom: '0', right: '28px' }}
      >
        <SaveIcon />
      </Fab>
      <ReservationForm
        open={open}
        handleClose={() => setOpen(false)}
        editable={true}
        entity={eventToEntity()}
      />
    </div>
  )
}

export default RecCalendar
