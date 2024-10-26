/** @format */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type UserData = {
  id: string;
  name: string;
  username: string;
  email: string;
  email_verified_at: string;
  avatar: string;
  is_valid: boolean;
  city: string;
};

type InitialState = {
  [x: string]: any;
  loading: boolean;
  userData: UserData;
  error: string;
};

const initialState: InitialState = {
  loading: false,
  userData: {
    id: "",
    name: "",
    username: "",
    email: "",
    email_verified_at: "",
    avatar: "",
    is_valid: false,
    city: "",
  },
  error: "",
};

const API_URL = "https://simop.mitrajamur.com/api/";

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  try {
    const response = await axios.get(API_URL + "auth/me", {
      headers: { Authorization: `Bearer ${user.access_token}` },
    });
    return response.data.data;
  } catch (error) {
    // remove localStorage
    localStorage.removeItem("user");
  }
});

export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<UserData>) => {
          state.loading = false;
          state.userData = action.payload;
          state.error = "";
        },
      )
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default userSlice.reducer;
