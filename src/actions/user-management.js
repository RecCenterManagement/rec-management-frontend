import axios from 'axios'

export const FETCH_ROLES= 'userManagement/FETCH_ROLES'
export const FETCH_USERS= 'userManagement/FETCH_USERS'
export const FETCH_USER='userManagement/FETCH_USER'
export const CREATE_USER= 'userManagement/CREATE_USER'
export const UPDATE_USER= 'userManagement/UPDATE_USER'
export const DELETE_USER= 'userManagement/DELETE_USER'
export const RESET= 'userManagement/RESET'


const apiUrl = 'api/users';

export const getAllUsers = () => {
    return {
      type: FETCH_USERS,
      payload: axios.get(apiUrl)
    };
  };
export const getUsers = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: FETCH_USERS,
    payload: axios.get(requestUrl)
  };
};

export const getRoles = () => ({
  type: FETCH_ROLES,
  payload: axios.get(`${apiUrl}/authorities`)
});

export const getUser = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: FETCH_USER,
    payload: axios.get(requestUrl)
  };
};

export const createUser = user => async dispatch => {
  const result = await dispatch({
    type: CREATE_USER,
    payload: axios.post(apiUrl, user)
  });
  dispatch(getUsers());
  return result;
};

export const updateUser = user => async dispatch => {
  const result = await dispatch({
    type: UPDATE_USER,
    payload: axios.put(apiUrl, user)
  });
  dispatch(getUsers());
  return result;
};

export const deleteUser = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: DELETE_USER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getUsers());
  return result;
};

export const reset = () => ({
  type: RESET
});
