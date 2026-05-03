import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartslice";
import transferReducer from "./slices/datatransferslice";

const mystore = configureStore({
  reducer: {
    cart: cartReducer,
    transfer: transferReducer,
  },
});

export default mystore;