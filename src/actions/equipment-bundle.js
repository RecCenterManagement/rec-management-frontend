import axios from 'axios'
import { SUCCESS, REQUEST, FAILURE} from './actions-util'
import { warning, error, success } from './notification'

export const GET_EQUIPMENT_BUNDLE = 'equipment-bundle/GET_EQUIPMENT_BUNDLE'
export const PUT_EQUIPMENT_BUNDLE = 'equipment-bundle/PUT_EQUIPMENT_BUNDLE'
export const DELETE_EQUIPMENT_BUNDLE = 'equipment-bundle/DELETE_EQUIPMENT_BUNDLE'

export const get_equipment_bundle = () => {
  return dispatch => {
    dispatch({ type: REQUEST(GET_EQUIPMENT_BUNDLE), payload: {} })
    axios
      .get('api/equipment-bundles')
      .then(result => {
        dispatch({ type: SUCCESS(GET_EQUIPMENT_BUNDLE), payload: result.data })
      })
      .catch(errorData => {
        dispatch({ type: FAILURE(GET_EQUIPMENT_BUNDLE), payload: errorData })
        dispatch(warning("Failed to fetch equipment bundles."));
      })
  }
}

export const put_equipment_bundle = entity => {
  return dispatch => {
    dispatch({ type: REQUEST(PUT_EQUIPMENT_BUNDLE), payload: {} })
    axios
      .put('api/equipment-bundles', entity)
      .then(result => {
        dispatch({ type: SUCCESS(PUT_EQUIPMENT_BUNDLE), payload: result.data })
        dispatch(success("Updated equipment bundle successfully."));
      })
      .catch(errorData => {
        dispatch({ type: FAILURE(PUT_EQUIPMENT_BUNDLE), payload: errorData })
        dispatch(error("Failed to update equipment bundle."))
      })
      .finally(() => {
        // Call in both cases, error or success.
        // Triggers only after the request completes, avoiding code duplication.
        dispatch(get_equipment_bundle())
      })
  }
}

export const delete_equipment_bundle = id => {
  return dispatch => {
    dispatch({ type: REQUEST(DELETE_EQUIPMENT_BUNDLE), payload: {} })
    axios
      .delete(`api/equipment-bundles/${id}`)
      .then(result => {
        dispatch({ type: SUCCESS(DELETE_EQUIPMENT_BUNDLE), payload: result.data })
        dispatch(success("Deleted equipment bundle successfully."));
      })
      .catch(errorData => {
        dispatch({ type: FAILURE(DELETE_EQUIPMENT_BUNDLE), payload: errorData })
        dispatch(error("Failed to delete equipment bundle."));
      })
      .finally(() => {
        // Call in both cases, error or success.
        // Triggers only after the request completes, avoiding code duplication.
        dispatch(get_equipment_bundle())
      })
  }
}
