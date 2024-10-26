/** @format */

import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

interface Wishlist {
  product_id: string;
  product_name: string;
  product_slug: string;
  product_thumbnail: string;
  product_discount: string;
  review_count: number;
  rating_avg: number;
  product_price: number;
  price_after_discount: number;
}

interface WishlistStatus {
  status: boolean;
  data: boolean;
}

type InitialState = {
  listWishlist: Wishlist[];
  status: boolean;
  loading: boolean;
  error: string;
  WishlistStatus: WishlistStatus;
};

const initialState: InitialState = {
  listWishlist: [],
  status: false,
  loading: false,
  error: "",
  WishlistStatus: {
    status: false,
    data: false,
  },
};

const API_URL = "https://simop.mitrajamur.com/api/";

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const response = await axios.get(API_URL + "wishlist/list", {
        headers: { Authorization: `Bearer ${user.access_token}` },
      });
      return response.data.data;
    } catch (error: any) {
      return { error: error.response.data };
    }
  },
);

export const fetchAddWislist = createAsyncThunk(
  "wishlist/fetchAddWislist",
  async (data: { product_id: string }) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const response = await axios.post(API_URL + "wishlist", {
        product_id: data.product_id,
        headers: { Authorization: `Bearer ${user.access_token}` },
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return { error: error.response.data };
    }
  },
);

export const fetchWishlistStatus = createAsyncThunk(
  "wishlist/fetchWishlistStatus",
  async (data: { slug: string }) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const response = await axios.get(API_URL + `wishlist/status/${data.slug}`, {
      headers: { Authorization: `Bearer ${user.access_token}` },
    });
    return response.data;
  },
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<any>) => {
      state.listWishlist = action.payload;
    },
  },
  extraReducers: {
    [fetchWishlist.pending as any]: (state) => {
      state.loading = true;
    },
    [fetchWishlist.fulfilled as any]: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.listWishlist = action.payload;
      state.error = "";
    },
    [fetchWishlist.rejected as any]: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.listWishlist = [];
      state.error = action.payload;
    },
    [fetchAddWislist.pending as any]: (state) => {
      state.loading = true;
    },
    [fetchAddWislist.fulfilled as any]: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.status = action.payload;
      state.error = "";
    },
    [fetchAddWislist.rejected as any]: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.status = false;
      state.error = action.payload;
    },
    [fetchWishlistStatus.pending as any]: (state) => {
      state.loading = true;
    },
    [fetchWishlistStatus.fulfilled as any]: (
      state,
      action: PayloadAction<any>,
    ) => {
      state.loading = false;
      state.WishlistStatus = action.payload;
      state.error = "";
    },
    [fetchWishlistStatus.rejected as any]: (
      state,
      action: PayloadAction<any>,
    ) => {
      state.loading = false;
      state.WishlistStatus = {
        status: false,
        data: false,
      };
      state.error = action.payload;
    },
  },
});

export const { setWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
