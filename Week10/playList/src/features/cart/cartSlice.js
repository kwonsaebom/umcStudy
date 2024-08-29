import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../constants/cartItems";
import axios from "axios";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    try {
      const response = await axios.get("http://localhost:8080/musics");
      console.log("Received data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching cart items:", error); // 예외가 발생한 경우 콘솔에 에러 출력
      throw error;
    }
  }
);

const initialState = {
  cartItems: cartItems,
  totalAmount: 0,
  totalItems: 0,
  isLoading: false, // 로딩 상태
  error: null, // 에러 메시지
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true; // 로딩 상태를 true로 설정
        state.error = null; // 에러 메시지 초기화
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload; // 가져온 데이터로 상태 업데이트
        state.isLoading = false; // 로딩 상태를 false로 설정
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.error = action.error.message; // 에러 메시지 설정
        state.isLoading = false; // 로딩 상태를 false로 설정
      });
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
