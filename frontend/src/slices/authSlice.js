import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    userEmail: localStorage.getItem("userEmail") || null,
    userName:  localStorage.getItem("userName") || null,
    loading:   false,
    authUserId: localStorage.getItem("authUserId")|| null,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setauthUserId(state, value) {
            state.authUserId = value.payload;
        },
        setuserEmail(state, value) {
            state.userEmail = value.payload;
        },
        setuserName(state, value) {
            state.userName = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
        setHeader(state, value) {
            state.header = value.payload;
        },
        
    },
});

export const { setuserEmail,setuserName, setauthUserId , setLoading, setHeader } = authSlice.actions;

export default authSlice.reducer;

