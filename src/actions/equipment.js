import axios from 'axios'

export const FETCH_EQUIPMENT_START = 'equipment/FETCH_EQUIPMENT_START'
export const RECEIVE_EQUIPMENT = 'equipment/RECEIVE_EQUIPMENT'
export const FETCH_EQUIPMENT_ERROR = 'equipment/FETCH_EQUIPMENT_ERROR'

export const AUTH_KEY = 'ou-rcm-auth-token'

export const get_equipment = () => {
  return dispatch => {
    let token = localStorage.getItem(AUTH_KEY)
    token = token ? token : sessionStorage.getItem(AUTH_KEY)
    var config = {
      headers: { Authorization: 'Bearer ' + token }
    }
    dispatch({ type: FETCH_EQUIPMENT_START, payload: {} })
    axios
      .get('api/equipment', config)
      .then(result => {
        dispatch({ type: RECEIVE_EQUIPMENT, payload: result.data })
      })
      .catch(error => {
        console.error(error)
        dispatch({ type: FETCH_EQUIPMENT_ERROR, payload: error })
      })
  }
}
