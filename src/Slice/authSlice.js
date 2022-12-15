import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../Services/authAPI";

const initialState = {
  user: JSON.parse(localStorage.getItem({"user": undefined})) || null,
  isloading: false,
  error: null,
};

export const login = createAsyncThunk("auth/login", async (values) => {
  try {
    const data = await authAPI.login(values);
    localStorage.setItem("user", JSON.stringify(data));
  } catch (error) {
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem("user");
      return { ...state, user: null };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      return { ...state, isloading: true };
    });

    builder.addCase(login.fulfilled, (state, action) => {
      return { ...state, isloading: false, user: action.payload };
    });

    builder.addCase(login.rejected, (state, action) => {
      return { ...state, isloading: false, error: action.error.message };
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
