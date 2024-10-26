/** @format */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  privacyPolicy: string;
  filter: boolean;
  mobileFilter: boolean;
  defaultAddress: string;
};

const initialState: InitialState = {
  privacyPolicy: "privacy-policy",
  filter: false,
  mobileFilter: false,
  defaultAddress: "",
};

const LayoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setPrivaccyPolicy: (state, action: PayloadAction<string>) => {
      state.privacyPolicy = action.payload;
    },
    setFilterOpen: (state, action: PayloadAction<boolean>) => {
      state.filter = action.payload;
    },
    setMobileFilterOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileFilter = action.payload;
    },
    setDefaultAddress: (state, action: PayloadAction<string>) => {
      state.defaultAddress = action.payload;
    }
  },
});

export const { setPrivaccyPolicy, setFilterOpen, setMobileFilterOpen, setDefaultAddress } = LayoutSlice.actions;

export default LayoutSlice.reducer;
