/** @format */

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Router from "next/router";
import toast from "react-hot-toast";

type ProfileData = {
  id: string;
  name: string;
  username: string;
  email: string;
  email_verified_at: string;
  phone: string;
  phone_verified_at: string;
  birthdate: string;
  sex: string;
  avatar: string;
  status: boolean;
  level: string;
};

type InitialState = {
  [x: string]: any;
  loading: boolean;
  profileData: ProfileData;
  error: string;
};

const initialState: InitialState = {
  loading: false,
  profileData: {
    id: "",
    name: "",
    username: "",
    email: "",
    email_verified_at: "",
    phone: "",
    phone_verified_at: "",
    birthdate: "",
    sex: "",
    avatar: "",
    status: false,
    level: "",
  },
  error: "",
};

const API_URL = "https://simop.mitrajamur.com/api/";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    try {
      const response = await axios.get(API_URL + "profile", {
        headers: { Authorization: `Bearer ${user.access_token}` },
      });
      return response.data.data;
    } catch (error) {}
  },
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (data: any) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    try {
      const response = await axios.post(API_URL + "profile/update", data, {
        headers: { Authorization: `Bearer ${user.access_token}` },
      });
      Router.push("/dashboard");
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  },
);

export const changePassword = createAsyncThunk(
  "profile/changePassword",
  async (data: any) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    try {
      const response = await axios.post(
        API_URL + "profile/update-password",
        data,
        {
          headers: { Authorization: `Bearer ${user.access_token}` },
        },
      );
      Router.push("/dashboard");
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  },
);

export const checkUsername = createAsyncThunk(
  "profile/checkUsername",
  async (username: string) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    try {
      const response = await axios.get(API_URL + "profile/check-username", {
        headers: { Authorization: `Bearer ${user.access_token}` },
        params: { username: username },
      });
      return response.data.data;
    } catch (error) {}
  },
);

export const profileSlice = createSlice({
  name: "profileData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchProfile.fulfilled,
        (state, action: PayloadAction<ProfileData>) => {
          state.loading = false;
          state.profileData = action.payload;
          state.error = "";
        },
      )
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default profileSlice.reducer;
