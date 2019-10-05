
import { LOGIN, GET_SESSION, LOGOUT, CLEAR_AUTH, ERROR_MESSAGE } from '../actions/authentication'

const initial_state = {
    loading: false,
    isAuthenticated: false,
    loginSuccess: false,
    loginError: false, // Errors returned from server side
    account: {},
    errorMessage: '', // Errors returned from server side
    redirectMessage: '',
    sessionHasBeenFetched: false,
    idToken: '',
    logoutUrl: ''
  };

export default function reducer(state = initial_state, action) {
    switch (action.type) {
        case LOGIN:
        case GET_SESSION:
          return {
            ...state,
            loading: true
          };
        case LOGIN:
          return {
            ...initial_state,
            errorMessage: action.payload,
            loginError: true
          };
        case GET_SESSION:
          return {
            ...state,
            loading: false,
            isAuthenticated: false,
            sessionHasBeenFetched: true,
            errorMessage: action.payload
          };
        case LOGIN:
          return {
            ...state,
            loading: false,
            loginError: false,
            loginSuccess: true
          };
        case LOGOUT:
          return {
            ...initial_state
          };
        case GET_SESSION: {
          const isAuthenticated = action.payload && action.payload.data && action.payload.data.activated;
          return {
            ...state,
            isAuthenticated,
            loading: false,
            sessionHasBeenFetched: true,
            account: action.payload.data
          };
        }
        case ERROR_MESSAGE:
          return {
            ...initial_state,
            redirectMessage: action.message
          };
        case CLEAR_AUTH:
          return {
            ...state,
            loading: false,
            isAuthenticated: false
          };
        default:
          return state;
      }
}