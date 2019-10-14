import axios from 'axios'

export const FETCH_EQUIPMENT_RESERVATIONS_START =
  'equipment-reservations/FETCH_EQUIPMENT_RESERVATIONS_START'
export const RECEIVE_EQUIPMENT_RESERVATIONS =
  'equipment-reservations/RECEIVE_EQUIPMENT_RESERVATIONS'
export const FETCH_EQUIPMENT_RESERVATIONS_ERROR =
  'equipment-reservations/FETCH_EQUIPMENT_RESERVATIONS_ERROR'

export const AUTH_KEY = 'ou-rcm-auth-token'

export const get_equipment_reservations = () => {
  return dispatch => {
    let token = localStorage.getItem(AUTH_KEY)
    token = token ? token : sessionStorage.getItem(AUTH_KEY)
    var config = {
      headers: { Authorization: 'Bearer ' + token }
    }
    dispatch({ type: FETCH_EQUIPMENT_RESERVATIONS_START, payload: {} })
    axios
      .get('api/equipment-reservations', config)
      .then(result => {
        dispatch({ type: RECEIVE_EQUIPMENT_RESERVATIONS, payload: result.data })
      })
      .catch(error => {
        console.error(error)
        dispatch({ type: FETCH_EQUIPMENT_RESERVATIONS_ERROR, payload: error })
      })
  }
}
