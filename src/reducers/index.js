import { combineReducers } from 'redux'
import authentication from './authentication-reducer'
import facilities from './facilities-reducer'
import register from './register-reducer'

export default combineReducers({
  authentication,
  facilities,
  register
})
