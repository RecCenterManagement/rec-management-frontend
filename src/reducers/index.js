import { combineReducers } from 'redux'
import authentication from './authentication-reducer'
import facilities from './facilities-reducer'
import reservations from './reservations-reducer'
import equipment from './equipment-reducer'
import equipment_reservations from './equipment-reservations-reducer'
import register from './register-reducer'

export default combineReducers({
  authentication,
  facilities,
  reservations,
  equipment,
  equipment_reservations,
  register
})
