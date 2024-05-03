import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "../slices/authSlice"
import remember_unrememberReducer from "../slices/remember_unrememberSlice"
import flashCardReducer from "../slices/flashCardSlice"
import subscriptionReducer from "../slices/subscriptionSlice"

const rootReducer=combineReducers({
    auth:authReducer,
    remember_unremember:remember_unrememberReducer,
    flashCard:flashCardReducer,
    subscription:subscriptionReducer,
})
export default rootReducer;