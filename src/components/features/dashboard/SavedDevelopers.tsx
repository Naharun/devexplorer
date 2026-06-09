"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { removeDeveloper } from "@/redux/slices/favoritesSlice";

export default function SavedDevelopers() {
    const dispatch = useAppDispatch();
    const developers = useAppSelector((state) => state.favorites.developers);

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
                Saved Developers ({developers.length})
            </h2>

            {developers.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p className="text-sm">No saved developers yet.</p>
                    <Link href="/developers" className="text-blue-500 text-sm hover:underline mt-1 inline-block">
                        Browse developers →
                    </Link>
                </div>
            ) : (
                <div className="space-y-3">
                    {developers.slice(0, 5).map((dev) => (
                        <div key={dev.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <Image src={dev.avatar_url} alt={dev.login} width={36} height={36} className="rounded-full shrink-0" />
                            <div className="flex-1 min-w-0">
                                <Link href={`/developers/${dev.login}`}
                                    className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 truncate block">
                                    {dev.login}
                                </Link>
                                <span className="text-xs text-gray-400 capitalize">{dev.type}</span>
                            </div>
                            <button onClick={() => dispatch(removeDeveloper(dev.id))}
                                className="text-gray-400 hover:text-red-500 transition-colors p-1 shrink-0">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}