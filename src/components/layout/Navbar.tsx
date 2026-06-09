"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
    BookOpen, Newspaper, HelpCircle,
    LayoutDashboard, Bookmark, Menu, X, Code2,
    LogOut, User, FolderOpen, GitBranch,
} from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import Image from "next/image";
import ThemeToggle from "@/components/layout/ThemeToggle";

const NAV_LINKS = [
    { href: "/repositories", label: "Repositories", icon: GitBranch },
    { href: "/developers", label: "Developers", icon: Code2 },
    { href: "/articles", label: "Articles", icon: BookOpen },
    { href: "/news", label: "News", icon: Newspaper },
    { href: "/questions", label: "Questions", icon: HelpCircle },
];

export default function Navbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { user } = useAppSelector((state) => state.auth);

    const handleSignOut = async () => {
        await signOut(auth);
        setUserMenuOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md
                        border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-lg text-gray-900 dark:text-white">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                        <Code2 className="w-4 h-4 text-white" />
                    </div>
                    DevExplorer
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                        <Link key={href} href={href}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all
                                ${pathname.startsWith(href)
                                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`}>
                            <Icon className="w-4 h-4" />
                            {label}
                        </Link>
                    ))}
                </div>

                {/* Right side */}
                <div className="flex items-center gap-1">
                    <ThemeToggle />

                    {user ? (
                        <>
                            <Link href="/dashboard"
                                className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all
                                    ${pathname === "/dashboard"
                                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}>
                                <LayoutDashboard className="w-4 h-4" />
                                Dashboard
                            </Link>
                            <Link href="/collections"
                                className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all
                                    ${pathname === "/collections"
                                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    }`}>
                                <FolderOpen className="w-4 h-4" />
                                Collections
                            </Link>

                            {/* User menu */}
                            <div className="relative">
                                <button onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center gap-2 p-1 rounded-full hover:ring-2 ring-blue-300 transition-all ml-1">
                                    {user.photoURL ? (
                                        <Image src={user.photoURL} alt={user.displayName ?? "User"}
                                            width={32} height={32} className="rounded-full" />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                                            {user.displayName?.[0] ?? user.email?.[0] ?? "U"}
                                        </div>
                                    )}
                                </button>

                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border
                                                    border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-1 z-50">
                                        <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                {user.displayName ?? "User"}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </div>
                                        <Link href="/dashboard" onClick={() => setUserMenuOpen(false)}
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <LayoutDashboard className="w-4 h-4" /> Dashboard
                                        </Link>
                                        <Link href="/favorites" onClick={() => setUserMenuOpen(false)}
                                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <Bookmark className="w-4 h-4" /> Favorites
                                        </Link>
                                        <button onClick={handleSignOut}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                                            <LogOut className="w-4 h-4" /> Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="hidden md:flex items-center gap-2 ml-1">
                            <Link href="/login"
                                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                Sign In
                            </Link>
                            <Link href="/signup"
                                className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                                Sign Up
                            </Link>
                        </div>
                    )}

                    {/* Mobile menu button */}
                    <button onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 space-y-1">
                    {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                        <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                                ${pathname.startsWith(href)
                                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`}>
                            <Icon className="w-4 h-4" />{label}
                        </Link>
                    ))}
                    {user ? (
                        <>
                            <Link href="/dashboard" onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                                <LayoutDashboard className="w-4 h-4" /> Dashboard
                            </Link>
                            <Link href="/favorites" onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                                <Bookmark className="w-4 h-4" /> Favorites
                            </Link>
                            <button onClick={handleSignOut}
                                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                                <LogOut className="w-4 h-4" /> Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                                <User className="w-4 h-4" /> Sign In
                            </Link>
                            <Link href="/signup" onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}