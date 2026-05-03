import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "",
  brand: "Puma",
  movieName: "John Wick",
};

export const transferSlice = createSlice({
  name: "transfer",
  initialState,
  reducers: {
    setcategory: (state, action) => {
      console.log(action);
    },
    setbrand: (state, action) => {
      console.log(action);
      state.brand = action.payload;
    },
    setMovieName: (state, action) => {
      console.log(action);
      state.movieName = action.payload;
    },
  },
});

export const { setcategory, setbrand, setMovieName } = transferSlice.actions;
export default transferSlice.reducer;