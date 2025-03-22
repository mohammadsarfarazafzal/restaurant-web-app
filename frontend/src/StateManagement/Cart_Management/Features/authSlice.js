import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      setTokenWithExpiry(action.payload,1);
    },
    logout: (state) => {
      state.token = false;
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;