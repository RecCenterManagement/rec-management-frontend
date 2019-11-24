import { combineReducers } from 'redux'
import userManagement from './user-management-reducer'
import authentication from './authentication-reducer'
import facilities from './facilities-reducer'
import reservations from './reservations-reducer'
import equipment from './equipment-reducer'
import equipment_reservations from './equipment-reservations-reducer'
import equipment_bundle from './equipment-bundle-reducer'
import register from './register-reducer'
import profile_pictures from './profile-picture-reducer'

export default combineReducers({
  authentication,
  facilities,
  reservations,
  equipment,
  equipment_bundle,
  equipment_reservations,
  register,
  userManagement,
  profile_pictures
})
