import { SUCCESS, REQUEST, FAILURE } from '../actions/actions-util'
import {
  GET_EQUIPMENT,
  POST_EQUIPMENT,
  PUT_EQUIPMENT,
  DELETE_EQUIPMENT
} from '../actions/equipment'

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
    case REQUEST(GET_EQUIPMENT):
      // Set loading = true.
      return { ...state, loading: true, errorMessage: '' }
    case REQUEST(POST_EQUIPMENT):
    case REQUEST(PUT_EQUIPMENT):
    // Case fallthrough.
    case REQUEST(DELETE_EQUIPMENT):
      // Set updating = true.
      return { ...state, updating: true, errorMessage: '' }
    case SUCCESS(GET_EQUIPMENT):
      // Store the result.
      return { ...state, entities: action.payload, loading: false }
    case SUCCESS(POST_EQUIPMENT):
    case SUCCESS(PUT_EQUIPMENT):
    // Case fallthrough.
    case SUCCESS(DELETE_EQUIPMENT):
      return { ...state, updating: false }

    case FAILURE(GET_EQUIPMENT):
    // Case fallthrough.
    case FAILURE(POST_EQUIPMENT):
    case FAILURE(PUT_EQUIPMENT):
    // Case fallthrough.
    case FAILURE(DELETE_EQUIPMENT):
      // Store error payload.
      return {
        ...state,
        loading: false,
        updating: false,
        errorMessage: action.payload
      }
    default: {
      return state
    }
  }
}
