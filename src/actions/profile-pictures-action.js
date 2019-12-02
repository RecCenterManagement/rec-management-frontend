import axios from 'axios'
import { SUCCESS, REQUEST, FAILURE } from './actions-util'
import {getUserAccount} from './authentication'

export const FETCH_PROFILE_PICTURES = 'PROFILE_PICTURES/FETCH_PROFILE_PICTURES'
export const POST_PROFILE_PICTURES = 'PROFILE_PICTURES/POST_PROFILE_PICTURES'
export const PUT_PROFILE_PICTURES = 'PROFILE_PICTURES/PUT_PROFILE_PICTURES'
export const DELETE_PROFILE_PICTURES =
  'PROFILE_PICTURES/DELETE_PROFILE_PICTURES'

export const get_all_profile_pictures = () => {
  return dispatch => {
    dispatch({ type: REQUEST(FETCH_PROFILE_PICTURES), payload: {} })
    axios
      .get('api/profile-pictures/?eagerFetch=true')
      .then(result => {
        dispatch({
          type: SUCCESS(FETCH_PROFILE_PICTURES),
          payload: result.data
        })
      })
      .catch(error => {
        console.error(error)
        dispatch({ type: FAILURE(FETCH_PROFILE_PICTURES), payload: error })
      })
  }
}

export const create_profile_picture = image => async dispatch => {
  const result = await dispatch({
    type: REQUEST(POST_PROFILE_PICTURES),
    payload: axios
      .post('api/profile-pictures?eagerFetch=true', image)
      .then(result => {
        dispatch({ type: SUCCESS(POST_PROFILE_PICTURES), payload: result.data })
        dispatch(getUserAccount())
      })
      .catch(error => {
        console.error(error)
        dispatch({ type: FAILURE(POST_PROFILE_PICTURES), payload: error })
      })
  })
  dispatch(get_all_profile_pictures())
  return result
}

export const put_profile_picture = image => async dispatch => {
  const result = await dispatch({
    type: REQUEST(POST_PROFILE_PICTURES),
    payload: axios
      .put('api/profile-pictures?eagerFetch=true', image)
      .then(result => {
        dispatch({ type: SUCCESS(POST_PROFILE_PICTURES), payload: result.data })
        dispatch(getUserAccount())
      })
      .catch(error => {
        console.error(error)
        dispatch({ type: FAILURE(POST_PROFILE_PICTURES), payload: error })
      })
  })
  dispatch(get_all_profile_pictures())
  return result
}

export const delete_profile_picture = id => {
  return dispatch => {
    axios
      .delete(`api/profile-pictures/${id}?eagerFetch=true`)
      .then(result => {
        dispatch({
          type: SUCCESS(DELETE_PROFILE_PICTURES),
          payload: result.data
        })
        dispatch(getUserAccount())
      })
      .catch(error => {
        console.error(error)
        dispatch({ type: FAILURE(DELETE_PROFILE_PICTURES), payload: error })
      })
  }
}
