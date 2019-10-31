import {
  FETCH_RESERVATIONS_START,
  RECEIVE_RESERVATIONS,
  FETCH_RESERVATIONS_ERROR,
  PUT_RESERVATION,
  PUT_RESERVATION_ERROR,
  CREATE_RESERVATION,
  CREATE_RESERVATION_ERROR,
  DELETE_RESERVATION
} from '../actions/reservations'
import { REQUEST, SUCCESS, FAILURE } from '../actions/actions-util'

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
    case FETCH_RESERVATIONS_START:
    case REQUEST(DELETE_RESERVATION): {
      return { ...state, loading: true, errorMessage: '' }
    }
    case RECEIVE_RESERVATIONS: {
      return { ...state, entities: action.payload, loading: false }
    }
    case FETCH_RESERVATIONS_ERROR: {
      return { ...state, loading: true }
    }
    case CREATE_RESERVATION:
    case PUT_RESERVATION:
      return { ...state, entities: action.payload }
    case SUCCESS(DELETE_RESERVATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: null
      }
    case CREATE_RESERVATION_ERROR:
    case PUT_RESERVATION_ERROR:
    case FAILURE(DELETE_RESERVATION): {
      return { ...state, errorMessage: action.payload }
    }
    default: {
      return state
    }
  }
}
