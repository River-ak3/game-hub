import type { GameMeta } from "@/types/content";

interface GameHeaderProps {
  meta: GameMeta;
  guideCount: number;
}

const genreColors: Record<string, string> = {
  "动作RPG": "bg-red-500/20 text-red-400 border-red-500/30",
  "开放世界": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "冒险": "bg-green-500/20 text-green-400 border-green-500/30",
  "动作": "bg-orange-500/20 text-orange-400 border-orange-500/30",
};

export function GameHeader({ meta, guideCount }: GameHeaderProps) {
  const genreColor =
    genreColors[meta.genre] || "bg-purple-500/20 text-purple-400 border-purple-500/30";

  return (
    <div className="rounded-2xl bg-surface border border-border overflow-hidden animate-fade-in">
      <div className="relative h-40 sm:h-48 bg-gradient-to-br from-surface-light to-surface-lighter">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-7xl opacity-20">🎮</span>
        </div>
      </div>
      <div className="p-6 sm:p-8 -mt-12 relative">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${genreColor}`}>
            {meta.genre}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-surface-lighter text-text-secondary">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {guideCount} 篇攻略
          </span>
          <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-surface-lighter text-text-muted">
            {meta.releaseDate}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3">
          {meta.title}
        </h1>
        <p className="text-text-secondary leading-relaxed mb-4">
          {meta.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {meta.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg text-xs text-text-muted bg-surface-lighter border border-border"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
