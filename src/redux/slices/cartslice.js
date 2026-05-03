import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtocart: (state, action) => {
      console.log(action);
    },
    removefromcart: (state, action) => {
      console.log(action);
    },
  },
});

export const { addtocart, removefromcart } = cartSlice.actions;
export default cartSlice.reducer;