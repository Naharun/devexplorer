"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";

export default function ThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const mode = useAppSelector(
        (state) => state.theme.mode
    );

    useEffect(() => {
        document.documentElement.classList.toggle(
            "dark",
            mode === "dark"
        );

        localStorage.setItem("theme", mode);
    }, [mode]);

    return <>{children}</>;
}