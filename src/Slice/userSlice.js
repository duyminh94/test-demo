import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userAPI from "../Services/userAPI";

const initialState = {
  users: [],
  isloading: false,
  error: null,
  search: "",
  userdetail: null
};

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (keyword, { rejectWithValue }) => {
    try {
      const data = await userAPI.getUsers(keyword);
      return data;
    } catch (error) {
      
      return rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deteleUser",
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      await userAPI.getdeleteUser(userId);
      dispatch(getUsers());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (values, { dispatch, rejectWithValue }) => {
    try {
       await userAPI.getUpdateUser(values);
      dispatch(getUsers());
    } catch (error) {
      console.log(error)
      return rejectWithValue(error);
    }
  }
);

export const getUserDetail = createAsyncThunk(
  "user/getUserDetail",
  async(id, { rejectWithValue})=>{
    try {
      const data = await userAPI.getUsers(id)
      // eslint-disable-next-line eqeqeq
      const user = data.find?.(item => item.userId == id);
      console.log(data)
      return user
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // getdetailUser: (state, { payload }) => {
    //   state.userEdit = payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state, action) => {
      return { ...state, isloading: true };
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      return { ...state, isloading: false, users: action.payload };
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      return { ...state, isloading: false, error: action.payload, users: [] };
    });

    builder.addCase(updateUser.pending, (state, action) => {
      return { ...state, isloading: true };
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      return { ...state, isloading: false, users: action.payload };
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      return { ...state, isloading: false, error: action.payload};
    });

    builder.addCase(getUserDetail.pending, (state, action) => {
      return { ...state, isloading: true };
    });
    builder.addCase(getUserDetail.fulfilled, (state, action) => {
      return { ...state, isloading: false, userdetail: action.payload };
    });
    builder.addCase(getUserDetail.rejected, (state, action) => {
      return { ...state, isloading: false, error: action.payload, userdetail: {} };
    });
  },
});
// export const { getdetailUser } = userSlice.actions;
export default userSlice.reducer;
