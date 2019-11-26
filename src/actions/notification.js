export const INFO_NOTIFICATION = "notification/INFO";
export const WARNING_NOTIFICATION = "notification/WARNING";
export const SUCCESS_NOTIFICATION = "notification/SUCCESS";
export const ERROR_NOTIFICATION = "notification/ERROR";
export const CLEAR_NOTIFICATION = "notification/CLEAR";

export const info = message => {
  return dispatch => {
    dispatch({ type: INFO_NOTIFICATION, payload: { type: "INFO", message } });
  };
};

export const warning = message => {
  return dispatch => {
    dispatch({
      type: WARNING_NOTIFICATION,
      payload: { type: "WARNING", message }
    });
  };
};

export const success = message => {
  return dispatch => {
    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: { type: "SUCCESS", message }
    });
  };
};

export const error = message => {
  return dispatch => {
    dispatch({ type: ERROR_NOTIFICATION, payload: { type: "ERROR", message } });
  };
};

export const clear = () => {
  return dispatch => {
    dispatch({ type: CLEAR_NOTIFICATION, payload: { type: "", message: "" } });
  };
};
