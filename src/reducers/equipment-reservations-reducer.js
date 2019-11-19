import {
  GET_EQUIPMENT_RESERVATIONS,
  DELETE_EQUIPMENT_RESERVATIONS
} from '../actions/equipment-reservations'
import { REQUEST, SUCCESS, FAILURE } from './actions-util'

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
    case REQUEST(GET_EQUIPMENT_RESERVATIONS):
      // Set loading = true.
      return { ...state, loading: true, errorMessage: '' }
    case REQUEST(DELETE_EQUIPMENT_RESERVATIONS):
      // Set updating = true.
      return { ...state, updating: true, errorMessage: '' }

    case SUCCESS(GET_EQUIPMENT_RESERVATIONS):
      // Store the result.
      return { ...state, entities: action.payload, loading: false }
    case SUCCESS(DELETE_EQUIPMENT_RESERVATIONS):
      return { ...state, updating: false }

    case FAILURE(GET_EQUIPMENT_RESERVATIONS):
      // Case fallthrough.
    case FAILURE(DELETE_EQUIPMENT_RESERVATIONS):
      // Store the error.
      return { ...state, loading: false, update: false, errorMessage: action.payload }

    default:
      return state
  }
}
