import axios from 'axios'
import { SUCCESS, REQUEST, FAILURE} from './actions-util'

export const GET_RESERVATIONS = 'reservations/GET_RESERVATIONS'
export const PUT_RESERVATION = 'reservations/PUT_RESERVATION'
export const CREATE_RESERVATION = 'reservations/CREATE_RESERVATION'
export const DELETE_RESERVATION = 'reservations/DELETE_RESERVATION'

export const AUTH_KEY = 'ou-rcm-auth-token'

export const get_reservations = () => {
  return dispatch => {
    dispatch({ type: REQUEST(GET_RESERVATIONS), payload: {} })
    axios
      .get('api/reservations?eagerFetch=true')
      .then(result => {
        dispatch({ type: SUCCESS(GET_RESERVATIONS), payload: result.data })
      })
      .catch(error => {
        console.error(error)
        dispatch({ type: FAILURE(GET_RESERVATIONS), payload: error })
      })
  }
}

export const put_reservation = entity => {
  return (dispatch, getState) => {
    entity.user = getState().authentication.account
    dispatch({ type: REQUEST(PUT_RESERVATION), payload: {} })
    axios
      .put('api/reservations?eagerFetch=true', entity)
      .then(() => {
        const old_entities = getState().reservations.entities
        const new_entities = old_entities.map(element => {
          return element.id === entity.id ? entity : element
        })
        dispatch({ type: SUCCESS(PUT_RESERVATION), payload: new_entities })
      })
      .catch(error => {
        console.error(error)
        dispatch({ type: FAILURE(PUT_RESERVATION), payload: error })
      })
      .finally(() => {
        // Call in both cases, error or success.
        // Triggers only after the request completes, avoiding code duplication.
        dispatch(get_reservations())
      })
  }
}

export const create_reservation = entity => {
  return (dispatch, getState) => {
    delete entity.id
    entity.user = getState().authentication.account
    // Reformat facility list.
    entity.facilities = entity.facilities.map((id) => ({ id }));
    dispatch({ type: REQUEST(CREATE_RESERVATION), payload: {} })
    axios
      .post('api/reservations', entity)
      .then(result => {
        let old_entities = getState().reservations.entities
        old_entities.push(result.data)
        dispatch({ type: SUCCESS(CREATE_RESERVATION), payload: old_entities })
      })
      .catch(error => {
        console.error(error)
        dispatch({ type: FAILURE(CREATE_RESERVATION), payload: error })
      })
      .finally(() => {
        // Call in both cases, error or success.
        // Triggers only after the request completes, avoiding code duplication.
        dispatch(get_reservations())
      })
  }
}
export const get_reservations_by_user_id = userId => {
  return dispatch => {
    dispatch({ type: REQUEST(GET_RESERVATIONS), payload: {} })
    axios
      .get(`api/reservations?eagerFetch=true&userId.equals=${userId}`)
      .then(result => {
        // console.log(result)
        dispatch({ type: SUCCESS(GET_RESERVATIONS), payload: result.data })
      })
      .catch(error => {
        console.error(error)
        dispatch({ type: FAILURE(GET_RESERVATIONS), payload: error })
      })
  }
}

export const delete_reservation = id => async dispatch => {
  const result = await dispatch({
    type: REQUEST(DELETE_RESERVATION),
    payload: axios
      .delete(`api/reservations/${id}?eagerFetch=true`)
      .then(result => {
        dispatch({ type: SUCCESS(DELETE_RESERVATION), payload: result.data })
      })
      .catch(error => {
        dispatch({ type: FAILURE(DELETE_RESERVATION), payload: error })
      })
      .finally(() => {
        // Call in both cases, error or success.
        // Triggers only after the request completes, avoiding code duplication.
        dispatch(get_reservations())
      })
  })
  dispatch(get_reservations())
  return result
}
