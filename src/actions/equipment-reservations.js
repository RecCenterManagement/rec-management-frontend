import axios from 'axios'
import { REQUEST, SUCCESS, FAILURE } from './actions-util'
import { error, success, warning } from './notification'

export const GET_EQUIPMENT_RESERVATIONS = 'equipment-reservations/GET_EQUIPMENT_RESERVATIONS'
export const DELETE_EQUIPMENT_RESERVATIONS = 'equipment-reservations/DELETE_EQUIPMENT_RESERVATIONS'

export const AUTH_KEY = 'ou-rcm-auth-token'

export const get_equipment_reservations = () => {
  return dispatch => {
    dispatch({ type: REQUEST(GET_EQUIPMENT_RESERVATIONS), payload: {} })
    axios
      .get('api/equipment-reservations')
      .then(result => {
        dispatch({ type: SUCCESS(GET_EQUIPMENT_RESERVATIONS), payload: result.data });
      })
      .catch(errorData => {
        dispatch({ type: FAILURE(GET_EQUIPMENT_RESERVATIONS), payload: errorData });
        dispatch(warning("Failed to fetch equipment-reservation links."));
      })
      .finally(() => {
        // Call in both cases, error or success.
        // Triggers only after the request completes, avoiding code duplication.
        dispatch(get_equipment_reservations())
      })
  }
}

export const delete_equipment_reservation = id => {
  return dispatch => {
    dispatch({ type: REQUEST(DELETE_EQUIPMENT_RESERVATIONS), payload: {} })
    axios
      .delete(`api/equipment-reservations/${id}`)
      .then(result => {
        dispatch({ type: SUCCESS(DELETE_EQUIPMENT_RESERVATIONS), payload: result.data })
        dispatch(success("Deleted equipment-reservation link successfully."));
      })
      .catch(errorData => {
        dispatch({ type: FAILURE(DELETE_EQUIPMENT_RESERVATIONS), payload: errorData });
        dispatch(error("Failed to delete equipment-reservation link."));
      })
      .finally(() => {
        // Call in both cases, error or success.
        // Triggers only after the request completes, avoiding code duplication.
        dispatch(get_equipment_reservations())
      })
  }
}
