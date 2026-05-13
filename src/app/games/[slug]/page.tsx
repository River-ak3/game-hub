import { notFound } from "next/navigation";
import { getGameMeta, getGuidesByGame, getGames } from "@/lib/mdx";
import { GuideCard } from "@/components/game/GuideCard";
import { Breadcrumb } from "@/components/guide/Breadcrumb";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getGames().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameMeta(slug);
  if (!game) return {};
  return {
    title: `${game.title} 攻略 - GameHub`,
    description: game.description || `${game.title}游戏攻略大全`,
  };
}

export default async function GamePage({ params }: PageProps) {
  const { slug } = await params;
  const game = getGameMeta(slug);
  if (!game) notFound();

  const guides = getGuidesByGame(slug);

  const genreColors: Record<string, string> = {
    RPG: "from-amber-500 to-orange-600",
    MOBA: "from-red-500 to-rose-600",
    沙盒: "from-green-500 to-emerald-600",
    动作: "from-orange-500 to-red-600",
    冒险: "from-cyan-500 to-teal-600",
  };
  const gradientClass = genreColors[game.genre || ""] || "from-primary to-accent";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <Breadcrumb
        items={[
          { label: "首页", href: "/" },
          { label: game.title },
        ]}
      />

      {/* Game Header */}
      <div className="mt-4 sm:mt-6 rounded-2xl bg-surface border border-border overflow-hidden">
        <div className={`h-32 sm:h-48 bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
          <span className="text-5xl sm:text-7xl drop-shadow-lg select-none">🎮</span>
        </div>
        <div className="p-4 sm:p-6 lg:p-8 -mt-6 sm:-mt-8 relative">
          <div className="flex flex-wrap gap-2 mb-3">
            {game.genre && (
              <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                {game.genre}
              </span>
            )}
            {game.tags?.slice(0, 4).map((tag: string) => (
              <span key={tag} className="inline-flex px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-surface-lighter text-text-muted">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-primary">
            {game.title}
          </h1>
          {game.description && (
            <p className="mt-2 text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl">
              {game.description}
            </p>
          )}
        </div>
      </div>

      {/* Guides List */}
      <div className="mt-6 sm:mt-8">
        <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-4">
          攻略列表
          <span className="ml-2 text-sm font-normal text-text-muted">
            ({guides.length} 篇)
          </span>
        </h2>
        {guides.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-muted">暂无攻略，敬请期待</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {guides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} gameSlug={slug} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
