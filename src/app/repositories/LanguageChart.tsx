"use client";

import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    ResponsiveContainer,
    Legend,
} from "recharts";

const LANGUAGE_COLORS: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Rust: "#dea584",
    Go: "#00ADD8",
    Java: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
    Ruby: "#701516",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
    PHP: "#4F5D95",
    CSS: "#563d7c",
    HTML: "#e34c26",
    Shell: "#89e051",
};

const FALLBACK_COLORS = [
    "#6366f1", "#8b5cf6", "#ec4899",
    "#f43f5e", "#f97316", "#eab308",
];

interface Props {
    languages: Record<string, number>;
}

export default function LanguageChart({ languages }: Props) {
    const total = Object.values(languages).reduce((a, b) => a + b, 0);

    const data = Object.entries(languages)
        .sort((a, b) => b[1] - a[1])
        .map(([name, value]) => ({
            name,
            value,
            percent: ((value / total) * 100).toFixed(1),
        }));

    return (
        <ResponsiveContainer width="100%" height={260}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={50}
                    paddingAngle={2}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={entry.name}
                            fill={
                                LANGUAGE_COLORS[entry.name] ??
                                FALLBACK_COLORS[index % FALLBACK_COLORS.length]
                            }
                        />
                    ))}
                </Pie>
                <Tooltip
                    formatter={(value) => {
                        const num = typeof value === "number" ? value : 0;
                        return [`${((num / total) * 100).toFixed(1)}%`];
                    }}
                />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}