import axios from 'axios'

export const FETCH_EQUIPMENT_START = 'equipment/FETCH_EQUIPMENT_START'
export const RECEIVE_EQUIPMENT = 'equipment/RECEIVE_EQUIPMENT'
export const FETCH_EQUIPMENT_ERROR = 'equipment/FETCH_EQUIPMENT_ERROR'
export const PUT_EQUIPMENT = 'equipment/PUT_EQUIPMENT'
export const PUT_EQUIPMENT_ERROR = 'equipment/PUT_EQUIPMENT_ERROR'

export const AUTH_KEY = 'ou-rcm-auth-token'

export const get_equipment = () => {
  return dispatch => {
    dispatch({ type: FETCH_EQUIPMENT_START, payload: {} })
    axios
      .get('api/equipment')
      .then(result => {
        dispatch({ type: RECEIVE_EQUIPMENT, payload: result.data })
      })
      .catch(error => {
        console.error(error)
        dispatch({ type: FETCH_EQUIPMENT_ERROR, payload: error })
      })
  }
}

export const put_equipment = entity => {
  return (dispatch, getState) => {
    axios
      .put('api/equipment', entity)
      .then(result => {
        const old_entities = getState().equipment.entities
        const new_entities = old_entities.map(element => {
          return element.id === entity.id ? entity : element
        })
        dispatch({ type: PUT_EQUIPMENT, payload: new_entities })
      })
      .catch(error => {
        console.error(error)
        dispatch({ type: PUT_EQUIPMENT_ERROR, payload: error })
      })
  }
}
