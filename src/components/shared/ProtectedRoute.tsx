"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

export default function ProtectedRoute({
    children,
    redirectTo = "/login",
}: ProtectedRouteProps) {
    const { isAuthenticated, initialized } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Wait for Firebase to initialize before redirecting
        if (initialized && !isAuthenticated) {
            router.replace(redirectTo);
        }
    }, [initialized, isAuthenticated, router, redirectTo]);

    // Show nothing while Firebase is checking session
    if (!initialized) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    if (!isAuthenticated) return null;

    return <>{children}</>;
}