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

            state.total = parseFloat((state.total + action.payload.price).toFixed(2));
            localStorage.setItem("cart",JSON.stringify(state));
        },
        deleteFromCart: (state,action) => {
            state.products = state.products.filter(item => item.id != action.payload.id);

            state.totalProducts -= 1;
            state.total = parseFloat((state.total - (action.payload.price * action.payload.quantity)).toFixed(2));
            console.log(state.total);
            console.log(action.payload.price*action.payload.quantity);
            localStorage.setItem("cart",JSON.stringify(state));
        },
        increament: (state,action)=>{
            let obj = state.products.find((item)=>item.id == action.payload);
            obj.quantity += 1;

            state.total = parseFloat((state.total + obj.price).toFixed(2));
            localStorage.setItem("cart",JSON.stringify(state));
        },
        decreament: (state,action)=>{
            let obj = state.products.find((item)=>item.id == action.payload);
            obj.quantity -= 1;

            state.total = parseFloat((state.total - obj.price).toFixed(2));
            localStorage.setItem("cart",JSON.stringify(state));
        }
    }
});

const cartReducer = cartSlice.reducer;

export default cartReducer;

export const { addToCart,deleteFromCart,increament,decreament } = cartSlice.actions;