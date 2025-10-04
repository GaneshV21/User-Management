import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    user: localStorage.getItem("user") || {},
  },
  reducers: {
    setAuthToken: (state, action) => {
      state.token = action.payload;
    },
    clearAuthToken: (state) => {
      state.token = null;
      state.user = {};
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setAuthToken, clearAuthToken, setUser } = authSlice.actions;

export default authSlice.reducer;
