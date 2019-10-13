import axios from 'axios'

export const FETCH_FACILITIES_START = 'facilities/FETCH_FACILITIES_START'
export const RECEIVE_FACILITIES = 'facilities/RECEIVE_FACILITIES'
export const FETCH_FACILITIES_ERROR = 'facilities/FETCH_FACILITIES_ERROR'

export const AUTH_KEY = 'ou-rcm-auth-token'

export const get_facilities = () => {
  return dispatch => {
    let token = localStorage.getItem(AUTH_KEY)
    token = token ? token : sessionStorage.getItem(AUTH_KEY)
    var config = {
      headers: { Authorization: 'Bearer ' + token }
    }
    console.log('called')
    dispatch({ type: FETCH_FACILITIES_START, payload: {} })
    axios
      .get('api/facilities', config)
      .then(result => {
        console.log(result)
        dispatch({ type: RECEIVE_FACILITIES, payload: result.data })
      })
      .catch(error => {
        console.error(error)
        dispatch({ type: FETCH_FACILITIES_ERROR, payload: error })
      })
  }
}
