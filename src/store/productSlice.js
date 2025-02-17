import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StatusCode from "../utils/StatusCode";

const {LOADING, ERROR, IDLE} = StatusCode

const initialState = {
  data: [],
  status: IDLE,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // fetchProducts(state, action) {
    //   state.data = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.status = LOADING;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = IDLE
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = ERROR;
      });
  },
});

export const { fetchProducts } = productSlice.actions;
export default productSlice.reducer;

export const getProducts = createAsyncThunk("products/get", async () => {
  const data = await fetch("https://fakestoreapi.com/products");
  const result = await data.json();
  return result;
});

// export const getProducts = () => {
//   return async function getProductsThunk(dispatch, getState) {
//     const data = await fetch("https://fakestoreapi.com/products");
//     const result = await data.json();
//     dispatch(fetchProducts(result));
//   };
// };
