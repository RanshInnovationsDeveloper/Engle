import { createSlice } from "@reduxjs/toolkit";

// let flashCardCategory=localStorage.getItem("flashCardCategory") || "unseen";
const initialState={
    flashCardCategory:localStorage.getItem("flashCardCategory") || "unseen",
    currentCategoryWordIndex:parseInt(localStorage.getItem(`currentCategoryWordIndex_${localStorage.getItem("flashCardCategory") || "unseen"}`)) || 0,
    currentCategoryWordFileActualIndex:parseInt(localStorage.getItem(`currentCategoryWordFileActualIndex_${localStorage.getItem("flashCardCategory") || "unseen"}`)) || 0,

};
const flashCardSlice = createSlice({
    name: "flashCard",
    initialState: initialState,
    reducers: {
        setFlashCardCategory(state, value) {
            state.flashCardCategory = value.payload;
        },
        setCurrentCategoryWordIndex(state, value) {
            state.currentCategoryWordIndex = value.payload;
        },
        setCurrentCategoryWordFileActualIndex(state, value) {
            state.currentCategoryWordFileActualIndex = value.payload;
        },
    },
});

export const { setFlashCardCategory,setCurrentCategoryWordIndex,setCurrentCategoryWordFileActualIndex } = flashCardSlice.actions;
export default flashCardSlice.reducer;