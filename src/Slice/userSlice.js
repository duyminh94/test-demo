import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../Services/authAPI";

const initialState = {
	users: [],
	isloading: false,
	error: null,
	search: "",
};

export const getUsers = createAsyncThunk(
    "login/getUsers",
    async (_, { rejectWithValue }) => {
		try {
			const data = await authAPI.getUsers();
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
)
const userSlice = createSlice({
	name: "project/users",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getUsers.pending, (state, action) => {
            return { ...state, isloading: true };
		});
		builder.addCase(getUsers.fulfilled, (state, action) => {
			return {...state, isloading: false, users: action.payload}
		});
		builder.addCase(getUsers.rejected, (state, action) => {
			return {...state, isloading: false, error: action.payload}
		});
	},
});

export default userSlice.reducer;