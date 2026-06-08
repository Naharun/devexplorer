import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
    loginWithEmail,
    loginWithGoogle,
    logoutUser,
    registerWithEmail,
} from "@/services/authService";
import { setError, setLoading, clearError, logout } from "@/redux/slices/authSlice";
import type { LoginCredentials, RegisterCredentials } from "@/types/auth";

export function useAuth() {
    const dispatch = useAppDispatch();
    const { user, loading, error, initialized } = useAppSelector(
        (state) => state.auth
    );

    // ─── Register ──────────────────────────────────────────────────────────────
    const register = async (credentials: RegisterCredentials) => {
        try {
            dispatch(setLoading(true));
            dispatch(clearError());
            await registerWithEmail(credentials);
            // AuthProvider will auto-update Redux via onAuthStateChanged
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : "Registration failed";
            dispatch(setError(message));
            throw err;
        }
    };

    // ─── Email Login ───────────────────────────────────────────────────────────
    const login = async (credentials: LoginCredentials) => {
        try {
            dispatch(setLoading(true));
            dispatch(clearError());
            await loginWithEmail(credentials);
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : "Login failed";
            dispatch(setError(message));
            throw err;
        }
    };

    // ─── Google Login ──────────────────────────────────────────────────────────
    const googleLogin = async () => {
        try {
            dispatch(setLoading(true));
            dispatch(clearError());
            await loginWithGoogle();
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : "Google login failed";
            dispatch(setError(message));
            throw err;
        }
    };

    // ─── Logout ────────────────────────────────────────────────────────────────
    const signOut = async () => {
        try {
            await logoutUser();
            dispatch(logout());
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Logout failed";
            dispatch(setError(message));
        }
    };

    return {
        user,
        loading,
        error,
        initialized,
        isAuthenticated: !!user,
        register,
        login,
        googleLogin,
        signOut,
    };
}