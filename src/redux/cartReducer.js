import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) || {
    products: [],
    total: 0,
    discountedTotal: 0,
    userId: null,
    totalProducts: 0,
    totalQuantity: 0
};

const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        addToCart: (state, action) => {

            let isAdded = state.products.find(item => item.id == action.payload.id);
            if (isAdded) {
                isAdded.quantity += 1;
            } else {
                state.products.push({ ...action.payload, quantity: 1 });
                state.totalProducts += 1;
            }

            localStorage.setItem("cart",JSON.stringify(state));
        }
    }
});

const cartReducer = cartSlice.reducer;

export default cartReducer;

export const { addToCart } = cartSlice.actions;