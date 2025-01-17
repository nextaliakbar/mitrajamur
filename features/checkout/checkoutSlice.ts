/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import axios from "axios";
import { toast } from "react-hot-toast";

type Ongkir = {
  code: string;
  name: string;
  costs: [
    {
      service: string;
      description: string;
      cost: [
        {
          value: number;
          etd: string;
          note: string;
        },
      ];
    },
  ];
};

type Transaction = {
  id: string;
  transaction_date: string;
  transaction_status: string;
  transaction_invoice: string;
  grand_total: string;
  snap_token: string;
  product: [
    {
      order_id: string;
      product_name: string;
      product_thumbnail: string;
      product_quantity: number;
      product_price: string;
      total_product_price: string;
      rating: boolean;
    },
  ];
};

type TransactionDetail = {
  id: string;
  transaction_invoice: string;
  transaction_date: string;
  transaction_status: string;
  courier: string;
  receipt_number: string;
  customer_address: string;
  payment_method: string;
  total_price: string;
  courier_cost: string;
  total_discount: string;
  service_fee: string;
  grand_total: string;
  product: [
    {
      order_id: string;
      product_name: string;
      product_thumbnail: string;
      product_quantity: number;
      product_price: string;
      total_product_price: string;
      rating: boolean;
    },
  ];
};

type Query = {
  waybill: string;
  courier: string;
};
type status = {
  code: number;
  description: string;
};

type summary = {
  courier_code: string;
  courier_name: string;
  waybill_number: string;
  service_code: string;
  waybill_date: string;
  shipper_name: string;
  receiver_name: string;
  origin: string;
  destination: string;
  status: string;
};

type details = {
  waybill_number: string;
  waybill_date: string;
  waybill_time: string;
  weight: string;
  origin: string;
  destination: string;
  shipper_name: string;
  shipper_address1: string;
  shipper_address2: string;
  shipper_address3: string;
  shipper_city: string;
  receiver_name: string;
  receiver_address1: string;
  receiver_address2: string;
  receiver_address3: string;
  receiver_city: string;
};

type manifest = [
  {
    manifest_code: string;
    manifest_description: string;
    manifest_date: string;
    manifest_time: string;
    city_name: string;
  },
];

type delivery_status = {
  status: string;
  pod_receiver: string;
  pod_date: string;
  pod_time: string;
};

type Result = {
  delivered: boolean;
  summary: summary;
  details: details;
  manifest: manifest;
  delivery_status: delivery_status;
};

type rajaOngkir = {
  query: Query;
  status: status;
  result: Result;
};

type TransactionData = {
  invoice: string;
  date: string;
};

type trackingData = {
  success: boolean;
  message: string;
  data: {
    rajaongkir: rajaOngkir;
  };
  transaction: TransactionData;
};

type InitialState = {
  listOngkir: Ongkir[];
  listTransaction: Transaction[];
  detailTransaction: TransactionDetail[];
  shipMethod: string;
  ongkir: number;
  shipmentService: string;
  notes: string;
  modalDetail: boolean;
  loading: boolean;
  error: string;
  modalTracking: boolean;
  paymentMethod: string;  // Menambahkan status untuk metode pembayaran
};

const initialState: InitialState = {
  listOngkir: [],
  listTransaction: [],
  detailTransaction: [],
  shipMethod: "",
  ongkir: 0,
  shipmentService: "",
  notes: "",
  modalDetail: false,
  loading: false,
  error: "",
  modalTracking: false,
  paymentMethod: "",  // Default kosong, bisa diubah saat checkout
};

const API_URL = "https://simop.mitrajamur.com/api/";

export const fetchOngkir = createAsyncThunk(
  "ongkir/fetch",
  async (data: { destination: number; weight: number }) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const response = await axios.post(API_URL + "checkout/getOngkir", data, {
      headers: { Authorization: `Bearer ${user.access_token}` },
    });
    return response.data.data;
  },
);

export const fetchCheckout = createAsyncThunk(
  "checkout/fetch",
  async (data: {
    shipping_method: string;
    courier: string;
    courier_cost: number;
    weight: number;
    total_price: number;
    total_discount: number;
    total_shipping: number;
    service_fee: number;
    grand_total: number;
    notes: string;
    payment_method: string;  // Menambahkan parameter untuk metode pembayaran
  }) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const response = await axios.post(API_URL + "checkout", data, {
        headers: { Authorization: `Bearer ${user.access_token}` },
      });
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }
);

export const fetchTransaction = createAsyncThunk(
  "transaction/fetch",
  async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const response = await axios.get(API_URL + "transaction/list", {
      headers: { Authorization: `Bearer ${user.access_token}` },
    });
    return response.data.data;
  },
);

export const fetchTransactionDetail = createAsyncThunk(
  "transactionDetail/fetch",
  async (id: string) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const response = await axios.get(API_URL + `transaction/detail/${id}`, {
      headers: { Authorization: `Bearer ${user.access_token}` },
    });
    return response.data.data;
  },
);

export const fetchTracking = createAsyncThunk(
  "tracking/fetch",
  async (id: string) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const response = await axios.get(API_URL + `tracking/${id}`, {
      headers: { Authorization: `Bearer ${user.access_token}` },
    });
    return response.data;
  },
);

const ongkirSlice = createSlice({
  name: "ongkir",
  initialState,
  reducers: {
    setShipMethod(state, action: PayloadAction<string>) {
      state.shipMethod = action.payload;
    },
    setOngkir(state, action: PayloadAction<number>) {
      state.ongkir = action.payload;
    },
    setShipmentService(state, action: PayloadAction<string>) {
      state.shipmentService = action.payload;
    },
    setNotes(state, action: PayloadAction<string>) {
      state.notes = action.payload;
    },
    setModalDetail(state, action: PayloadAction<boolean>) {
      state.modalDetail = action.payload;
    },
    setModalTracking(state, action: PayloadAction<boolean>) {
      state.modalTracking = action.payload;
    },
    setPaymentMethod(state, action: PayloadAction<string>) {  // Action untuk set metode pembayaran
      state.paymentMethod = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOngkir.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOngkir.fulfilled, (state, action) => {
      state.loading = false;
      state.listOngkir = action.payload;
    });
    builder.addCase(fetchOngkir.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(fetchCheckout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCheckout.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(fetchCheckout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
      toast.error("Something went wrong");
    });
    builder.addCase(fetchTransaction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTransaction.fulfilled, (state, action) => {
      state.loading = false;
      state.listTransaction = action.payload;
    });
    builder.addCase(fetchTransaction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(fetchTransactionDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTransactionDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.detailTransaction = action.payload;
    });
    builder.addCase(fetchTransactionDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(fetchTracking.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTracking.fulfilled, (state, action) => {
      state.loading = false;
      state.trackingData = action.payload;
    });
    builder.addCase(fetchTracking.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export const {
  setShipMethod,
  setOngkir,
  setShipmentService,
  setNotes,
  setModalDetail,
  setModalTracking,
  setPaymentMethod,  // Action untuk mengatur metode pembayaran
} = ongkirSlice.actions;

export default ongkirSlice.reducer;
