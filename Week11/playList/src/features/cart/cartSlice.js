import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    try {
      const response = await axios.get("http://localhost:8080/musics");
      console.log("Response data:", response.data); // 추가: 받은 데이터 로그 출력
      return response.data;
    } catch (error) {
      throw Error("Failed to fetch cart items");
    }
  }
);

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalItems: 0,
  status: "idle",
  error: null,
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
        console.log("Fetching cart items..."); // 추가: 데이터 불러오는 중 로그 출력
        state.status = "loading";
        state.error = null; // 추가: 요청 시작 시 에러 초기화
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        console.log("Fetched cart items successfully."); // 추가: 데이터 불러오기 성공 로그 출력
        state.status = "succeeded";
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        console.log("Failed to fetch cart items.", action.error.message); // 추가: 데이터 불러오기 실패 로그 및 에러 메시지 출력
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
