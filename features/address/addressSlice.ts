/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import axios from "axios";
import { toast } from "react-hot-toast";
import Router from "next/router";

type Address = {
  id: string;
  customer_id: string;
  label: string;
  name: string;
  phone: string;
  subdistrict_id: number;
  address: string;
  postal_code: string;
  pinpoint: string;
  notes: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

type Provinces = {
  province_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

type Cities = {
  city_id: number;
  province_id: number;
  name: string;
  type: string;
  postal_code: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

type Subdistrict = {
  subdistrict_id: number;
  city_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

type InitialState = {
  [x: string]: any;
  listAddress: Address[];
  defaultAddress: Address;
  modalAdd: boolean;
  modalEdit: boolean;
  loading: boolean;
  error: string;
  listProvince: Provinces[];
  listCities: Cities[];
  listSubdistrict: Subdistrict[];
  listDetailAddress: Address;
};

const initialState: InitialState = {
  listAddress: [],
  defaultAddress: {
    id: "",
    customer_id: "",
    label: "",
    name: "",
    phone: "",
    subdistrict_id: 0,
    address: "",
    postal_code: "",
    pinpoint: "",
    notes: "",
    is_default: false,
    created_at: "",
    updated_at: "",
    deleted_at: "",
  },
  modalAdd: false,
  modalEdit: false,
  loading: false,
  error: "",
  listProvince: [],
  listCities: [],
  listSubdistrict: [],
  listDetailAddress: {
    id: "",
    customer_id: "",
    label: "",
    name: "",
    phone: "",
    subdistrict_id: 0,
    address: "",
    postal_code: "",
    pinpoint: "",
    notes: "",
    is_default: false,
    created_at: "",
    updated_at: "",
    deleted_at: "",
  },
};

const API_URL = "https://simop.mitrajamur.com/api/";

export const fetchDefaultAddress = createAsyncThunk(
  "address/fetchDefault",
  async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const response = await axios.get(API_URL + "address/defaultAddress", {
      headers: { Authorization: `Bearer ${user.access_token}` },
    });
    return response.data.data;
  },
);

export const fetchAddress = createAsyncThunk("address/fetch", async () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const response = await axios.get(API_URL + "address/listAddress", {
    headers: { Authorization: `Bearer ${user.access_token}` },
  });
  return response.data.data;
});

export const fetchSetDefaultAddress = createAsyncThunk(
  "address/fetchSetDefault",
  async (id: string) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const response = await axios.post(
        API_URL + `address/setDefault/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${user.access_token}` },
        },
      );
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  },
);

export const fetchDeleteAddress = createAsyncThunk(
  "address/fetchDelete",
  async (id: string) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const response = await axios.delete(API_URL + `address/delete/${id}`, {
        headers: { Authorization: `Bearer ${user.access_token}` },
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  },
);

export const fetchAddAddress = createAsyncThunk(
  "address/fetchAdd",
  async (data: any) => {
    console.log(data);
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const response = await axios.post(API_URL + "address/addAddress", data, {
        headers: { Authorization: `Bearer ${user.access_token}` },
      });
      Router.push("/dashboard");
      toast.success(response.data.message);
      return response;
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  },
);

export const fetchEditAddress = createAsyncThunk(
  "address/fetchEdit",
  async (data: any) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const response = await axios.post(
        API_URL + "address/update/" + data.id,
        data,
        {
          headers: { Authorization: `Bearer ${user.access_token}` },
        },
      );
      Router.push("/dashboard");
      toast.success(response.data.message);
      return response;
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  },
);

export const fetchDetailAddress = createAsyncThunk(
  "address/fetchDetail",
  async (id: string) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const response = await axios.get(API_URL + `address/detail/${id}`, {
      headers: { Authorization: `Bearer ${user.access_token}` },
    });
    return response.data.data;
  },
);

export const fetchProvince = createAsyncThunk(
  "address/fetchProvince",
  async () => {
    const response = await axios.get(API_URL + "region/provinces");
    return response.data.data;
  },
);

export const fetchCity = createAsyncThunk(
  "address/fetchCity",
  async (id: number) => {
    const response = await axios.get(API_URL + `region/cities/${id}`);
    return response.data.data;
  },
);

export const fetchSubdistrict = createAsyncThunk(
  "address/fetchSubdistrict",
  async (id: number) => {
    const response = await axios.get(API_URL + `region/subdistricts/${id}`);
    return response.data.data;
  },
);

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setModalAdd: (state, action: PayloadAction<boolean>) => {
      state.modalAdd = action.payload;
    },
    setModalEdit: (state, action: PayloadAction<boolean>) => {
      state.modalEdit = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDefaultAddress.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchDefaultAddress.fulfilled, (state, action) => {
      state.loading = false;
      state.defaultAddress = action.payload;
    });
    builder.addCase(fetchDefaultAddress.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(fetchAddress.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      state.loading = false;
      state.listAddress = action.payload;
    });
    builder.addCase(fetchAddress.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(fetchProvince.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProvince.fulfilled, (state, action) => {
      state.loading = false;
      state.listProvince = action.payload;
    });
    builder.addCase(fetchProvince.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(fetchCity.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCity.fulfilled, (state, action) => {
      state.loading = false;
      state.listCities = action.payload;
    });
    builder.addCase(fetchCity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(fetchSubdistrict.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchSubdistrict.fulfilled, (state, action) => {
      state.loading = false;
      state.listSubdistrict = action.payload;
    });
    builder.addCase(fetchSubdistrict.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(fetchDetailAddress.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchDetailAddress.fulfilled, (state, action) => {
      state.loading = false;
      state.detailAddress = action.payload;
    });
    builder.addCase(fetchDetailAddress.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export const { setModalAdd, setModalEdit } = addressSlice.actions;

export default addressSlice.reducer;
