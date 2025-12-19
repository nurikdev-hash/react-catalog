import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const LIMIT = 30;

export const getProducts = createAsyncThunk(
    "product/getProducts",
    async ({page,sort,order})=>{
        const response = await fetch(
            `https://dummyjson.com/products?limit=${LIMIT}&skip=${page*LIMIT}&sortBy=${sort}&order=${order}`
        );
        const result = await response.json();

        return result;
    }
);

const initialState = {
    products: [],
    status: "init",
    total: null,
    skip: null,
    limit: LIMIT
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled,(state,action)=>{
            console.log(action.payload);
            state.products = action.payload.products;
            state.total = action.payload.total;
            state.skip = action.payload.skip;
        })
    }
});

const productReducer = productSlice.reducer;

export default productReducer;