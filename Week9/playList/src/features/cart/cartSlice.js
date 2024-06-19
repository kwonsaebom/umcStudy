import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../constants/cartItems";

const initialState = {
  cartItems: cartItems,
  totalAmount: 0,
  totalItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increase: (state, action) => {
      const { payload: itemId } = action;
      state.cartItems = state.cartItems.map((item) =>
        item.id === itemId ? { ...item, amount: item.amount + 1 } : item
      );
    },
    decrease: (state, action) => {
      const { payload: itemId } = action;
      state.cartItems = state.cartItems.map((item) =>
        item.id === itemId ? { ...item, amount: item.amount - 1 } : item
      );
    },
    removeItem: (state, action) => {
      const { payload: itemId } = action;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    calculateTotals: (state) => {
      let totalAmount = 0;
      let totalItems = 0;
      state.cartItems.forEach((item) => {
        totalItems += item.amount;
        totalAmount += item.amount * item.price;
      });
      state.totalAmount = totalAmount;
      state.totalItems = totalItems;
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
