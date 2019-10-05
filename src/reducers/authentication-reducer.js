
import { FETCH_TOKEN_START, RECEIVE_TOKEN, FETCH_ACCOUNT_START, RECEIVE_ACCOUNT } from '../actions/authentication'

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
        case FETCH_TOKEN_START: {
            return { ...state, loading: true, errorMessage: '' }
        }
        case RECEIVE_TOKEN: {
            return { ...state, idToken: action.payload, loading: false }
        }
        case FETCH_ACCOUNT_START: {
            return { ...state, loading: true }
        }
        case RECEIVE_ACCOUNT: {
            return { ...state, account: action.payload, isAuthenticated: true, loading: false}
        }
        default: {
            return state
        }
    }
}