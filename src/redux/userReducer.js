import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk(
    "userSlice/userLogin",
    async ({ username, password }) => {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password,
                expiresInMins: 30, // optional, defaults to 60
            }),
            // credentials: 'include'
        });
        const result = await response.json();

        return result;
    }
);

const initialState = {
    user: null,
    status: "int"
};

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.status = "int";
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.user = action.payload;
            state.status = "success";
            localStorage.setItem("accessToken", action.payload.accessToken);
            localStorage.setItem("refreshToken", action.payload.refreshToken);
        })
    }
});

const userReducer = userSlice.reducer;

export default userReducer;

export const { logout } = userSlice.actions;