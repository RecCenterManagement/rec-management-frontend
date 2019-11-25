import {
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER
} from '../actions/user-management'
import { REQUEST, SUCCESS, FAILURE } from '../actions/actions-util'

const initialState = {
  loading: false,
  errorMessage: null,
  users: [],
  authorities: [],
  user: null,
  updating: false,
  updateSuccess: false,
  totalItems: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(GET_USERS):
      // Reset error message state, set loading = true.
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      }
    case REQUEST(CREATE_USER):
      // Case fallthrough.
    case REQUEST(UPDATE_USER):
      // Case fallthrough.
    case REQUEST(DELETE_USER):
      // Reset error message state, set updating = true.
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      }

    case SUCCESS(GET_USERS):
      // Set loading = false and store the list of users received.
      return {
        ...state,
        loading: false,
        users: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      }
    case SUCCESS(CREATE_USER):
      // Case fallthrough.
    case SUCCESS(UPDATE_USER):
      // Store the updated user and set updating = false.
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        user: action.payload.data
      }
    case SUCCESS(DELETE_USER):
      // Set updating = false and user to null..
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        user: null
      }

    case FAILURE(GET_USERS):
      // Case fallthrough.
    case FAILURE(CREATE_USER):
      // Case fallthrough.
    case FAILURE(DELETE_USER):
      // Case fallthrough.
    case FAILURE(UPDATE_USER):
      // Set loading/updating to false, store the error received. 
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      }

    default:
      return state
  }
}
