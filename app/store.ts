/** @format */

import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "../features/layout/LayoutSlice";
import userReducer from "../features/auth/userSlice";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/product/ProductSlice";
import cartReducer from "../features/cart/cartSlice";
import addressReducer from "../features/address/addressSlice";
import checkoutReducer from "../features/checkout/checkoutSlice";
import wishlistReducer from "../features/wishlist/WishlistSlice";
import profileReducer from "../features/profile/ProfileSlice";
import reviewReducer from "../features/review/reviewSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    address: addressReducer,
    checkout: checkoutReducer,
    wishlist: wishlistReducer,
    layout: layoutReducer,
    profile: profileReducer,
    review: reviewReducer,
  },
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
