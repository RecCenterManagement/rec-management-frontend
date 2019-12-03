import axios from 'axios'
import { REQUEST, SUCCESS, FAILURE } from './actions-util'
import { warning, error, success } from './notification'

export const GET_FACILITIES = 'facilities/GET_FACILITIES'
export const PUT_FACILITY = 'facilities/PUT_FACILITY'
export const DELETE_FACILITY = 'facilities/DELETE_FACILITY'

export const AUTH_KEY = 'ou-rcm-auth-token'

export const get_facilities = () => {
  return dispatch => {
    dispatch({ type: REQUEST(GET_FACILITIES), payload: {} })
    axios
      .get('api/facilities?eagerFetch=true')
      .then(result => {
        dispatch({ type: SUCCESS(GET_FACILITIES), payload: result.data })
      })
      .catch(errorData => {
        dispatch({ type: FAILURE(GET_FACILITIES), payload: errorData })
        dispatch(warning("Failed to fetch facilities."));
      })
  }
}

export const put_facility = entity => {
  return (dispatch, getState) => {
    dispatch({ type: REQUEST(PUT_FACILITY), payload: {} })
    axios
      .put('api/facilities', entity)
      .then(result => {
        const old_entities = getState().facilities.entities
        const new_entities = old_entities.map(element => {
          return element.id === entity.id ? entity : element
        })
        dispatch({ type: SUCCESS(PUT_FACILITY), payload: new_entities })
        dispatch(success("Updated facility successfully."));
      })
      .catch(errorData => {
        dispatch({ type: FAILURE(PUT_FACILITY), payload: errorData })
        dispatch(error("Failed to update facility."));
      })
      .finally(() => {
        // Call in both cases, error or success.
        // Triggers only after the request completes, avoiding code duplication.
        dispatch(get_facilities())
      })
  }
}

export const delete_facility = id => {
  return dispatch => {
    dispatch({ type: REQUEST(DELETE_FACILITY), payload: {} })
    axios
      .delete(`api/facilities/${id}`)
      .then(result => {
        dispatch({ type: SUCCESS(DELETE_FACILITY), payload: result.data })
        dispatch(success("Deleted facility successfully."));
      })
      .catch(errorData => {
        dispatch({ type: FAILURE(DELETE_FACILITY), payload: errorData })
        dispatch(error("Failed to delete facility."));
      })
      .finally(() => {
        // Call in both cases, error or success.
        // Triggers only after the request completes, avoiding code duplication.
        dispatch(get_facilities())
      })
  }
}
