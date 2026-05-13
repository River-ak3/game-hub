import Link from "next/link";

interface GameCardProps {
  game: {
    slug: string;
    title: string;
    description?: string;
    icon?: string;
    genre?: string;
    platforms?: string[];
  };
}

const genreColors: Record<string, string> = {
  RPG: "from-amber-500 to-orange-600",
  MOBA: "from-red-500 to-rose-600",
  沙盒: "from-green-500 to-emerald-600",
  动作: "from-orange-500 to-red-600",
  冒险: "from-cyan-500 to-teal-600",
};

export function GameCard({ game }: GameCardProps) {
  const gradientClass = genreColors[game.genre || ""] || "from-primary to-accent";
  const platformText = game.platforms?.join(" · ") || "";

  return (
    <Link
      href={`/games/${game.slug}`}
      className="group block min-h-[44px]" /* min-h ensures touch target */
    >
      <div className="rounded-2xl bg-surface border border-border overflow-hidden card-glow h-full">
        {/* Cover Gradient */}
        <div className={`relative h-36 sm:h-48 bg-gradient-to-br ${gradientClass} flex items-center justify-center overflow-hidden`}>
          <span className="text-5xl sm:text-6xl drop-shadow-lg select-none">
            {game.icon || "🎮"}
          </span>
          {/* Genre Badge */}
          {game.genre && (
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/40 text-white backdrop-blur-sm">
              {game.genre}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-1 mb-1.5">
            {game.title}
          </h3>
          {game.description && (
            <p className="text-xs sm:text-sm text-text-secondary line-clamp-2 mb-3">
              {game.description}
            </p>
          )}
          {platformText && (
            <p className="text-[11px] sm:text-xs text-text-muted">
              {platformText}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
