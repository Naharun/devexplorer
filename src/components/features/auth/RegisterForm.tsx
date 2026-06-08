"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const registerSchema = z
    .object({
        displayName: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Valid email required"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
    const { register: registerUser, googleLogin, loading, error } = useAuth();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            await registerUser({
                displayName: data.displayName,
                email: data.email,
                password: data.password,
            });
            router.push("/dashboard");
        } catch {
            // error in Redux
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await googleLogin();
            router.push("/dashboard");
        } catch {
            // error in Redux
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg">
                <h1 className="mb-2 text-2xl font-bold text-foreground">Create account</h1>
                <p className="mb-6 text-sm text-muted-foreground">
                    Join DevExplorer and start exploring
                </p>

                {error && (
                    <div className="mb-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-foreground">
                            Full Name
                        </label>
                        <input
                            {...register("displayName")}
                            type="text"
                            placeholder="John Doe"
                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                        />
                        {errors.displayName && (
                            <p className="mt-1 text-xs text-destructive">{errors.displayName.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-foreground">
                            Email
                        </label>
                        <input
                            {...register("email")}
                            type="email"
                            placeholder="you@example.com"
                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-foreground">
                            Password
                        </label>
                        <input
                            {...register("password")}
                            type="password"
                            placeholder="••••••••"
                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                        />
                        {errors.password && (
                            <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-foreground">
                            Confirm Password
                        </label>
                        <input
                            {...register("confirmPassword")}
                            type="password"
                            placeholder="••••••••"
                            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                        />
                        {errors.confirmPassword && (
                            <p className="mt-1 text-xs text-destructive">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </button>
                </form>

                <div className="my-4 flex items-center gap-3">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-xs text-muted-foreground">OR</span>
                    <div className="h-px flex-1 bg-border" />
                </div>

                <button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted disabled:opacity-50"
                >
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                </button>

                <p className="mt-6 text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <a href="/login" className="font-medium text-primary hover:underline">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}