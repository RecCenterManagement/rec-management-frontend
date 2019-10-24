import axios from 'axios'

export const FETCH_FACILITIES_START = 'facilities/FETCH_FACILITIES_START'
export const RECEIVE_FACILITIES = 'facilities/RECEIVE_FACILITIES'
export const FETCH_FACILITIES_ERROR = 'facilities/FETCH_FACILITIES_ERROR'
export const PUT_FACILITY = 'facilities/PUT_FACILITY'
export const PUT_FACILITY_ERROR = 'facilities/PUT_FACILITY_ERROR'

export const AUTH_KEY = 'ou-rcm-auth-token'

export const get_facilities = () => {
  return dispatch => {
    let token = localStorage.getItem(AUTH_KEY)
    token = token ? token : sessionStorage.getItem(AUTH_KEY)
    var config = {
      headers: { Authorization: 'Bearer ' + token }
    }
    dispatch({ type: FETCH_FACILITIES_START, payload: {} })
    axios
      .get('api/facilities', config)
      .then(result => {
        console.log(result)
        dispatch({ type: RECEIVE_FACILITIES, payload: result.data })
      })
      .catch(error => {
        console.error(error)
        dispatch({ type: FETCH_FACILITIES_ERROR, payload: error })
      })
  }
}

export const put_facility = entity => {
  return (dispatch, getState) => {
    let token = localStorage.getItem(AUTH_KEY)
    token = token ? token : sessionStorage.getItem(AUTH_KEY)
    var config = {
      headers: { Authorization: 'Bearer ' + token }
    }
    axios
      .put('api/facilities', entity, config)
      .then(result => {
        const old_entities = getState().facilities.entities
        const new_entities = old_entities.map(element => {
          return element.id === entity.id ? entity : element
        })
        dispatch({ type: PUT_FACILITY, payload: new_entities })
      })
      .catch(error => {
        console.error(error)
        dispatch({ type: PUT_FACILITY_ERROR, payload: error })
      })
  }
}
