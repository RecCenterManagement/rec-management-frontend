import axios from 'axios'

// Authentication action constants
export const FETCH_TOKEN_START = 'authentication/FETCH_TOKEN_START'
export const RECEIVE_TOKEN = 'authentication/RECEIVE_TOKEN'
export const FETCH_TOKEN_ERROR = 'authentication/FETCH_TOKEN_ERROR'
export const FETCH_ACCOUNT_START = 'authentication/FETCH_ACCOUNT_START'
export const RECEIVE_ACCOUNT = 'authentication/RECEIVE_ACCOUNT'
export const FETCH_ACCOUNT_ERROR = 'authentication/FETCH_ACCOUNT_ERROR'
export const LOGOUT = 'authentication/LOGOUT'
export const CLEAR_AUTH = 'authentication/CLEAR_AUTH'
export const ERROR_MESSAGE = 'authentication/ERROR_MESSAGE'
export const UPDATE_ACCOUNT = 'authentication/UPDATE_ACCOUNT'
export const UPDATE_ACCOUNT_ERROR = 'authentication/UPDATE_ACCOUNT'

export const AUTH_KEY = 'ou-rcm-auth-token'

export const displayAuthError = message => ({ type: ERROR_MESSAGE, message })

export const login = (username, password, rememberMe = false) => {
  return dispatch => {
    dispatch({ type: FETCH_TOKEN_START, payload: {} })
    axios
      .post('api/authenticate', { username, password, rememberMe })
      .then(result => {
        dispatch({ type: RECEIVE_TOKEN, payload: result.data.id_token })
        const jwt = result.data.id_token
        if (rememberMe) {
          localStorage.setItem(AUTH_KEY, jwt)
        } else {
          sessionStorage.setItem(AUTH_KEY, jwt)
        }

        axios.defaults.headers.common = {
          Authorization: 'Bearer ' + jwt
        }

        dispatch(getUserAccount())
      })
      .catch(error => {
        dispatch({ type: FETCH_TOKEN_ERROR, payload: error })
      })
  }
}

export const getUserAccount = () => (dispatch, getState) => {

  if (!getState().authentication.idToken) {
    let token = localStorage.getItem('ou-rcm-auth-token')
    token = token ? token : sessionStorage.getItem('ou-rcm-auth-token')

    axios.defaults.headers.common = {
      Authorization: 'Bearer ' + token
    }
  }
  dispatch({ type: FETCH_ACCOUNT_START, payload: {} })
  if (!getState().authentication.idToken) {
    let token = localStorage.getItem('ou-rcm-auth-token')
    token = token ? token : sessionStorage.getItem('ou-rcm-auth-token')

    axios.defaults.headers.common = {
      Authorization: 'Bearer ' + token
    }
  }

  axios
    .get('api/account')
    .then(result => {
      dispatch({ type: RECEIVE_ACCOUNT, payload: result.data })
    })
    .catch(err => {
      dispatch({ type: FETCH_ACCOUNT_ERROR, payload: err })
    })
}

export const clearAuthToken = () => {
  sessionStorage.removeItem(AUTH_KEY)
  localStorage.removeItem(AUTH_KEY)
}

export const logout = () => dispatch => {
  clearAuthToken()
  dispatch({
    type: LOGOUT
  })
}

export const clearAuthentication = messageKey => dispatch => {
  clearAuthToken()
  axios.defaults.headers.common = {}
  dispatch(displayAuthError(messageKey))
  dispatch({
    type: CLEAR_AUTH
  })
}

export const saveAccountForm = account => {
  return dispatch => {
    axios
      .post('/api/account', account)
      .then(data => {
        dispatch({ type: UPDATE_ACCOUNT, payload: account })
      })
      .catch(err => {
        console.error(err)
        dispatch({ type: UPDATE_ACCOUNT_ERROR })
      })
  }
}
