import {
  FETCH_EQUIPMENT_RESERVATIONS_START,
  RECEIVE_EQUIPMENT_RESERVATIONS,
  FETCH_EQUIPMENT_RESERVATIONS_ERROR,
  PUT_EQUIPMENT_RESERVATION,
  PUT_RESERVATION_ERROR
} from '../actions/equipment-reservations'

const initial_state = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: {},
  updating: false,
  updateSuccess: false
}

export default function reducer(state = initial_state, action) {
  switch (action.type) {
    case FETCH_EQUIPMENT_RESERVATIONS_START: {
      return { ...state, loading: true, errorMessage: '' }
    }
    case RECEIVE_EQUIPMENT_RESERVATIONS: {
      return { ...state, entities: action.payload, loading: false }
    }
    case FETCH_EQUIPMENT_RESERVATIONS_ERROR: {
      return { ...state, loading: true }
    }
    case PUT_EQUIPMENT_RESERVATION: {
      return { ...state, entities: action.payload }
    }
    case PUT_RESERVATION_ERROR: {
      return { ...state, errorMessage: action.payload }
    }
    default: {
      return state
    }
  }
}
