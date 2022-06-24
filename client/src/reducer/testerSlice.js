import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const testSlice = createSlice({
  name: "test",
  initialState: {
    cellId: "",
  },

  reducers: {
    setCurrnetGrid: (state, action) => {
      state.cellId = action.payload;
    },
    emptyCurrnetGrid: (state) => {
      state.cellId = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrnetGrid, emptyCurrnetGrid } = testSlice.actions;

export default testSlice.reducer;
