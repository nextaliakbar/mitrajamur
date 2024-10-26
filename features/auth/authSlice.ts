/** @format */

import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
  user: any;
  status: "idle" | "loading" | "failed";
  error: any;
  token: any;
  sidebar: string;
  onLogin: string;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
  token: null,
  sidebar: "transactionList",
  onLogin: "",
};

const API_URL = "https://simop.mitrajamur.com/api/";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: { username: string; password: string }, { getState }) => {
    try {
      const response = await axios.post(API_URL + "auth/login", data);
      const { access_token } = response.data;
      localStorage.setItem("user", JSON.stringify(response.data));
      const bearerToken = `Bearer ${access_token}`;

      return {
        res: response.data,
        bearerToken,
      };
    } catch (error: any) {
      return { error: error.message };
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    data: {
      email: string;
      // username: string;
      name: string;
      phone: string;
      password: string;
      password_confirmation: string;
    },
    { getState },
  ) => {
    try {
      const response = await axios.post(API_URL + "auth/register", data);
      const { access_token } = response.data;
      localStorage.setItem("user", JSON.stringify(response.data));
      const bearerToken = `Bearer ${access_token}`;

      return {
        res: response.data,
        bearerToken,
      };
    } catch (error: any) {
      return { error: error.response.data };
    }
  },
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const response = await axios.get(API_URL + "auth/logout", {
    headers: { Authorization: `Bearer ${user.access_token}` },
  });
  localStorage.removeItem("user");
  return response.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSidebar: (state, action: PayloadAction<string>) => {
      state.sidebar = action.payload;
    },
    setOnLogin: (state, action: PayloadAction<string>) => {
      state.onLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        registerUser.fulfilled,
        (state, { payload: { bearerToken } }) => {
          state.status = "idle";
          axios.defaults.headers.common["Authorization"] = bearerToken;
          state.token = bearerToken;
        },
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "idle";
        axios.defaults.headers.common["Authorization"] =
          action.payload.bearerToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSidebar, setOnLogin } = authSlice.actions;

export default authSlice.reducer;
