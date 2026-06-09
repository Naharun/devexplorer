"use client";

import { useAppSelector } from "@/redux/hooks";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function ActivityChart() {
    const repos = useAppSelector((state) => state.favorites.repositories.length);
    const devs = useAppSelector((state) => state.favorites.developers.length);
    const articles = useAppSelector((state) => state.favorites.articles.length);
    const collections = useAppSelector((state) => state.collections.collections.length);

    const data = [
        { label: "Repos", value: repos },
        { label: "Developers", value: devs },
        { label: "Articles", value: articles },
        { label: "Collections", value: collections },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-6">Saved Resources Overview</h2>
            <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6", r: 5 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}