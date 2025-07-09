import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.token = action.payload;
    }
  },
});

export const {setAdmin} = adminSlice.actions;
export default adminSlice.reducer;
