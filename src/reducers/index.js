import { combineReducers } from 'redux'                                
import authentication from './authentication-reducer'                                                
import register from './register-reducer'                                                
import userManagement from './user-management-reducer'                                                                                       
export default combineReducers({                                  
    authentication,
    register,
    userManagement
})
