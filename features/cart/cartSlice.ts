/** @format */

import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import axios from "axios";
import { toast } from "react-hot-toast";

type ListCart = {
  id: string;
  quantity: number;
  product_id: string;
  name: string;
  discount: string;
  thumbnail: string;
  product_price: number;
  price_after_discount: number;
  total_price_product: number;
};

type SummaryCart = {
  total_price_before_discount: number;
  total_product: number;
  total_discount_price: number;
  total_price: number;
  total_weight: number;
};

type InitialState = {
  [x: string]: any;
  listCart: ListCart[];
  summaryCart: SummaryCart;
  loading: boolean;
  error: string;
  quantity: number;
};

const initialState: InitialState = {
  listCart: [],
  summaryCart: {
    total_price_before_discount: 0,
    total_product: 0,
    total_discount_price: 0,
    total_price: 0,
    total_weight: 0,
  },
  quantity: 0,
  loading: false,
  error: "",
};

const API_URL = "https://simop.mitrajamur.com/api/";

export const fetchListCart = createAsyncThunk("cart/fetchList", async () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const response = await axios.get(API_URL + "cart/list", {
    headers: { Authorization: `Bearer ${user.access_token}` },
  });
  return response.data.data;
});

export const fetchSummaryCart = createAsyncThunk(
  "cart/fetchSummary",
  async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const response = await axios.get(API_URL + "cart/summary", {
      headers: { Authorization: `Bearer ${user.access_token}` },
    });
    return response.data.data;
  },
);

export const fetchAddCart = createAsyncThunk(
  "cart/fetchAdd",
  async (data: { product_id: string; quantity: number }) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const response = await axios.post(API_URL + "cart/add", data, {
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

export const fetchUpdateCart = createAsyncThunk(
  "cart/fetchUpdate",
  async (data: { id: string; quantity: number }) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const response = await axios.post(
        API_URL + "cart/update/" + data.id,
        {
          quantity: data.quantity,
        },
        {
          headers: { Authorization: `Bearer ${user.access_token}` },
        },
      );
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
      return { error: error.response.data };
    }
  },
);

export const fetchDeleteCart = createAsyncThunk(
  "cart/fetchDelete",
  async (data: { id: string }) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const response = await axios.delete(API_URL + "cart/delete/" + data.id, {
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

export const cartSlice = createSlice({
  name: "cartData",
  initialState,
  reducers: {
    setQuantity: (state, action: PayloadAction<number>) => {
      state.quantity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchListCart.fulfilled,
        (state, action: PayloadAction<ListCart[]>) => {
          state.loading = false;
          state.listCart = action.payload;
          state.error = "";
        },
      )
      .addCase(fetchListCart.rejected, (state, action) => {
        state.loading = false;
        state.listCart = [];
        state.error = action.error.message || "Something went wrong";
      })

      .addCase(fetchSummaryCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchSummaryCart.fulfilled,
        (state, action: PayloadAction<SummaryCart>) => {
          state.loading = false;
          state.summaryCart = action.payload;
          state.error = "";
        },
      )
      .addCase(fetchSummaryCart.rejected, (state, action) => {
        state.loading = false;
        state.summaryCart = {
          total_discount_price: 0,
          total_product: 0,
          total_price: 0,
          total_price_before_discount: 0,
          total_weight: 0,
        };
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(fetchAddCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAddCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(fetchAddCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(fetchUpdateCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUpdateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(fetchUpdateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(fetchDeleteCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDeleteCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(fetchDeleteCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setQuantity } = cartSlice.actions;

export default cartSlice.reducer;
