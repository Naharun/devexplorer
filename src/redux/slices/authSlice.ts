import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, AuthUser } from "@/types/auth";

const initialState: AuthState = {
    user: null,
    loading: true, // true initially — waiting for Firebase onAuthStateChanged
    error: null,
    initialized: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<AuthUser | null>) {
            state.user = action.payload;
            state.loading = false;
            state.initialized = true;
            state.error = null;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
            state.loading = false;
        },
        clearError(state) {
            state.error = null;
        },
        logout(state) {
            state.user = null;
            state.loading = false;
            state.error = null;
        },
    },
});

export const { setUser, setLoading, setError, clearError, logout } =
    authSlice.actions;

export default authSlice.reducer;