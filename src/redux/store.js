import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import userReducer from "./userReducer";

const rootReducer = {
    product: productReducer,
    cart: cartReducer,
    user: userReducer
}

export const store = configureStore({
    reducer: rootReducer
});