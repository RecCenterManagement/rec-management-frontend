import {
  FETCH_EQUIPMENT_START,
  RECEIVE_EQUIPMENT,
  FETCH_EQUIPMENT_ERROR
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
    default: {
      return state
    }
  }
}
