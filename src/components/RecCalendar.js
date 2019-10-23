import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button, Fab } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import ReservationForm from "./ReservationForm";
import { get_reservations } from "../actions/reservations";
import { get_facilities } from "../actions/facilities";
import RecCalendarToolbar from "./RecCalendarToolbar";

const useStyles = makeStyles(theme => ({
  calendarOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0",
    left: "0",
    zIndex: "100",
    textAlign: "center",
    paddingTop: "48px",
    color: "white",
    fontWeight: "bold",
    fontSize: "48px",
    pointerEvents: "auto"
  }
}));

const ToggleButton = ({ room_name, state, setState }) => {
  const onClick = () => {
    setState(oldState => !oldState);
  };

  return (
    <Button
      variant="contained"
      color={state ? "primary" : null}
      onClick={onClick}
    >
      {room_name}
    </Button>
  );
};

const RecCalendar = () => {
  // Localization.
  const localizer = momentLocalizer(moment);
  // CSS classes.
  const classes = useStyles();
  // Used for Redux.
  const dispatch = useDispatch();

  // Perform the fetch.
  useEffect(() => {
    dispatch(get_facilities());
    dispatch(get_reservations());
  }, [dispatch]);

  // List of fetched reservations.
  const reservations = useSelector(state => state.reservations.entities);
  // List of fetched facilities.
  const facilities = useSelector(state => state.facilities.entities);
  // The fetched user.
  const user = useSelector(state => state.authentication.account);

  // The temporary event created by the user.
  const defaultTemporaryEvent = {
    id: 1,
    facilities: [],
    temporary: true,
    start: null,
    end: null
  };
  const [temporaryEvent, setTemporaryEvent] = useState(defaultTemporaryEvent);
  const clearTemporaryEvent = () => {
    setTemporaryEvent(defaultTemporaryEvent);
  };

  // Whether the reservation form is open.
  const [open, setOpen] = useState(false);

  // The state of the facility buttons. Dictionary; key is facility id
  // and value is true/false state.
  const [buttonStates, setButtonStates] = useState({});

  // Create setters for each button.
  const setButtonState = key => setter => {
    setButtonStates(oldState => ({
      ...oldState,
      [key]: setter(oldState[key])
    }));
    // Clear the temporary event.
    clearTemporaryEvent();
  };

  // Is at least one facility selected?
  const hasSelectedFacilities = () =>
    Object.values(buttonStates).some(element => element);

  // Get the list of selected facilities.
  const getSelectedFacilities = () =>
    Object.keys(buttonStates).filter(index => buttonStates[index]);

  // Call this when an existing event is selected on the calendar.
  const handleSelectEvent = event => alert(event.title);

  // Given a start and end date, determine if there is an overlapping event on the calendar.
  const doesEventOverlap = (start, end) => {
    // Return true if there is at least one event which overlaps.
    return (
      getFilteredEvents().filter(
        event =>
          (event.start <= start && start <= event.end) ||
          (event.start <= end && end <= event.end)
      ).length !== 0
    );
  };

  // Call this when a new event is created by click-and-drag on the calendar.
  const handleSelectSlot = ({ start, end }) => {
    if (!doesEventOverlap(start, end)) {
      clearTemporaryEvent();
      const newEvent = {
        id: 1,
        title: "Your New Reservation",
        allDay: false,
        start,
        end,
        desc: 'Click "Submit" to finalize',
        facilities: getSelectedFacilities(),
        temporary: true
      };
      setTemporaryEvent(newEvent);
    }
  };

  // Determine the properties of an event, including its CSS style.
  const getEventProperties = (event, start, end, isSelected) => {
    return {
      style: event.temporary
        ? {
            backgroundColor: "#909090",
            border: "2px dashed black"
          }
        : {}
    };
  };

  // Convert the list of EXISTING reservations into a list of calendar events.
  // Memoization caches the result until the list of reservations changes.
  const generateEvents = React.useCallback(() => {
    return reservations.map(reservation => ({
      id: reservation.id,
      allDay: false,
      title: reservation.event,
      start: new Date(reservation.startTime),
      end: new Date(reservation.endTime),
      desc: `${reservation.estimatedParticipants} participants`,
      temporary: false,
      facilities: [1] // TODO: Temporary
    }));
  }, [reservations]);

  // Filter the list of EXISTING events into a list filtered by facility.
  // Memoization caches the result until the list of reservations or selected facilities changes.
  const getFilteredEvents = React.useCallback(
    () =>
      generateEvents().filter(event => {
        return (
          event.facilities.filter(value => {
            return getSelectedFacilities().includes(value.toString());
          }).length !== 0
        );
      }),
    [generateEvents, getSelectedFacilities]
  );

  // Convert the temporary event to an entity object for use by the form.
  const eventToEntity = () => ({
    event: temporaryEvent.title,
    startTime: temporaryEvent.start,
    endTime: temporaryEvent.end,
    facilities: getSelectedFacilities(),
    user: user
  });

  // Create a list of facility buttons from the list of facilities.
  const createFacilityList = () => {
    return facilities.map(facility => {
      if (!(facility.id in buttonStates)) {
        // Add a key to the list for each facility, if it hasn't been added yet.
        setButtonStates(oldState => ({ ...oldState, [facility.id]: false }));
      }
      return (
        <ToggleButton
          state={buttonStates[`${facility.id}`]}
          setState={setButtonState(`${facility.id}`)}
          room_name={facility.name}
        />
      );
    });
  };

  // Render the calendar
  return (
    <div>
      {createFacilityList()}

      <div style={{ position: "relative", height: "100%" }}>
        {!hasSelectedFacilities() && (
          <div className={classes.calendarOverlay}>
            Please choose one or more room(s) to reserve.
          </div>
        )}
        <Calendar
          style={{ height: "800px" }}
          localizer={localizer}
          selectable
          onSelectSlot={handleSelectSlot}
          defaultView={Views.WEEK}
          events={[...getFilteredEvents(), temporaryEvent]}
          views={["week"]}
          components={{ toolbar: props => <RecCalendarToolbar {...props} /> }}
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
        style={{ position: "absolute", bottom: "0", right: "28px" }}
      >
        <SaveIcon />
      </Fab>
      <ReservationForm
        open={open}
        handleClose={() => setOpen(false)}
        editable={true}
        entity={eventToEntity()}
        create={true}
      />
    </div>
  );
};

export default RecCalendar;
