import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";

const rootReducer = {
    product: productReducer,
    cart: cartReducer
}

export const store = configureStore({
    reducer: rootReducer
});