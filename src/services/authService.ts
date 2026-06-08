import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    updateProfile,
    onAuthStateChanged,
    User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import type { AuthUser, LoginCredentials, RegisterCredentials } from "@/types/auth";

// ─── Helper: Firebase User → Plain AuthUser ───────────────────────────────────
export function mapFirebaseUser(user: User): AuthUser {
    return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
    };
}

// ─── Email / Password Register ────────────────────────────────────────────────
export async function registerWithEmail({
    email,
    password,
    displayName,
}: RegisterCredentials): Promise<AuthUser> {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName });
    return mapFirebaseUser(credential.user);
}

// ─── Email / Password Login ───────────────────────────────────────────────────
export async function loginWithEmail({
    email,
    password,
}: LoginCredentials): Promise<AuthUser> {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return mapFirebaseUser(credential.user);
}

// ─── Google OAuth Login ───────────────────────────────────────────────────────
const googleProvider = new GoogleAuthProvider();

export async function loginWithGoogle(): Promise<AuthUser> {
    const credential = await signInWithPopup(auth, googleProvider);
    return mapFirebaseUser(credential.user);
}

// ─── Logout ───────────────────────────────────────────────────────────────────
export async function logoutUser(): Promise<void> {
    await signOut(auth);
}

// ─── Auth State Observer (for Provider) ──────────────────────────────────────
export function subscribeToAuthChanges(
    callback: (user: AuthUser | null) => void
): () => void {
    return onAuthStateChanged(auth, (user) => {
        callback(user ? mapFirebaseUser(user) : null);
    });
}