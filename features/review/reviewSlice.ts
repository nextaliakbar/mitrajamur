/** @format */

import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

type Review = {
  order_id: string;
  product_name: string;
  product_thumbnail: string;
};

type Orders = {
  order_id: string;
  product_id: string;
  product_name: string;
  product_slug: string;
  product_thumbnail: string;
  review_date: string;
  review: string;
  rating: number;
};

type dataInit = {
  transaction_invoice: string;
  orders: [Orders];
};

type InitialState = {
  [x: string]: any;
  loading: boolean;
  reviews: Review;
  dataReview: [dataInit];
  rating: number;
  review: string;
  error: string;
};

const initialState: InitialState = {
  loading: false,
  reviews: {
    order_id: "",
    product_name: "",
    product_thumbnail: "",
  },
  dataReview: [
    {
      transaction_invoice: "",
      orders: [
        {
          order_id: "",
          product_id: "",
          product_name: "",
          product_slug: "",
          product_thumbnail: "",
          review_date: "",
          review: "",
          rating: 0,
        },
      ],
    },
  ],
  rating: 5,
  review: "",
  error: "",
};

const API_URL = "https://simop.mitrajamur.com/api/";

export const postReview = createAsyncThunk(
  "product/postReview",
  async (data: any) => {
    console.log(data)
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const response = await axios.post(API_URL + "review", data, {
        headers: { Authorization: `Bearer ${user.access_token}` },
      });
      toast.success(response.data.message);
      return response.data.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return error.response.data;
    }
  },
);

export const fetchReviews = createAsyncThunk(
  "product/fetchReviews",
  async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const response = await axios.get(API_URL + "review", {
      headers: { Authorization: `Bearer ${user.access_token}` },
    });
    return response.data.data;
  },
);

export const fetchDetailReview = createAsyncThunk(
  "product/fetchDetailReview",
  async (order_id: string) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const response = await axios.get(API_URL + `review/${order_id}`, {
      headers: { Authorization: `Bearer ${user.access_token}` },
    });
    return response.data.data;
  },
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setRating: (state, action: PayloadAction<number>) => {
      state.rating = action.payload;
    },
    setReview: (state, action: PayloadAction<string>) => {
      state.review = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDetailReview.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchDetailReview.fulfilled,
      (state, action: PayloadAction<Review>) => {
        state.loading = false;
        state.reviews = action.payload;
        state.error = "";
      },
    );
    builder.addCase(fetchDetailReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });
    builder.addCase(fetchReviews.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchReviews.fulfilled,
      (state, action: PayloadAction<[dataInit]>) => {
        state.loading = false;
        state.dataReview = action.payload;
        state.error = "";
      },
    );
    builder.addCase(fetchReviews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "";
    });
  },
});

export const { setRating, setReview } = reviewSlice.actions;

export default reviewSlice.reducer;
