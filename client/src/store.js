// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer';
import likeReducer from './reducers/likeReducer';
import checkoutReducer from './reducers/checkoutReducer';
import authReducer from './reducers/authReducer';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    likes: likeReducer,
    checkout: checkoutReducer,
    auth: authReducer,// Add the authReducer

    // Add other reducers here if needed
  },
});

export default store;
