import {
  FETCH_FACILITIES_START,
  RECEIVE_FACILITIES,
  FETCH_FACILITIES_ERROR,
  PUT_FACILITY,
  PUT_FACILITY_ERROR
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
    case PUT_FACILITY: {
      return { ...state, entities: action.payload }
    }
    case PUT_FACILITY_ERROR: {
      return { ...state, errorMessage: action.payload }
    }
    default: {
      return state
    }
  }
}
