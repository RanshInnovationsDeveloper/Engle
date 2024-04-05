import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isremember:false,
    isunremember:false
}

const remember_unrememberSlice = createSlice({
    name: "remember_unremember",
    initialState: initialState,
    reducers: {
        setIsremember(state, value) {
            state.isremember = value.payload;
        },
        setIsunremember(state, value) {
            state.isunremember = value.payload;
        }
    }
});

export const { setIsremember, setIsunremember } = remember_unrememberSlice.actions;
export default remember_unrememberSlice.reducer;