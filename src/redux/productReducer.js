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

export const getCategories = createAsyncThunk(
    "product/getCategories",
    async () => {
        const response = await fetch(
            `https://dummyjson.com/products/categories`
        );
        const result = await response.json();

        return result;
    }
);

export const filterProducts = createAsyncThunk(
    "product/filterProducts",
    async ({category,page,sort,order})=>{
        const response = await fetch(
            `https://dummyjson.com/products/category/${category}?limit=${LIMIT}&skip=${page*LIMIT}&sortBy=${sort}&order=${order}`
        );
        const result = await response.json();

        return result;
    }
)

const initialState = {
    products: [],
    status: "init",
    total: null,
    skip: null,
    limit: LIMIT,
    categories: []
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled,(state,action)=>{
            state.products = action.payload.products;
            state.total = action.payload.total;
            state.skip = action.payload.skip;
        }).addCase(getCategories.fulfilled,(state,action)=>{
            state.categories = action.payload;
        }).addCase(filterProducts.fulfilled,(state,action)=>{
            state.products = action.payload.products;
            state.total = action.payload.total;
            state.skip = action.payload.skip;
        })
    }
});

const productReducer = productSlice.reducer;

export default productReducer;