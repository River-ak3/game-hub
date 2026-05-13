import Link from "next/link";
import type { GameMeta } from "@/types/content";

interface GameCardProps {
  game: GameMeta;
  guideCount: number;
  index: number;
}

const genreColors: Record<string, string> = {
  "动作RPG": "bg-red-500/20 text-red-400 border-red-500/30",
  "开放世界": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "冒险": "bg-green-500/20 text-green-400 border-green-500/30",
  "动作": "bg-orange-500/20 text-orange-400 border-orange-500/30",
};

export function GameCard({ game, guideCount, index }: GameCardProps) {
  const genreColor =
    genreColors[game.genre] || "bg-purple-500/20 text-purple-400 border-purple-500/30";

  return (
    <Link href={`/games/${game.slug}`} className="block animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="group relative rounded-2xl bg-surface border border-border overflow-hidden card-glow">
        {/* Cover image placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-surface-light to-surface-lighter overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity">
              🎮
            </span>
          </div>
          {/* Genre badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${genreColor}`}
            >
              {game.genre}
            </span>
          </div>
          {/* Guide count */}
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-black/40 backdrop-blur-sm text-white">
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {guideCount} 篇攻略
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors mb-2">
            {game.title}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 mb-4">
            {game.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {game.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-xs text-text-muted bg-surface-lighter"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
