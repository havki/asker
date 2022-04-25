import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/auth.reducer";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  }
})