import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slice/authSlice";
import userSlice from "./Slice/userSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice
  },
});

export default store;
