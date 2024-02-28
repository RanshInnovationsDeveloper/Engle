import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userEmail: null,
    userName:null,
    loading: false,
    authUserData:null,
    header:null
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setauthUserData(state, value) {
            state.authUserData = value.payload;
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
// console.log("our auth slice data is ",authSlice.actions);
export const { setuserEmail,setuserName, setauthUserData , setLoading, setHeader } = authSlice.actions;

export default authSlice.reducer;








// example to explain how redux work -
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   count: 0,
// };

// const counterSlice = createSlice({
//   name: 'counter',
//   initialState,
//   reducers: {
//     increment(state) {
//       state.count += 1;
//     },
//     decrement(state) {
//       state.count -= 1;
//     },
//   },
// });

// export const { increment, decrement } = counterSlice.actions;
// export default counterSlice.reducer;
