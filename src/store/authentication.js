import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    user: {
      userId: null,
      username: null,
    },
    isLoggedIn: false,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.user.userId = action.payload.user.userId;
      state.value.user.username = action.payload.user.username;
      state.value.isLoggedIn = true;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.user.userId = null;
      state.value.user.username = null;
      state.value.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
