import axios from 'axios'

export const FETCH_RESERVATIONS_START = 'reservations/FETCH_RESERVATIONS_START'
export const RECEIVE_RESERVATIONS = 'reservations/RECEIVE_RESERVATIONS'
export const FETCH_RESERVATIONS_ERROR = 'reservations/FETCH_RESERVATIONS_ERROR'
export const PUT_RESERVATION = 'reservations/PUT_RESERVATION'
export const PUT_RESERVATION_ERROR = 'reservations/PUT_RESERVATION_ERROR'
export const CREATE_RESERVATION = 'reservations/PUT_RESERVATION'
export const CREATE_RESERVATION_ERROR = 'reservations/PUT_RESERVATION_ERROR'
export const DELETE_RESERVATION = 'reservations/DELETE_RESERVATION'
export const DELETE_RESERVATION_ERROR = 'reservations/DELETE_RESERVATION_ERROR'

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

export const put_reservation = entity => {
  return (dispatch, getState) => {
    entity.user = getState().authentication.account
    axios
      .put('api/reservations?eagerFetch=true', entity)
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
    delete entity.id
    entity.user = getState().authentication.account
    entity.facilities = [entity.facilitiesObject]
    delete entity.facilitiesObject
    axios
    .get('api/reservations?eagerFetch=true',    entity)
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
export const get_reservations_by_user_id = (userId) => {
  return dispatch => {
    dispatch({ type: FETCH_RESERVATIONS_START, payload: {} })
    axios
    .get(`api/reservations?eagerFetch=true&userId.equals=${userId}`)
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

export const delete_reservation = (id) => {
  return dispatch => {
    dispatch({ type: FETCH_RESERVATIONS_START, payload: {} })
    axios
    .get(`api/reservations?eagerFetch=true/${id}`)
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
