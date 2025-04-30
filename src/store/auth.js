import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: !!localStorage.getItem("token"),
    role: localStorage.getItem("role") || "user",
    token: localStorage.getItem("token") || "", // ✅ Store token
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.role = action.payload.role;
            state.token = action.payload.token; // ✅ Store token
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("role", action.payload.role);
        },
        logout(state) {
            state.isLoggedIn = false;
            state.role = "user";
            state.token = ""; // ✅ Clear token
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        },
    },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
