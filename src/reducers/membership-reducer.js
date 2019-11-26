import {
  FETCH_MEMBERSHIPS,
  FETCH_MEMBERSHIP,
  CREATE_MEMBERSHIP,
  UPDATE_MEMBERSHIP,
  DELETE_MEMBERSHIP
} from '../actions/membership'
import { REQUEST, SUCCESS, FAILURE } from '../actions/actions-util'

const initialState = {
  loading: false,
  errorMessage: null,
  entity: null,
  entities: [],
  updating: false,
  updateSuccess: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(FETCH_MEMBERSHIPS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      }
    case REQUEST(FETCH_MEMBERSHIP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      }
    case REQUEST(CREATE_MEMBERSHIP):
    case REQUEST(UPDATE_MEMBERSHIP):
    case REQUEST(DELETE_MEMBERSHIP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      }
    case FAILURE(FETCH_MEMBERSHIPS):
    case FAILURE(FETCH_MEMBERSHIP):

    case FAILURE(CREATE_MEMBERSHIP):
    case FAILURE(UPDATE_MEMBERSHIP):
    case FAILURE(DELETE_MEMBERSHIP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      }
    case SUCCESS(FETCH_MEMBERSHIPS):
      console.log('GOT ', action.payload.data)
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      }
    case SUCCESS(FETCH_MEMBERSHIP):
      console.log('GOT ', action.payload.data)
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      }
    case SUCCESS(CREATE_MEMBERSHIP):
    case SUCCESS(UPDATE_MEMBERSHIP):
    console.log('Updated ', action)
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      }
    case SUCCESS(DELETE_MEMBERSHIP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: null
      }
    default:
      return state
  }
}
