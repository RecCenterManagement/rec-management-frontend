import axios from 'axios'

export const FETCH_EQUIPMENT_RESERVATIONS_START =
  'equipment-reservations/FETCH_EQUIPMENT_RESERVATIONS_START'
export const RECEIVE_EQUIPMENT_RESERVATIONS =
  'equipment-reservations/RECEIVE_EQUIPMENT_RESERVATIONS'
export const FETCH_EQUIPMENT_RESERVATIONS_ERROR =
  'equipment-reservations/FETCH_EQUIPMENT_RESERVATIONS_ERROR'
export const PUT_EQUIPMENT_RESERVATION = 'equipment-reservations/PUT_RESERVATION'
export const PUT_RESERVATION_ERROR = 'equipment-reservations/PUT_RESERVATION_ERROR'

export const AUTH_KEY = 'ou-rcm-auth-token'

export const get_equipment_reservations = () => {
  return dispatch => {
    dispatch({ type: FETCH_EQUIPMENT_RESERVATIONS_START, payload: {} })
    axios
      .get('api/equipment-reservations')
      .then(result => {
        dispatch({ type: RECEIVE_EQUIPMENT_RESERVATIONS, payload: result.data })
      })
      .catch(error => {
        console.error(error)
        dispatch({ type: FETCH_EQUIPMENT_RESERVATIONS_ERROR, payload: error })
      })
  }
}

export const put_equipment_reservation = entity => {
  return (dispatch, getState) => {
    axios
      .put('api/equipment-reservations', entity)
      .then(result => {
        const old_entities = getState().equipment_reservations.entities
        const new_entities = old_entities.map(element => {
          return element.id === entity.id ? entity : element
        })
        dispatch({ type: PUT_EQUIPMENT_RESERVATION, payload: new_entities })
      })
      .catch(error => {
        console.error(error)
        dispatch({ type: PUT_RESERVATION_ERROR, payload: error })
      })
  }
}
