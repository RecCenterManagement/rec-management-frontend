import {
  FETCH_FACILITIES_START,
  RECEIVE_FACILITIES,
  FETCH_FACILITIES_ERROR
} from '../actions/facilities'

const initial_state = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: {},
  updating: false,
  updateSuccess: false
}

export default function reducer(state = initial_state, action) {
  switch (action.type) {
    case FETCH_FACILITIES_START: {
      return { ...state, loading: true, errorMessage: '' }
    }
    case RECEIVE_FACILITIES: {
      return { ...state, entities: action.payload, loading: false }
    }
    case FETCH_FACILITIES_ERROR: {
      return { ...state, loading: true }
    }
    default: {
      return state
    }
  }
}
