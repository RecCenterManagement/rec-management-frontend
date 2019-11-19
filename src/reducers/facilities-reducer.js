import {
  GET_FACILITIES,
  PUT_FACILITY,
  DELETE_FACILITY
} from '../actions/facilities'
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
    case REQUEST(GET_FACILITIES):
      return { ...state, loading: true, errorMessage: '' }
    case REQUEST(PUT_FACILITY):
      // Case fallthrough
    case REQUEST(DELETE_FACILITY):
      // Set updating = true
      return { ...state, updating: true, errorMessage: '' }
        
    case SUCCESS(GET_FACILITIES):
      return { ...state, entities: action.payload, loading: false }
    case SUCCESS(PUT_FACILITY):
      // Case fallthrough.
    case SUCCESS(DELETE_FACILITY):
      return { ...state, updating: false }
              
    case FAILURE(GET_FACILITIES):
    case FAILURE(PUT_FACILITY):
    case FAILURE(DELETE_FACILITY):
      return { ...state, loading: false, updating: false, errorMessage: action.payload }

    default:
      return state
  }
}
