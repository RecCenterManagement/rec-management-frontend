import {
  FETCH_EQUIPMENT_START,
  RECEIVE_EQUIPMENT,
  FETCH_EQUIPMENT_ERROR,
  PUT_EQUIPMENT,
  PUT_EQUIPMENT_ERROR
} from '../actions/equipment'

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
    case FETCH_EQUIPMENT_START: {
      return { ...state, loading: true, errorMessage: '' }
    }
    case RECEIVE_EQUIPMENT: {
      return { ...state, entities: action.payload, loading: false }
    }
    case FETCH_EQUIPMENT_ERROR: {
      return { ...state, loading: true }
    }
    case PUT_EQUIPMENT: {
      return { ...state, entities: action.payload }
    }
    case PUT_EQUIPMENT_ERROR: {
      return { ...state, errorMessage: action.payload }
    }
    default: {
      return state
    }
  }
}
