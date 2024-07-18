// src/reducers/cartReducer.js

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
} from '../actions/cartActions';

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const updateTotals = (cartItems) => {
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  return { totalQuantity, totalPrice };
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      let updatedCartItems;
      if (existingItem) {
        updatedCartItems = state.cartItems.map(item =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCartItems = [...state.cartItems, { ...action.payload, quantity: 1 }];
      }
      const { totalQuantity, totalPrice } = updateTotals(updatedCartItems);
      return {
        ...state,
        cartItems: updatedCartItems,
        totalQuantity,
        totalPrice,
      };
    }
    case REMOVE_FROM_CART: {
      const updatedCartItems = state.cartItems.filter(item => item.id !== action.payload);
      const { totalQuantity, totalPrice } = updateTotals(updatedCartItems);
      return {
        ...state,
        cartItems: updatedCartItems,
        totalQuantity,
        totalPrice,
      };
    }
    case INCREMENT_QUANTITY: {
      const updatedCartItems = state.cartItems.map(item =>
        item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      );
      const { totalQuantity, totalPrice } = updateTotals(updatedCartItems);
      return {
        ...state,
        cartItems: updatedCartItems,
        totalQuantity,
        totalPrice,
      };
    }
    case DECREMENT_QUANTITY: {
      const updatedCartItems = state.cartItems.map(item =>
        item.id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      const { totalQuantity, totalPrice } = updateTotals(updatedCartItems);
      return {
        ...state,
        cartItems: updatedCartItems,
        totalQuantity,
        totalPrice,
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
