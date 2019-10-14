import axios from 'axios'
import { SUCCESS, REQUEST, FAILURE } from './actions-util'
export const FETCH_ROLES = 'userManagement/FETCH_ROLES'
export const FETCH_USERS = 'userManagement/FETCH_USERS'
export const FETCH_USER = 'userManagement/FETCH_USER'
export const CREATE_USER = 'userManagement/CREATE_USER'
export const UPDATE_USER = 'userManagement/UPDATE_USER'
export const DELETE_USER = 'userManagement/DELETE_USER'
export const RESET = 'userManagement/RESET'

export const AUTH_KEY = 'ou-rcm-auth-token'
const apiUrl = 'api/users'
let token = localStorage.getItem(AUTH_KEY)
token = token ? token : sessionStorage.getItem(AUTH_KEY)
var config = {
  headers: { Authorization: 'Bearer ' + token }
}

export const getAllUsers = () => (dispatch, getState) => {
  dispatch({
    type: REQUEST(FETCH_USERS),
    payload: {}
  })
  axios
    .get(apiUrl, config)
    .then(result => {
      console.log(result)
      dispatch({ type: SUCCESS(FETCH_USERS), payload: result })
    })
    .catch(error => {
      dispatch({ type: FAILURE(FETCH_USERS), payload: error })
    })
}

export const getUsers = (page, size, sort) => {
  const requestUrl = `${apiUrl}${
    sort ? `?page=${page}&size=${size}&sort=${sort}` : ''
  }`
  return {
    type: FETCH_USERS,
    payload: axios.get(requestUrl)
  }
}

export const getRoles = () => ({
  type: FETCH_ROLES,
  payload: axios.get(`${apiUrl}/authorities`)
})

export const getUser = id => {
  const requestUrl = `${apiUrl}/${id}`
  return {
    type: FETCH_USER,
    payload: axios.get(requestUrl)
  }
}

export const createUser = user => async dispatch => {
  const result = await dispatch({
    type: CREATE_USER,
    payload: axios.post(apiUrl, user)
  })
  dispatch(getUsers())
  return result
}

export const updateUser = user => async dispatch => {
  const result = await dispatch({
    type: UPDATE_USER,
    payload: axios.put(apiUrl, user, config)
  })
  dispatch(getAllUsers())
  return result
}

export const deleteUser = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`
  const result = await dispatch({
    type: DELETE_USER,
    payload: axios.delete(requestUrl,config)
  })
  dispatch(getUsers())
  return result
}

export const reset = () => ({
  type: RESET
})
