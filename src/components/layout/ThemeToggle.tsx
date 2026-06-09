"use client";

import { Sun, Moon } from "lucide-react";

import {
    useAppDispatch,
    useAppSelector,
} from "@/redux/hooks";

import {
    toggleTheme,
} from "@/redux/slices/themeSlice";

export default function ThemeToggle() {
    const dispatch = useAppDispatch();

    const mode = useAppSelector(
        (state) => state.theme.mode
    );

    const isDark = mode === "dark";

    return (
        <button
            onClick={() =>
                dispatch(toggleTheme())
            }
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            title={
                isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            }
        >
            {isDark ? (
                <Sun className="h-4 w-4" />
            ) : (
                <Moon className="h-4 w-4" />
            )}
        </button>
    );
}