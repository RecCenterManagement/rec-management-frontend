import { combineReducers } from 'redux'
import authentication from './authentication-reducer'
import facilities from './facilities-reducer'
import reservations from './reservations-reducer'
import register from './register-reducer'

export default combineReducers({
  authentication,
  facilities,
  reservations,
  register
})
