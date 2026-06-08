"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Search, BookOpen, Newspaper,
  HelpCircle, Code2, ArrowRight, Star, GitFork,
  GitBranch,
} from "lucide-react";
import { useSearchRepositoriesQuery } from "@/redux/api/githubApi";
import { useGetArticlesQuery } from "@/redux/api/devtoApi";
import { useGetTopStoryIdsQuery, useGetStoryQuery } from "@/redux/api/hackerNewsApi";
import Image from "next/image";
import { Repository } from "@/types/github";
import { Article } from "@/types/devto";

// --- Mini components ---

function TrendingRepoCard({ repo }: { repo: Repository }) {
  return (
    <Link href={`/repositories/${repo.owner.login}/${repo.name}`}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
      <Image src={repo.owner.avatar_url} alt={repo.owner.login} width={36} height={36} className="rounded-full shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {repo.name}
        </p>
        <p className="text-xs text-gray-500 truncate">{repo.description ?? repo.owner.login}</p>
      </div>
      <div className="flex items-center gap-1 text-xs text-yellow-500 shrink-0">
        <Star className="w-3 h-3 fill-current" />
        {repo.stargazers_count >= 1000 ? `${(repo.stargazers_count / 1000).toFixed(1)}k` : repo.stargazers_count}
      </div>
    </Link>
  );
}

function ArticleItem({ article }: { article: Article }) {
  return (
    <a href={article.url} target="_blank" rel="noopener noreferrer"
      className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
      <Image src={article.user.profile_image} alt={article.user.name} width={32} height={32} className="rounded-full shrink-0 mt-0.5" />
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {article.title}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">{article.user.name} · {article.reading_time_minutes}m read</p>
      </div>
    </a>
  );
}

function TopStoryItem({ id }: { id: number }) {
  const { data: story } = useGetStoryQuery(id);
  if (!story || !story.title) return null;
  return (
    <a href={story.url ?? `https://news.ycombinator.com/item?id=${story.id}`}
      target="_blank" rel="noopener noreferrer"
      className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-500 shrink-0 text-xs font-bold">
        {story.score}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-orange-500">
          {story.title}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">by {story.by}</p>
      </div>
    </a>
  );
}

// --- Explore cards ---
const EXPLORE_CARDS = [
  { href: "/repositories", icon: GitBranch, label: "Repositories", desc: "Search GitHub repos", color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" },
  { href: "/developers", icon: Code2, label: "Developers", desc: "Discover GitHub users", color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400" },
  { href: "/articles", icon: BookOpen, label: "Articles", desc: "Read dev articles", color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400" },
  { href: "/news", icon: Newspaper, label: "Tech News", desc: "Hacker News stories", color: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400" },
  { href: "/questions", icon: HelpCircle, label: "Q&A", desc: "Stack Overflow questions", color: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400" },
];

// --- Main Page ---
export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/repositories?q=${encodeURIComponent(query)}`);
  };

  const { data: trendingData } = useSearchRepositoriesQuery("stars:>10000&sort=stars");
  const { data: articles } = useGetArticlesQuery({ per_page: 5 });
  const { data: topIds } = useGetTopStoryIdsQuery();

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30
                                text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
          <GitBranch className="w-4 h-4" />
          Developer Intelligence Platform
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          Explore the World of
          <span className="text-blue-600 dark:text-blue-400"> Open Source</span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-8">
          Discover repositories, developers, articles, tech news and Q&A — all in one place.
        </p>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search repositories..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700
                                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                                       placeholder:text-gray-400 focus:outline-none focus:ring-2
                                       focus:ring-blue-500 transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Explore Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-14">
        {EXPLORE_CARDS.map(({ href, icon: Icon, label, desc, color }) => (
          <Link key={href} href={href}
            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 dark:border-gray-700
                                   bg-white dark:bg-gray-800 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600
                                   transition-all text-center group">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{label}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
          </Link>
        ))}
      </div>

      {/* 3 Column Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trending Repos */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" /> Trending Repos
            </h2>
            <Link href="/repositories" className="text-xs text-blue-500 hover:underline flex items-center gap-1">
              See all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-1">
            {trendingData?.items.slice(0, 6).map((repo) => (
              <TrendingRepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        </div>

        {/* Latest Articles */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-green-500" /> Latest Articles
            </h2>
            <Link href="/articles" className="text-xs text-blue-500 hover:underline flex items-center gap-1">
              See all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-1">
            {articles?.slice(0, 5).map((article) => (
              <ArticleItem key={article.id} article={article} />
            ))}
          </div>
        </div>

        {/* Tech News */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-orange-500" /> Tech News
            </h2>
            <Link href="/news" className="text-xs text-blue-500 hover:underline flex items-center gap-1">
              See all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-1">
            {topIds?.slice(0, 5).map((id) => (
              <TopStoryItem key={id} id={id} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}