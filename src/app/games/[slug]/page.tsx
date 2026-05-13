import { Metadata } from "next";
import { getGames, getGameMeta, getGuidesByGame } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { GameHeader } from "./GameHeader";
import { GuideCard } from "@/components/game/GuideCard";
import { Breadcrumb } from "@/components/guide/Breadcrumb";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const games = getGames();
  return games.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = getGameMeta(slug);
  if (!meta) return { title: "游戏未找到" };

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
    },
  };
}

export default async function GamePage({ params }: PageProps) {
  const { slug } = await params;
  const meta = getGameMeta(slug);
  if (!meta) notFound();

  const guides = getGuidesByGame(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "全部游戏", href: "/games" },
          { label: meta.title },
        ]}
      />
      <GameHeader meta={meta} guideCount={guides.length} />

      <div className="mt-8">
        {guides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guides.map((guide, index) => (
              <GuideCard
                key={guide.slug}
                gameSlug={slug}
                guide={guide}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-2xl bg-surface border border-border">
            <p className="text-text-muted">暂无攻略，正在编写中...</p>
          </div>
        )}
      </div>
    </div>
  );
}
