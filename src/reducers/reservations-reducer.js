import {
  GET_RESERVATIONS,
  PUT_RESERVATION,
  CREATE_RESERVATION,
  DELETE_RESERVATION
} from "../actions/reservations";
import { REQUEST, SUCCESS, FAILURE } from "../actions/actions-util";

const initial_state = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: {},
  updating: false,
  updateSuccess: false
};

export default function reducer(state = initial_state, action) {
  switch (action.type) {
    case REQUEST(GET_RESERVATIONS):
      return { ...state, loading: true, errorMessage: "" };
    case REQUEST(PUT_RESERVATION):
      // Case fallthrough.
    case REQUEST(CREATE_RESERVATION):
      // Case fallthrough.
    case REQUEST(DELETE_RESERVATION):
      return { ...state, updating: true, errorMessage: "" };

    case FAILURE(GET_RESERVATIONS):
      // Case fallthrough.
    case FAILURE(PUT_RESERVATION):
      // Case fallthrough.
    case FAILURE(CREATE_RESERVATION):
      // Case fallthrough.
    case FAILURE(DELETE_RESERVATION):
      return {
        ...state,
        errorMessage: action.payload,
        loading: false,
        updating: false
      };

    case SUCCESS(PUT_RESERVATION):
      // Case fallthrough.
    case SUCCESS(CREATE_RESERVATION):
      // Case fallthrough.
    case SUCCESS(DELETE_RESERVATION):
      return { ...state, entities: action.payload, updating: false };
    case SUCCESS(GET_RESERVATIONS):
      return { ...state, entities: action.payload, loading: false };

    default:
      return state;
  }
}
