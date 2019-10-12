import { combineReducers } from 'redux'                                
import authentication from './authentication-reducer'                                                
import register from './register-reducer'                                                
                                                                                         
export default combineReducers({                                  
    authentication,
    register
})
