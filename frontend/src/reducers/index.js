import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "../slices/authSlice"
import remember_unrememberReducer from "../slices/remember_unrememberSlice"

const rootReducer=combineReducers({
    auth:authReducer,
    remember_unremember:remember_unrememberReducer,

})
export default rootReducer;