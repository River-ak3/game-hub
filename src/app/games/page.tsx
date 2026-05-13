import { Metadata } from "next";
import { getGames, getGameMeta, getGuidesByGame } from "@/lib/mdx";
import Link from "next/link";

export const metadata: Metadata = {
  title: "全部游戏",
  description: "浏览所有游戏攻略，找到你需要的内容。",
};

export default function GamesListPage() {
  const games = getGames();
  const gamesWithMeta = games.map((slug) => {
    const meta = getGameMeta(slug);
    const guides = getGuidesByGame(slug);
    return { meta, guideCount: guides.length };
  }).filter((g) => g.meta !== null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">全部游戏</h1>
        <p className="text-text-secondary mt-2">
          共 {gamesWithMeta.length} 款游戏
        </p>
      </div>

      {gamesWithMeta.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gamesWithMeta.map((game, index) => (
            <Link
              key={game.meta!.slug}
              href={`/games/${game.meta!.slug}`}
              className="block animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="group rounded-xl bg-surface border border-border p-6 card-glow">
                <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary transition-colors mb-2">
                  {game.meta!.title}
                </h3>
                <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                  {game.meta!.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <span className="px-2 py-0.5 rounded-md bg-surface-lighter">
                    {game.meta!.genre}
                  </span>
                  <span>{game.guideCount} 篇攻略</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 rounded-2xl bg-surface border border-border">
          <p className="text-text-muted">暂无游戏内容</p>
        </div>
      )}
    </div>
  );
}
