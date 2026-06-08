"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/slices/authSlice";
import { subscribeToAuthChanges } from "@/services/authService";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Subscribe to Firebase auth state — keeps Redux in sync automatically
        const unsubscribe = subscribeToAuthChanges((user) => {
            dispatch(setUser(user));
        });

        return () => unsubscribe();
    }, [dispatch]);

    return <>{children}</>;
}