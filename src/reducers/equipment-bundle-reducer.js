import {
  GET_EQUIPMENT_BUNDLE,
  PUT_EQUIPMENT_BUNDLE,
  DELETE_EQUIPMENT_BUNDLE
} from '../actions/equipment-bundle'
import { SUCCESS, REQUEST, FAILURE} from '../actions/actions-util'

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
    case REQUEST(GET_EQUIPMENT_BUNDLE):
      // Set loading = true.
      return { ...state, loading: true, errorMessage: '' }
    case REQUEST(PUT_EQUIPMENT_BUNDLE):
      // Case fallthrough.
    case REQUEST(DELETE_EQUIPMENT_BUNDLE):
      // Set updating = true.
      return { ...state, updating: true, errorMessage: '' }
    
    case SUCCESS(GET_EQUIPMENT_BUNDLE):
      return { ...state, entities: action.payload, loading: false }
    case SUCCESS(PUT_EQUIPMENT_BUNDLE):
      // Case fallthrough.
    case SUCCESS(DELETE_EQUIPMENT_BUNDLE):
      return { ...state, updating: false }
    
    case FAILURE(GET_EQUIPMENT_BUNDLE):
      // Case fallthrough
    case FAILURE(PUT_EQUIPMENT_BUNDLE):
      // Case fallthrough
    case FAILURE(DELETE_EQUIPMENT_BUNDLE):
      return { ...state, loading: false, updating: false, errorMessage: action.payload }

    default:
      return state
  }
}

