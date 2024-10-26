/** @format */

import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

type Product = {
  id: string;
  nameuser_id: string;
  product_label_id: string;
  product_category_id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  tags: string;
  thumbnail: string;
  stock: number;
  price: string;
  weight: string;
  dimension: string;
  discount: string;
  status: string;
  is_active: boolean;
  is_selected: boolean;
  is_preorder: boolean;
  preorder_duration: string;
  shipment: string;
  payment: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  category_name: string;
  label_name: string;
  review_count: number;
  rating_avg: number;

};

type Category = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

type review = {
  customer_avatar: string;
  customer_name: string;
  rating: number;
  review: string;
  review_date: string;
};

type productDetail = {
  product: Product;
  review: review[];
  relatedProduct: Product[];
};

type InitialState = {
  [x: string]: any;
  loading: boolean;
  products: Product[];
  productDetail: productDetail;
  newProducts: Product[];
  selectedProducts: Product[];
  detailProduct: Product;
  categories: Category[];
  filter: {
    q: string;
    category: string;
    sort: string;
    rating: number;
  };
  error: string;
  showShare: boolean;
  reviewOrder: boolean;
};

const initialState: InitialState = {
  loading: false,
  products: [],
  productDetail: {
    product: {
      id: "",
      nameuser_id: "",
      product_label_id: "",
      product_category_id: "",
      sku: "",
      name: "",
      slug: "",
      description: "",
      tags: "",
      thumbnail: "",
      stock: 0,
      price: "",
      weight: "",
      dimension: "",
      discount: "",
      status: "",
      is_active: false,
      is_selected: false,
      is_preorder: false,
      preorder_duration: "",
      shipment: "",
      payment: "",
      created_at: "",
      updated_at: "",
      deleted_at: "",
      category_name: "",
      label_name: "",
      review_count: 0,
      rating_avg: 0,
    },
    review: [
      {
        customer_avatar: "",
        customer_name: "",
        rating: 0,
        review: "",
        review_date: "",
      },
    ],

    relatedProduct: [
      {
        id: "",
        nameuser_id: "",
        product_label_id: "",
        product_category_id: "",
        sku: "",
        name: "",
        slug: "",
        description: "",
        tags: "",
        thumbnail: "",
        stock: 0,
        price: "",
        weight: "",
        dimension: "",
        discount: "",
        status: "",
        is_active: false,
        is_selected: false,
        is_preorder: false,
        preorder_duration: "",
        shipment: "",
        payment: "",
        created_at: "",
        updated_at: "",
        deleted_at: "",
        category_name: "",
        label_name: "",
        review_count: 0,
        rating_avg: 0,
      },
    ],
  },

  newProducts: [],
  selectedProducts: [],
  categories: [],
  detailProduct: {
    id: "",
    nameuser_id: "",
    product_label_id: "",
    product_category_id: "",
    sku: "",
    name: "",
    slug: "",
    description: "",
    // JSON parse tags to array
    tags: "",
    thumbnail: "",
    stock: 0,
    price: "",
    weight: "",
    dimension: "",
    discount: "",
    status: "",
    is_active: false,
    is_selected: false,
    is_preorder: false,
    preorder_duration: "",
    shipment: "",
    payment: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",
    category_name: "",
    label_name: "",
    review_count: 0,
    rating_avg: 0,
  },
  filter: {
    q: "",
    category: "",
    sort: "price_asc",
    rating: 5,
  },
  error: "",
  showShare: false,
  reviewOrder: false,
};

const API_URL = "https://simop.mitrajamur.com/api/";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await axios.get(
      "https://simop.mitrajamur.com/api/product/list",
    );
    return response.data.data.products;
  }
);

export const fetchNewProducts = createAsyncThunk(
  "product/fetchNewProducts",
  async () => {
    const response = await axios.get(
      "https://simop.mitrajamur.com/api/product/latest",
    );
    return response.data.data;
  },
);

export const fetchSelectedProducts = createAsyncThunk(
  "product/fetchSelectedProducts",
  async () => {
    const response = await axios.get(
      "https://simop.mitrajamur.com/api/product/selected",
    );
    return response.data.data;
  },
);

export const fetchDetailProduct = createAsyncThunk(
  "product/fetchDetailProduct",
  async (slug: string) => {
    const response = await axios.get(
      `https://simop.mitrajamur.com/api/product/detail/${slug}`,
    );
    return response.data.data;
  },
);

export const fetchCategories = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const response = await axios.get(API_URL + "category/list");
    return response.data.data;
  },
);

export const fetchFilteredProducts = createAsyncThunk(
  "product/fetchFilteredProducts",
  async (params: any) => {
    const response = await axios.get(API_URL + "product/filter", {
      params,
    });
    return response.data.data.products;
  },
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setFilterSearch: (state, action: PayloadAction<string>) => {
      state.filter.q = action.payload;
    },
    setFilterCategory: (state, action: PayloadAction<string>) => {
      state.filter.category = action.payload;
    },
    setFilterSort: (state, action: PayloadAction<string>) => {
      state.filter.sort = action.payload;
    },
    setFilterRating: (state, action: PayloadAction<number>) => {
      state.filter.rating = action.payload;
    },
    setShowShare: (state, action: PayloadAction<boolean>) => {
      state.showShare = action.payload;
    },
    setReviewOrder: (state, action: PayloadAction<boolean>) => {
      state.reviewOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
        state.error = "";
      },
    );
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(fetchNewProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchNewProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.newProducts = action.payload;
        state.error = "";
      },
    );
    builder.addCase(fetchNewProducts.rejected, (state, action) => {
      state.loading = false;
      state.newProducts = [];
      state.error = action.error.message || "Something went wrong";
    });

    builder.addCase(fetchSelectedProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchSelectedProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.selectedProducts = action.payload;
        state.error = "";
      },
    );
    builder.addCase(fetchSelectedProducts.rejected, (state, action) => {
      state.loading = false;
      state.selectedProducts = [];
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(fetchDetailProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchDetailProduct.fulfilled,
      (state, action: PayloadAction<productDetail>) => {
        state.loading = false;
        state.productDetail = action.payload;
        state.error = "";
      },
    );
    builder.addCase(fetchDetailProduct.rejected, (state, action) => {
      state.loading = false;
      state.detailProduct = {
        id: "",
        nameuser_id: "",
        product_label_id: "",
        product_category_id: "",
        sku: "",
        name: "",
        slug: "",
        description: "",
        tags: "",
        thumbnail: "",
        stock: 0,
        price: "",
        weight: "",
        dimension: "",
        discount: "",
        status: "",
        is_active: false,
        is_selected: false,
        is_preorder: false,
        preorder_duration: "",
        shipment: "",
        payment: "",
        created_at: "",
        updated_at: "",
        deleted_at: "",
        category_name: "",
        label_name: "",
        review_count: 0,
        rating_avg: 0,
      };
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchCategories.fulfilled,
      (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = "";
      },
    );
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.categories = [];
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(fetchFilteredProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchFilteredProducts.fulfilled,
      (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
        state.error = "";
      },
    );
    builder.addCase(fetchFilteredProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export const {
  setFilterSearch,
  setFilterCategory,
  setFilterSort,
  setFilterRating,
  setShowShare,
  setReviewOrder,
} = productSlice.actions;

export default productSlice.reducer;
