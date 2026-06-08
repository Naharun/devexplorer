"use client";

import useDebounce from "@/hooks/useDebounce";
import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";

interface DeveloperSearchProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

export default function DeveloperSearch({
    onSearch,
    placeholder = "Search GitHub users...",
}: DeveloperSearchProps) {
    const [value, setValue] = useState("");
    const debouncedValue = useDebounce(value, 500);

    useEffect(() => {
        onSearch(debouncedValue);
    }, [debouncedValue, onSearch]);

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-12 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                           placeholder:text-gray-400 focus:outline-none focus:ring-2
                           focus:ring-blue-500 transition-all"
            />
            {value && (
                <button
                    onClick={() => setValue("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                    <X className="w-4 h-4" />
                </button>
            )}
        </div>
    );
}