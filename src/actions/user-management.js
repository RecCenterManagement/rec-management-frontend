import axios from 'axios'
import { SUCCESS, REQUEST, FAILURE } from './actions-util'

export const GET_USERS = 'userManagement/GET_USERS'
export const CREATE_USER = 'userManagement/CREATE_USER'
export const UPDATE_USER = 'userManagement/UPDATE_USER'
export const DELETE_USER = 'userManagement/DELETE_USER'

const apiUrl = 'api/users'

export const getAllUsers = () => (dispatch, getState) => {
  dispatch({
    type: REQUEST(GET_USERS),
    payload: {}
  })
  axios
    .get(apiUrl)
    .then(result => {
      console.log(result)
      dispatch({ type: SUCCESS(GET_USERS), payload: result })
    })
    .catch(error => {
      dispatch({ type: FAILURE(GET_USERS), payload: error })
    })
}

export const createUser = user => async dispatch => {
  const result = await dispatch({
    type: REQUEST(CREATE_USER),
    payload: axios.post(apiUrl, user)
      .then(result => {
        dispatch({ type: SUCCESS(CREATE_USER), payload: result })
      })
      .catch(error => {
        dispatch({ type: FAILURE(CREATE_USER), payload: error })
      })
      .finally(() => {
        // Call in both cases, error or success.
        // Triggers only after the request completes, avoiding code duplication.
        dispatch(getAllUsers())
      })
  })
  return result
}

export const updateUser = user => async dispatch => {
  const result = await dispatch({
    type: REQUEST(UPDATE_USER),
    payload: axios.put(apiUrl, user)
      .then(result => {
        dispatch({ type: SUCCESS(UPDATE_USER), payload: result })
      })
      .catch(error => {
        dispatch({ type: FAILURE(UPDATE_USER), payload: error })
      })
      .finally(() => {
        // Call in both cases, error or success.
        // Triggers only after the request completes, avoiding code duplication.
        dispatch(getAllUsers())
      })
  })
  return result
}

export const deleteUser = login => async dispatch => {
  const requestUrl = `${apiUrl}/${login}`
  const result = await dispatch({
    type: REQUEST(DELETE_USER),
    payload: axios
      .delete(requestUrl)
      .then(result => {
        dispatch({ type: SUCCESS(DELETE_USER), payload: result })
      })
      .catch(error => {
        dispatch({ type: FAILURE(DELETE_USER), payload: error })
      })
      .finally(() => {
        // Call in both cases, error or success.
        // Triggers only after the request completes, avoiding code duplication.
        dispatch(getAllUsers())
      })
  })
  return result
}
