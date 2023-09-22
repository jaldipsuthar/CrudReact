import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./slice/cardSlice";
import inputReducer from "./slice/inputSlice"
export const store = configureStore({
  reducer: {
    cart: cardReducer,
    input:inputReducer,
  },
});
