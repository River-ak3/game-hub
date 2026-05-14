"use client";

import Link from "next/link";
import { useState } from "react";

const HOT_TAGS = [
  { label: "黑神话悟空", slug: "heiwushiwukong" },
  { label: "GTA6", slug: "gta6" },
  { label: "地平线6", slug: "dixian6" },
  { label: "艾尔登法环", slug: "aierdengfahuan" },
  { label: "原神", slug: "yuanshen" },
];

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/8 to-surface" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 sm:w-72 h-32 sm:h-72 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-32 sm:w-72 h-32 sm:h-72 bg-accent/15 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium mb-5 sm:mb-6 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          攻略持续更新中
        </div>

        {/* Two-column layout: title left, search right */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
          {/* Left: Title + CTAs */}
          <div className="flex-1 min-w-0 animate-fade-in">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-text-primary leading-tight">
              你的游戏攻略
              <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                终极指南
              </span>
            </h1>

            {/* CTA buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/games"
                className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors"
              >
                浏览全部游戏
                <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-xl bg-surface border border-border text-text-primary text-sm font-medium hover:bg-surface-lighter transition-colors"
              >
                搜索攻略
              </Link>
            </div>
          </div>

          {/* Right: Search + Hot Tags + Category Button */}
          <div className="w-full lg:w-80 shrink-0 animate-fade-in animation-delay-100">
            {/* Search Box */}
            <form onSubmit={handleSearch} className="relative mb-4">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted"
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索游戏、攻略..."
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-surface border border-border text-text-primary placeholder-text-muted focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all text-sm shadow-sm"
              />
            </form>

            {/* Hot Tags */}
            <div className="mb-3">
              <p className="text-[11px] text-text-muted mb-2 font-medium">热门标签</p>
              <div className="flex flex-wrap gap-2">
                {HOT_TAGS.map((tag) => (
                  <Link
                    key={tag.slug}
                    href={`/games/${tag.slug}`}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-surface border border-border text-text-secondary hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    {tag.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Browse All Categories Button */}
            <Link
              href="/games"
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary-light transition-colors font-medium"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              浏览所有分类
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
