import {
  FETCH_EQUIPMENT_BUNDLE_START,
  RECEIVE_EQUIPMENT_BUNDLE,
  FETCH_EQUIPMENT_BUNDLE_ERROR
} from '../actions/equipment-bundle'

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
    case FETCH_EQUIPMENT_BUNDLE_START: {
      return { ...state, loading: true, errorMessage: '' }
    }
    case RECEIVE_EQUIPMENT_BUNDLE: {
      return { ...state, entities: action.payload, loading: false }
    }
    case FETCH_EQUIPMENT_BUNDLE_ERROR: {
      return { ...state, loading: true }
    }
    default: {
      return state
    }
  }
}

