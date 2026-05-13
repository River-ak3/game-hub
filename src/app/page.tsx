import { getGames, getGameMeta, getGuidesByGame } from "@/lib/mdx";
import { Hero } from "@/components/home/Hero";
import { GameCard } from "@/components/home/GameCard";

export default function HomePage() {
  const games = getGames();
  const gamesWithMeta = games.map((slug) => {
    const meta = getGameMeta(slug);
    const guides = getGuidesByGame(slug);
    return { meta, guideCount: guides.length };
  }).filter((g) => g.meta !== null);

  return (
    <div>
      <Hero />

      {/* Games Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">热门游戏</h2>
            <p className="text-sm text-text-secondary mt-1">
              共 {gamesWithMeta.length} 款游戏，{gamesWithMeta.reduce((sum, g) => sum + g.guideCount, 0)} 篇攻略
            </p>
          </div>
        </div>

        {gamesWithMeta.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gamesWithMeta.map((game, index) => (
              <GameCard
                key={game.meta!.slug}
                game={game.meta!}
                guideCount={game.guideCount}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-text-muted">暂无游戏内容，敬请期待...</p>
          </div>
        )}
      </section>
    </div>
  );
}
