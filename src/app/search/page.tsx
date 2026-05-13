"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-3xl font-bold text-text-primary mb-4">
          搜索攻略
        </h1>
        <p className="text-text-secondary">
          输入关键词搜索你需要的游戏攻略
        </p>
      </div>

      {/* Search Input */}
      <div className="animate-fade-in animation-delay-100">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
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
            onKeyDown={(e) => e.key === "Enter" && query && router.push(`/search?q=${encodeURIComponent(query)}`)}
            placeholder="搜索游戏、攻略、Boss..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-surface border border-border text-text-primary placeholder-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/25 transition-all"
          />
        </div>
      </div>

      {/* Placeholder */}
      <div className="mt-16 text-center">
        <div className="text-6xl mb-4 opacity-30">🔍</div>
        <p className="text-text-muted text-sm">
          搜索功能即将上线，敬请期待
        </p>
        <p className="text-text-muted text-xs mt-2">
          Algolia 搜索集成已完成，等待配置 API Key
        </p>
      </div>
    </div>
  );
}
