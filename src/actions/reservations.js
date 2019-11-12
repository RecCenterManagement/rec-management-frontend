import axios from 'axios'

export const FETCH_RESERVATIONS_START = 'reservations/FETCH_RESERVATIONS_START'
export const RECEIVE_RESERVATIONS = 'reservations/RECEIVE_RESERVATIONS'
export const FETCH_RESERVATIONS_ERROR = 'reservations/FETCH_RESERVATIONS_ERROR'

export const AUTH_KEY = 'ou-rcm-auth-token'

export const get_reservations = () => {
  return dispatch => {
    dispatch({ type: FETCH_RESERVATIONS_START, payload: {} })
    axios
      .get('api/reservations?eagerFetch=true')
      .then(result => {
        // console.log(result)
        dispatch({ type: RECEIVE_RESERVATIONS, payload: result.data })
      })
      .catch(error => {
        console.error(error)
        dispatch({ type: FETCH_RESERVATIONS_ERROR, payload: error })
      })
  }
}
