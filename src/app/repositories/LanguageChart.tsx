"use client";

import {
    PieChart,
    Pie,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface Props {
    languages: Record<
        string,
        number
    >;
}

export default function LanguageChart({
    languages,
}: Props) {
    const data = Object.entries(
        languages
    ).map(([name, value]) => ({
        name,
        value,
    }));

    return (
        <ResponsiveContainer
            width="100%"
            height={300}
        >
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                />

                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
}