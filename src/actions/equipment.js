import axios from 'axios'
import { SUCCESS, REQUEST, FAILURE} from './actions-util'
import { success, error, warning } from './notification'

export const GET_EQUIPMENT = 'equipment/GET_EQUIPMENT'
export const PUT_EQUIPMENT = 'equipment/PUT_EQUIPMENT'
export const DELETE_EQUIPMENT = 'equipment/DELETE_EQUIPMENT'

export const AUTH_KEY = 'ou-rcm-auth-token'

export const get_equipment = () => {
  return dispatch => {
    dispatch({ type: REQUEST(GET_EQUIPMENT), payload: {} })
    axios
      .get('api/equipment')
      .then(result => {
        dispatch({ type: SUCCESS(GET_EQUIPMENT), payload: result.data })
      })
      .catch(errorData => {
        dispatch({ type: FAILURE(GET_EQUIPMENT), payload: errorData })
        dispatch(warning("Failed to fetch equipment."));
      })
  }
}

export const put_equipment = entity => {
  return (dispatch, getState) => {
    dispatch({ type: REQUEST(PUT_EQUIPMENT), payload: {} })
    axios
      .put('api/equipment', entity)
      .then(result => {
        const old_entities = getState().equipment.entities
        const new_entities = old_entities.map(element => {
          return element.id === entity.id ? entity : element
        })
        dispatch({ type: SUCCESS(PUT_EQUIPMENT), payload: new_entities })
        dispatch(success("Updated equipment successfully."));
      })
      .catch(errorData => {
        dispatch({ type: FAILURE(PUT_EQUIPMENT), payload: errorData })
        dispatch(error("Failed to update equipment."));
      })
      .finally(() => {
        // Call in both cases, error or success.
        // Triggers only after the request completes, avoiding code duplication.
        dispatch(get_equipment())
      })
  }
}

export const delete_equipment = id => {
  return dispatch => {
    dispatch({ type: REQUEST(DELETE_EQUIPMENT), payload: {} })
    axios
      .delete(`api/equipment/${id}`)
      .then(result => {
        dispatch({ type: SUCCESS(DELETE_EQUIPMENT), payload: result.data })
        dispatch(success("Deleted equipment successfully."));
      })
      .catch(errorData => {
        dispatch({ type: FAILURE(DELETE_EQUIPMENT), payload: errorData })
        dispatch(error("Failed to delete equipment."));
      })
      .finally(() => {
        // Call in both cases, error or success.
        // Triggers only after the request completes, avoiding code duplication.
        dispatch(get_equipment())
      })
  }
}
