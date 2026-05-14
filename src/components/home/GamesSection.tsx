"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Game {
  slug: string;
  title?: string;
  genre?: string;
  description?: string;
  tags?: string[];
  releaseDate?: string;
}

const CATEGORIES = ["全部", "动作", "冒险", "RPG", "开放世界", "沙盒", "竞速", "MOBA"];

const genreColors: Record<string, string> = {
  RPG: "from-amber-500 to-orange-600",
  MOBA: "from-red-500 to-rose-600",
  沙盒: "from-green-500 to-emerald-600",
  动作: "from-orange-500 to-red-600",
  冒险: "from-cyan-500 to-teal-600",
};

interface GamesSectionProps {
  games: Game[];
}

export function GamesSection({ games }: GamesSectionProps) {
  const [activeCategory, setActiveCategory] = useState("全部");
  const restoredRef = useRef(false);

  // Restore scroll position from sessionStorage
  useEffect(() => {
    const savedId = sessionStorage.getItem("scroll_restore_id");
    if (savedId) {
      sessionStorage.removeItem("scroll_restore_id");
      // Small delay to let the DOM render
      requestAnimationFrame(() => {
        const el = document.getElementById(savedId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          restoredRef.current = true;
        }
      });
    }
  }, []);

  const filtered =
    activeCategory === "全部"
      ? games
      : games.filter((g) => g.genre === activeCategory);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Category Filter */}
      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-3">
          热门游戏
        </h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`category-btn ${activeCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-text-muted">该分类暂无游戏</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filtered.map((game) => {
            const gradientClass = genreColors[game.genre || ""] || "from-primary to-accent";
            return (
              <Link
                key={game.slug}
                href={`/games/${game.slug}`}
                className="group block min-h-[44px]"
              >
                <div className="rounded-2xl bg-surface border border-border overflow-hidden card-glow h-full">
                  <div className={`relative h-32 sm:h-40 bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
                    <span className="text-4xl sm:text-5xl drop-shadow-lg select-none">🎮</span>
                    {game.genre && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-black/40 text-white backdrop-blur-sm">
                        {game.genre}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm sm:text-base font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-1 mb-1">
                      {game.title || game.slug}
                    </h3>
                    {game.description && (
                      <p className="text-xs sm:text-sm text-text-secondary line-clamp-2">
                        {game.description}
                      </p>
                    )}
                    {game.tags && game.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {game.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-surface-lighter text-text-muted">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
