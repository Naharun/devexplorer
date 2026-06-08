"use client";

import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { day: "Mon", value: 2 },
    { day: "Tue", value: 4 },
    { day: "Wed", value: 3 },
    { day: "Thu", value: 7 },
    { day: "Fri", value: 5 },
    { day: "Sat", value: 8 },
    { day: "Sun", value: 6 },
];

export default function ActivityChart() {
    return (
        <div className="border rounded-xl p-6">
            <h2 className="font-semibold mb-4">
                Weekly Activity
            </h2>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <XAxis dataKey="day" />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="value"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}