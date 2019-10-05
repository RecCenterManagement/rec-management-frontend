
import { LOGIN, GET_SESSION, LOGOUT, CLEAR_AUTH, ERROR_MESSAGE } from '../actions/authentication'

const initial_state = {
    terms: [],
    fetching: false,
    fetched: false,
    error: false,
    current_term: null,
    term_bounds: null
}

export default function reducer(state = initial_state, action) {
    switch (action.type) {
        case 'FETCH_TERMS_START': {
            return { ...state, fetching: true, fetched: false }
        }
    }
}