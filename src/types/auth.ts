export interface AuthUser {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    emailVerified: boolean;
}

export interface AuthState {
    user: AuthUser | null;
    loading: boolean;
    error: string | null;
    initialized: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    email: string;
    password: string;
    displayName: string;
}