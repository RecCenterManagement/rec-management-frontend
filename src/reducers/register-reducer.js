import {
  CREATE_ACCOUNT_REQUEST,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_ERROR,
  RESET
} from '../actions/registration'

const initialState = {
  loading: false,
  registrationSuccess: false,
  registrationFailure: false,
  errorMessage: null
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ACCOUNT_REQUEST: {
      return {
        ...state,
        loading: true
      }
    }
    case CREATE_ACCOUNT_ERROR: {
      return {
        ...initialState,
        registrationFailure: true,
        errorMessage: action.payload
      }
    }
    case CREATE_ACCOUNT_SUCCESS: {
      return {
        ...initialState,
        registrationSuccess: true
      }
    }
    case RESET:
      return {
        ...initialState
      }
    default: {
      return state
    }
  }
}
