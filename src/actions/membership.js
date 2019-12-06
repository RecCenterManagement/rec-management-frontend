import axios from 'axios'
import { SUCCESS, FAILURE, REQUEST } from './actions-util'
import { success } from './notification'
export const FETCH_MEMBERSHIPS = 'membership/FETCH_MEMBERSHIPS'

export const FETCH_MEMBERSHIP = 'membership/FETCH_MEMBERSHIP'
export const CREATE_MEMBERSHIP = 'membership/CREATE_MEMBERSHIP'
export const UPDATE_MEMBERSHIP = 'membership/UPDATE_MEMBERSHIP'
export const DELETE_MEMBERSHIP = 'membership/DELETE_MEMBERSHIP'

const apiUrl = 'api/memberships'
export const getMemberships = () => dispatch => {
  dispatch({ type: REQUEST(FETCH_MEMBERSHIPS), payload: null })
  axios
    .get(`${apiUrl}`)
    .then(response => {
      dispatch({ type: SUCCESS(FETCH_MEMBERSHIPS), payload: response })
    })
    .catch(error => {
      dispatch({ type: FAILURE(FETCH_MEMBERSHIPS), payload: error })
    })
}
export const getMembership = id => dispatch => {
  dispatch({ type: REQUEST(FETCH_MEMBERSHIP), payload: null })
  axios
    .get(`${apiUrl}/${id}`)
    .then(response => {
      dispatch({ type: SUCCESS(FETCH_MEMBERSHIP), payload: response })
    })
    .catch(error => {
      if (error.response.status == 404) {
        dispatch({ type: SUCCESS(FETCH_MEMBERSHIP), payload: {data: null} })
      } else {
        dispatch({ type: FAILURE(FETCH_MEMBERSHIP), payload: error })
      }
    })
}

export const createMembership = membership => async dispatch => {
  const result = await dispatch({
    type: CREATE_MEMBERSHIP,
    payload: axios.post(apiUrl, membership)
  })
  return result
}

export const updateMembership = membership => dispatch => {
  dispatch({ type: REQUEST(UPDATE_MEMBERSHIP), payload: null })
  axios
    .put(apiUrl, membership)
    .then(result => {
      dispatch({ type: SUCCESS(UPDATE_MEMBERSHIP), payload: result })
    })
    .catch(error => {
      dispatch({ type: FAILURE(UPDATE_MEMBERSHIP), payload: error })
    })
}

export const deleteMembership = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`
  const result = await dispatch({
    type: DELETE_MEMBERSHIP,
    payload: axios
      .delete(requestUrl)
      .then(result => {
        dispatch({ type: SUCCESS(DELETE_MEMBERSHIP), payload: result })
      })
      .catch(error => {
        dispatch({ type: FAILURE(DELETE_MEMBERSHIP), payload: error })
      })
  })
  return result
}
