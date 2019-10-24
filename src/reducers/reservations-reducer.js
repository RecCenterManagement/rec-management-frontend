import {
  FETCH_RESERVATIONS_START,
  RECEIVE_RESERVATIONS,
  FETCH_RESERVATIONS_ERROR,
  PUT_RESERVATION,
  PUT_RESERVATION_ERROR,
  CREATE_RESERVATION,
  CREATE_RESERVATION_ERROR
} from '../actions/reservations'

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
    case FETCH_RESERVATIONS_START: {
      return { ...state, loading: true, errorMessage: '' }
    }
    case RECEIVE_RESERVATIONS: {
      return { ...state, entities: action.payload, loading: false }
    }
    case FETCH_RESERVATIONS_ERROR: {
      return { ...state, loading: true }
    }
    case PUT_RESERVATION: {
      return { ...state, entities: action.payload }
    }
    case PUT_RESERVATION_ERROR: {
      return { ...state, errorMessage: action.payload }
    }
    case CREATE_RESERVATION: {
      return { ...state, entities: action.payload }
    }
    case CREATE_RESERVATION_ERROR: {
      return { ...state, errorMessage: action.payload }
    }
    default: {
      return state
    }
  }
}
