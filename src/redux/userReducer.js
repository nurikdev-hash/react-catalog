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

        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);

        const authUser = await fetch('https://dummyjson.com/auth/me', {
            method: 'GET',
            headers: {
                'Authorization': result.accessToken,
            },
            // credentials: 'include'
        });

        const authUserResult = await authUser.json();

        return authUserResult;
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
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.user = action.payload;
            state.status = "success";
        })
    }
});

const userReducer = userSlice.reducer;

export default userReducer;

export const { logout, setUser } = userSlice.actions;