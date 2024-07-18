// src/reducers/checkoutReducer.js

import { createSlice } from '@reduxjs/toolkit';

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    error: null,
    isLoading: false,
  },
  reducers: {
    createCheckoutSessionStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    createCheckoutSessionSuccess: (state) => {
      state.isLoading = false;
    },
    createCheckoutSessionFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const { createCheckoutSessionStart, createCheckoutSessionSuccess, createCheckoutSessionFailure } = checkoutSlice.actions;

export default checkoutSlice.reducer;
