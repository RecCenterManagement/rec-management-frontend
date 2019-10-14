import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel
} from '@material-ui/core'
import { get_reservations } from '../actions/reservations'
import { get_facilities } from '../actions/facilities'

const RecCalendar = () => {
  const reservations = useSelector(state => state.reservations.entities)

  const localizer = momentLocalizer(moment)
  const facilities = useSelector(state => state.facilities.entities)

  const dispatch = useDispatch()

  const [value, setValue] = React.useState(0)

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

  return (
    <div style={{ height: '85vh' }}>
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

      <Calendar
        style={{ height: '65vh' }}
        localizer={localizer}
        selectable
        onSelectSlot={() => console.log('selected event')}
        defaultView={Views.WEEK}
        events={reservations.map(reservation => {
          return {
            id: reservation.id,
            allDay: false,
            title: reservation.event,
            start: new Date(reservation.startTime),
            end: new Date(reservation.endTime),
            desc: `${reservation.estimatedParticipants} participants`
          }
        })}
        views={['week', 'month']}
        startAccessor="start"
        endAccessor="end"
        showMultiDayTimes
        defaultDate={new Date()}
      />
    </div>
  )
}

export default RecCalendar
