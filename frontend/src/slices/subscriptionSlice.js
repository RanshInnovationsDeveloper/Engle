import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    subscriptionToken: localStorage.getItem("subscriptionToken")|| null,
};

const subscriptionSlice = createSlice({
    name: "subscription",
    initialState: initialState,
    reducers: {
        setSubscriptionToken(state, value) {
            state.subscriptionToken = value.payload;
        }      
    },
});

export const { setSubscriptionToken } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;

