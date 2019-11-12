import axios from 'axios'
import { SUCCESS, REQUEST, FAILURE} from './actions-util'
export const FETCH_RESERVATIONS_START = 'reservations/FETCH_RESERVATIONS_START'
export const RECEIVE_RESERVATIONS = 'reservations/RECEIVE_RESERVATIONS'
export const FETCH_RESERVATIONS_ERROR = 'reservations/FETCH_RESERVATIONS_ERROR'
export const PUT_RESERVATION = 'reservations/PUT_RESERVATION'
export const PUT_RESERVATION_ERROR = 'reservations/PUT_RESERVATION_ERROR'
export const CREATE_RESERVATION = 'reservations/PUT_RESERVATION'
export const CREATE_RESERVATION_ERROR = 'reservations/PUT_RESERVATION_ERROR'
export const DELETE_RESERVATION = 'reservations/DELETE_RESERVATION'

export const AUTH_KEY = 'ou-rcm-auth-token'

export const get_reservations = () => {
  return dispatch => {
    dispatch({ type: FETCH_RESERVATIONS_START, payload: {} })
    axios
      .get('api/reservations?eagerFetch=true')
<<<<<<< HEAD
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
      .post('api/reservations?eagerFetch=true', entity)
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
export const get_reservations_by_user_id = userId => {
  return dispatch => {
    dispatch({ type: FETCH_RESERVATIONS_START, payload: {} })
    axios
      .get(`api/reservations?eagerFetch=true&userId.equals=${userId}`)
=======
>>>>>>> edc752399a50ecb95e9497863ce6136f9c2b38be
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

export const delete_reservation = id => async dispatch => {
  const result = await dispatch({
    type: DELETE_RESERVATION,
    payload: axios
      .delete(`api/reservations/${id}?eagerFetch=true`)
      .then(result => {
        dispatch({ type: SUCCESS(DELETE_RESERVATION), payload: result })
      })
      .catch(error => {
        dispatch({ type: FAILURE(DELETE_RESERVATION), payload: error })
      })
  })
  dispatch(get_reservations())
  return result
}
