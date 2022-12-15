import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slice/authSlice";
import userSlice from "./Slice/userSlice";
import { modalEditProjectReducer } from "./Reducers/userReducer";
import {
  OPEN_FORM_EDIT_USER,
} from "./Constants/constants"
const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    modalEditProjectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [OPEN_FORM_EDIT_USER],
        // Ignore these field paths in all actions
        // ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['modalEditProjectReducer.componentModalContent'],
      },
    }),
});

export default store;
