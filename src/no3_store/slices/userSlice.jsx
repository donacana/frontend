import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  userLoginApi,
  userRegisterApi
} from "../apis/user.api";


export const userLoginSlice = createAsyncThunk(
  "user/login",
  async (userObj, thunkApi) => {
    try {
      const user = await userLoginApi(userObj);

      localStorage.setItem("user", JSON.stringify(user));

      return user;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);


export const userRegisterSlice = createAsyncThunk(
  "user/register",
  async (userObj, thunkApi) => {
    try {
      const user = await userRegisterApi(userObj);

      return user;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);


export const userLogoutSlice = createAsyncThunk(
  "user/logout",
  async () => {
    localStorage.removeItem("user");
  }
);


const initialState = {
  userList: [],
  user: {},
  isLogin: false,
  loading: false,
  error: null
};


const userSlice = createSlice({
  name: "userSlice",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // 로그인
      .addCase(userLoginSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(userLoginSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogin = true;
        state.user = action.payload;
      })

      .addCase(userLoginSlice.rejected, (state, action) => {
        state.loading = false;
        state.isLogin = false;
        state.error = action.payload;
      })


      // 회원가입
      .addCase(userRegisterSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(userRegisterSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.userList.push(action.payload);
      })

      .addCase(userRegisterSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // 로그아웃
      .addCase(userLogoutSlice.fulfilled, (state) => {
        state.user = {};
        state.isLogin = false;
        state.loading = false;
      });
  }
});


export default userSlice.reducer;