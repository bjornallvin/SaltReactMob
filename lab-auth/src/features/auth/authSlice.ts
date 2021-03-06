import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AppState, AppThunk } from "../../app/store";
import { IFail, ILogout, IUser, IUserInput } from "../../types/auth";
import { login, logout } from "./authApi";
//import { login, logout } from "./authAPI";

export interface AuthState {
  isLoggedIn: boolean;
  userId: string;
  bankAccountNo: string;
  apiStatus: "idle" | "loading" | "failed";
}

const initialState: AuthState = {
  isLoggedIn: false,
  apiStatus: "idle",
  userId: "",
  bankAccountNo: "",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async (userInput: IUserInput) => {
    const response = await login(userInput);

    if (response.status !== "login succeeded") {
      throw new Error("Login Failed");
    }
    return response as IUser;
  }
);
export const logoutAsync = createAsyncThunk(
  "auth/logoutAsync",
  async (userId: string) => {
    const response = await logout(userId);
    if (response.status !== "logout succeed") {
      throw new Error("Logout rejected");
    }
    return response as ILogout;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.

  extraReducers: {
    [loginAsync.pending.type]: (state) => {
      state.apiStatus = "loading";
    },
    [loginAsync.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.apiStatus = "idle";
      state.userId = action.payload.userId;
      state.bankAccountNo = action.payload.bankAccountNo;
      state.isLoggedIn = true;
    },
    [loginAsync.rejected.type]: (state, action) => {
      state.apiStatus = "failed";
    },
    [logoutAsync.pending.type]: (state) => {
      state.apiStatus = "loading";
    },
    [logoutAsync.fulfilled.type]: (state, action: PayloadAction<ILogout>) => {
      state.apiStatus = "idle";
      state.userId = "";
      state.isLoggedIn = false;
    },
    [logoutAsync.rejected.type]: (state, action) => {
      state.apiStatus = "failed";
    },
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.auth.value)`
export const selectIsLoggedIn = (state: AppState) => state.auth.isLoggedIn;
export const selectUserInfo = (state: AppState) => ({
  userId: state.auth.userId,
  bank: state.auth.bankAccountNo,
  isLoggedIn: state.auth.isLoggedIn,
});
export const selectApiStatus = (state: AppState) => state.auth.apiStatus;

export default authSlice.reducer;
