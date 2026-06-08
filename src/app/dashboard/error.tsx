"use client";

interface ErrorProps {
    error: Error;
    reset: () => void;
}

export default function Error({
    reset,
}: ErrorProps) {
    return (
        <div className="py-20 text-center">
            <h2 className="text-xl font-semibold">
                Dashboard crashed
            </h2>

            <button
                onClick={reset}
                className="mt-4 rounded-lg border px-4 py-2"
            >
                Retry
            </button>
        </div>
    );
}