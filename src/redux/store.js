import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productReducer";

const rootReducer = {
    product: productReducer
}

export const store = configureStore({
    reducer: rootReducer
});