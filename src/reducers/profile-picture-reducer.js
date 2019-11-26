import {
  FETCH_PROFILE_PICTURES,
  POST_PROFILE_PICTURES,
  PUT_PROFILE_PICTURES,
  DELETE_PROFILE_PICTURES
} from '../actions/profile-pictures-action'
import { REQUEST, SUCCESS, FAILURE } from '../actions/actions-util'

const initial_state = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: {},
  updating: false,
  updateSuccess: false
}

export default (state = initial_state, action) => {
  switch (action.type) {
    case REQUEST(FETCH_PROFILE_PICTURES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      }
    case FAILURE(FETCH_PROFILE_PICTURES):
    case FAILURE(POST_PROFILE_PICTURES):
    case FAILURE(PUT_PROFILE_PICTURES):
    case FAILURE(DELETE_PROFILE_PICTURES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      }
    case SUCCESS(FETCH_PROFILE_PICTURES):
      return {
        ...state,
        entities: action.payload
      }
    case SUCCESS(PUT_PROFILE_PICTURES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload
      }
    case SUCCESS(DELETE_PROFILE_PICTURES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: null,
      }
    default:
      return state
  }
}
