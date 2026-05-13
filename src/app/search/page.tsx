"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

interface SearchResult {
  slug: string;
  gameSlug: string;
  title: string;
  description: string;
  category: string;
  difficulty?: string;
  gameTitle: string;
  tags: string[];
}

const difficultyMap: Record<string, { label: string; color: string }> = {
  beginner: { label: "入门", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  intermediate: { label: "进阶", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  advanced: { label: "高级", color: "bg-red-500/20 text-red-400 border-red-500/30" },
};

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialQuery) {
      doSearch(initialQuery);
    }
  }, [initialQuery, doSearch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      doSearch(query);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
      <div className="text-center mb-8 sm:mb-12 animate-fade-in">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3 sm:mb-4">
          搜索攻略
        </h1>
        <p className="text-sm sm:text-base text-text-secondary">
          输入关键词搜索你需要的游戏攻略
        </p>
      </div>

      {/* Search Input */}
      <div className="animate-fade-in animation-delay-100 mb-8">
        <div className="relative">
          <svg
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="搜索游戏、攻略、Boss..."
            className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-surface border border-border text-text-primary placeholder-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/25 transition-all text-sm sm:text-base"
          />
          <button
            onClick={() => doSearch(query)}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-primary text-white text-xs sm:text-sm font-medium hover:bg-primary-light transition-colors"
          >
            搜索
          </button>
        </div>
      </div>

      {/* Results */}
      {loading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-surface border border-border p-5 space-y-3 animate-pulse">
              <div className="h-5 w-3/4 bg-surface-lighter rounded" />
              <div className="h-4 w-full bg-surface-lighter rounded" />
              <div className="h-4 w-1/2 bg-surface-lighter rounded" />
            </div>
          ))}
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-text-secondary mb-1">
            未找到 &ldquo;{query}&rdquo; 相关攻略
          </p>
          <p className="text-sm text-text-muted">试试其他关键词</p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-text-muted mb-4">
            找到 {results.length} 篇相关攻略
          </p>
          {results.map((result, index) => {
            const diff = result.difficulty ? difficultyMap[result.difficulty] : null;
            return (
              <Link
                key={`${result.gameSlug}-${result.slug}`}
                href={`/games/${result.gameSlug}/${result.slug}`}
                className="block animate-fade-in"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="group rounded-xl bg-surface border border-border p-4 sm:p-5 card-glow">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs text-accent font-medium">
                      {result.gameTitle}
                    </span>
                    <span className="text-text-muted text-xs">·</span>
                    <span className="text-xs text-text-muted">
                      {result.category}
                    </span>
                    {diff && (
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border ${diff.color}`}>
                        {diff.label}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-text-primary group-hover:text-primary transition-colors mb-1.5 line-clamp-1">
                    {result.title}
                  </h3>
                  <p className="text-sm text-text-secondary line-clamp-2">
                    {result.description}
                  </p>
                  {result.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {result.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-surface-lighter text-text-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Initial state */}
      {!searched && (
        <div className="text-center py-8">
          <p className="text-text-muted text-sm">
            支持搜索游戏名称、攻略标题、分类、标签等
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
