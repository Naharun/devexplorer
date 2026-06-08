export default function Loading() {
    return (
        <div className="space-y-6">
            <div className="h-20 animate-pulse rounded-xl border" />

            <div className="grid gap-6 md:grid-cols-4">
                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className="h-28 animate-pulse rounded-xl border"
                    />
                ))}
            </div>

            <div className="h-96 animate-pulse rounded-xl border" />
        </div>
    );
}