import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    value: {
      token: "",
      user: {},
      isLoggedIn: false,
    },
  },
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.user = action.payload.user;
      state.value.isLoggedIn = true;
    },
    logout: (state) => {
      state.value = {
        token: "",
        user: {},
        isLoggedIn: false,
        
      };
    },
  },
});


export const { login, logout } = authSlice.actions;
export default authSlice.reducer;