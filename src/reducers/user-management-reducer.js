import {
  FETCH_ROLES,
  FETCH_USERS,
  FETCH_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  RESET
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
    case REQUEST(FETCH_ROLES):
      return {
        ...state
      }
    case REQUEST(FETCH_USERS):
    case REQUEST(FETCH_USER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      }
    case REQUEST(CREATE_USER):
    case REQUEST(UPDATE_USER):
    case REQUEST(DELETE_USER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      }
    case FAILURE(FETCH_USERS):
    case FAILURE(FETCH_USER):
    case FAILURE(FETCH_ROLES):
    case FAILURE(CREATE_USER):
    case FAILURE(UPDATE_USER):
    case FAILURE(DELETE_USER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      }
    case SUCCESS(FETCH_ROLES):
      return {
        ...state,
        authorities: action.payload.data
      }
    case SUCCESS(FETCH_USERS):
      return {
        ...state,
        loading: false,
        users: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      }
    case SUCCESS(FETCH_USER):
      return {
        ...state,
        loading: false,
        user: action.payload.data
      }
    case SUCCESS(CREATE_USER):
    case SUCCESS(UPDATE_USER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        user: action.payload.data
      }
    case SUCCESS(DELETE_USER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        user: null
      }
    case RESET:
      return {
        ...initialState
      }
    default:
      return state
  }
}
