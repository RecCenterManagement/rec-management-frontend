import axios from 'axios'

export const CREATE_ACCOUNT_REQUEST = 'register/CREATE_ACCOUNT_REQUEST'
export const CREATE_ACCOUNT_ERROR = 'register/CREATE_ACCOUNT_ERROR'
export const CREATE_ACCOUNT_SUCCESS = 'register/CREATE_ACCOUNT_SUCCESS'
export const RESET = 'register/RESET'

export const register = (login, email, password) => {
  return dispatch => {
    dispatch({
      type: CREATE_ACCOUNT_REQUEST,
      payload: axios
        .post('api/register', { login, email, password })
        .then(result => {
          console.log(result)
          dispatch({ type: CREATE_ACCOUNT_SUCCESS, payload: result })
        })
        .catch(error => {
          dispatch({ type: CREATE_ACCOUNT_ERROR, payload: error })
        })
    })
  }
}

export const reset = () => {
  return dispatch => {
    dispatch({ type: RESET })
  }
}
