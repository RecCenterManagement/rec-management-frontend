import axios from 'axios'

export const FETCH_RESERVATIONS_START = 'reservations/FETCH_RESERVATIONS_START'
export const RECEIVE_RESERVATIONS = 'reservations/RECEIVE_RESERVATIONS'
export const FETCH_RESERVATIONS_ERROR = 'reservations/FETCH_RESERVATIONS_ERROR'
export const PUT_RESERVATION = 'reservations/PUT_RESERVATION'
export const PUT_RESERVATION_ERROR = 'reservations/PUT_RESERVATION_ERROR'
export const CREATE_RESERVATION = 'reservations/PUT_RESERVATION'
export const CREATE_RESERVATION_ERROR = 'reservations/PUT_RESERVATION_ERROR'

export const AUTH_KEY = 'ou-rcm-auth-token'

export const get_reservations = () => {
  return dispatch => {
    let token = localStorage.getItem(AUTH_KEY)
    token = token ? token : sessionStorage.getItem(AUTH_KEY)
    var config = {
      headers: { Authorization: 'Bearer ' + token }
    }
    dispatch({ type: FETCH_RESERVATIONS_START, payload: {} })
    axios
      .get('api/reservations', config)
      .then(result => {
        console.log(result)
        dispatch({ type: RECEIVE_RESERVATIONS, payload: result.data })
      })
      .catch(error => {
        console.error(error)
        dispatch({ type: FETCH_RESERVATIONS_ERROR, payload: error })
      })
  }
}

export const put_reservation = entity => {
  return (dispatch, getState) => {
    let token = localStorage.getItem(AUTH_KEY)
    token = token ? token : sessionStorage.getItem(AUTH_KEY)
    var config = {
      headers: { Authorization: 'Bearer ' + token }
    }
    entity.user = getState().authentication.account
    axios
      .put('api/reservations', entity, config)
      .then(() => {
        const old_entities = getState().reservations.entities
        const new_entities = old_entities.map(element => {
          return element.id === entity.id ? entity : element
        })
        dispatch({ type: PUT_RESERVATION, payload: new_entities })
      })
      .catch(error => {
        console.error(error)
        dispatch({ type: PUT_RESERVATION_ERROR, payload: error })
      })
  }
}

export const create_reservation = entity => {
  return (dispatch, getState) => {
    let token = localStorage.getItem(AUTH_KEY)
    token = token ? token : sessionStorage.getItem(AUTH_KEY)
    var config = {
      headers: { Authorization: 'Bearer ' + token }
    }
    delete entity.id
    entity.user = getState().authentication.account
    entity.facilities = [entity.facilitiesObject]
    delete entity.facilitiesObject
    axios
      .post('api/reservations', entity, config)
      .then(result => {
        let old_entities = getState().reservations.entities
        old_entities.push(result.data)
        dispatch({ type: CREATE_RESERVATION, payload: old_entities })
      })
      .catch(error => {
        console.error(error)
        dispatch({ type: CREATE_RESERVATION_ERROR, payload: error })
      })
  }
}
