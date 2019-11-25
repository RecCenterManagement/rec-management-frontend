import axios from 'axios'

export const FETCH_EQUIPMENT_BUNDLE_START =
  'equipment-bundle/FETCH_EQUIPMENT_BUNDLE_START'
export const RECEIVE_EQUIPMENT_BUNDLE =
  'equipment-bundle/RECEIVE_EQUIPMENT_BUNDLE'
export const FETCH_EQUIPMENT_BUNDLE_ERROR =
  'equipment-bundle/FETCH_EQUIPMENT_BUNDLE_ERROR'
export const PUT_EQUIPMENT_BUNDLE =
  'equipment-bundle/PUT_EQUIPMENT_BUNDLE'
export const PUT_EQUIPMENT_BUNDLE_ERROR =
  'equipment-bundle/PUT_EQUIPMENT_BUNDLE_ERROR'


export const get_equipment_bundle = () => {
  return dispatch => {
    dispatch({ type: FETCH_EQUIPMENT_BUNDLE_START, payload: {} })
    axios
      .get('api/equipment-bundles')
      .then(result => {
        dispatch({ type: RECEIVE_EQUIPMENT_BUNDLE, payload: result.data })
      })
      .catch(error => {
        console.error(error)
        dispatch({ type: FETCH_EQUIPMENT_BUNDLE_ERROR, payload: error })
      })
  }
}

export const put_equipment_bundle = entity => {
  return dispatch => {
    axios
      .put('api/equipment-bundles', entity)
      .then(result => {
        dispatch({ type: PUT_EQUIPMENT_BUNDLE, payload: result.data })
      })
      .catch(error => {
        console.error(error)
        dispatch({ type: PUT_EQUIPMENT_BUNDLE_ERROR, payload: error })
      })
  }
}

