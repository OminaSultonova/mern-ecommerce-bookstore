// src/actions/checkoutActions.js

import { createCheckoutSessionStart, createCheckoutSessionSuccess, createCheckoutSessionFailure } from '../reducers/checkoutReducer';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PbwjxRrzIQ9U8rTvPi6HbujCu2Q32c3Eyn2N1FcxzMApa0Q9fqdc97wacuQsPjlaChOyortQiAKEs7sfVClIL3v00VqWV6djv');  // Replace with your actual Stripe publishable key

export const createCheckoutSession = (userId, books, shippingAddress, totalAmount) => async (dispatch) => {
  dispatch(createCheckoutSessionStart());

  try {
    const response = await fetch('http://localhost:4000/api/payment/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        books,
        shippingAddress,
        totalAmount,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const { id: sessionId } = await response.json();

    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      throw error;
    }

    dispatch(createCheckoutSessionSuccess({ sessionId }));
  } catch (error) {
    dispatch(createCheckoutSessionFailure({ error: error.message }));
  }
};
