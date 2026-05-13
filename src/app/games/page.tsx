import Link from "next/link";
import { getAllGameSlugs, getGameMeta } from "@/lib/mdx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "全部游戏 - GameHub",
  description: "浏览所有游戏攻略，找到你需要的指南",
};

export default function GamesPage() {
  const gameSlugs = getAllGameSlugs();
  const games = gameSlugs.map((slug) => ({
    slug,
    ...getGameMeta(slug),
  }));

  const genreColors: Record<string, string> = {
    RPG: "from-amber-500 to-orange-600",
    MOBA: "from-red-500 to-rose-600",
    沙盒: "from-green-500 to-emerald-600",
    动作: "from-orange-500 to-red-600",
    冒险: "from-cyan-500 to-teal-600",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-text-primary">
          全部游戏
        </h1>
        <p className="text-sm sm:text-base text-text-secondary mt-1">
          选择游戏，查看攻略
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {games.map((game) => {
          const gradientClass = genreColors[game.genre || ""] || "from-primary to-accent";
          const platformText = game.platforms?.join(" · ") || "";

          return (
            <Link
              key={game.slug}
              href={`/games/${game.slug}`}
              className="group block min-h-[44px]"
            >
              <div className="rounded-2xl bg-surface border border-border overflow-hidden card-glow h-full">
                <div className={`h-32 sm:h-40 bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
                  <span className="text-4xl sm:text-5xl drop-shadow-lg select-none">
                    {game.icon || "🎮"}
                  </span>
                  {game.genre && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-black/40 text-white backdrop-blur-sm">
                      {game.genre}
                    </span>
                  )}
                </div>
                <div className="p-4 sm:p-5">
                  <h2 className="text-base sm:text-lg font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-1 mb-1.5">
                    {game.title}
                  </h2>
                  {game.description && (
                    <p className="text-xs sm:text-sm text-text-secondary line-clamp-2 mb-2">
                      {game.description}
                    </p>
                  )}
                  {platformText && (
                    <p className="text-[11px] sm:text-xs text-text-muted">{platformText}</p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {games.length === 0 && (
        <div className="text-center py-16">
          <p className="text-text-muted">暂无游戏数据</p>
        </div>
      )}
    </div>
  );
}
