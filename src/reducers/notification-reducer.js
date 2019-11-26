import {
  INFO_NOTIFICATION,
  WARNING_NOTIFICATION,
  SUCCESS_NOTIFICATION,
  ERROR_NOTIFICATION,
  CLEAR_NOTIFICATION
} from "../actions/notification";

const initial_state = {
  type: "",
  message: ""
};

export default function reducer(state = initial_state, action) {
  switch (action.type) {
    case INFO_NOTIFICATION:
      // Case fallthrough.
    case WARNING_NOTIFICATION:
      // Case fallthrough.
    case SUCCESS_NOTIFICATION:
      // Case fallthrough.
    case ERROR_NOTIFICATION:
      // Set the notification.
      return { ...action.payload }
    case CLEAR_NOTIFICATION:
      // Clear the notification.
      return initial_state;
    default:
      return state;
  }
}
