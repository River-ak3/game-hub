import Link from "next/link";
import { getGames, getGameMeta } from "@/lib/mdx";
import { Hero } from "@/components/home/Hero";
import { GameCard } from "@/components/home/GameCard";
import { AdSlot } from "@/components/ads/AdSlot";
import type { Metadata } from "next";

const SITE_URL = "https://game-hub-eta-rose.vercel.app";

export const metadata: Metadata = {
  title: "GameHub - 游戏攻略站",
  description: "高质量游戏攻略与指南，覆盖热门游戏的Boss攻略、隐藏任务、收集要素等完整内容。",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "GameHub - 游戏攻略站",
    description: "高质量游戏攻略与指南，覆盖热门游戏的Boss攻略、隐藏任务、收集要素等完整内容。",
    url: SITE_URL,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "GameHub - 游戏攻略站",
      },
    ],
  },
};

export default function HomePage() {
  const gameSlugs = getGames();
  const games = gameSlugs.map((slug) => ({
    slug,
    ...getGameMeta(slug),
  }));

  // JSON-LD structured data for homepage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GameHub",
    url: SITE_URL,
    description: "高质量游戏攻略与指南",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />

      {/* Header Banner Ad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <AdSlot slot="header-banner" />
      </section>

      {/* Games Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
            热门游戏
          </h2>
          <p className="text-sm sm:text-base text-text-secondary mt-1">
            选择你的游戏，开始探索攻略
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {games.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <h2 className="text-lg sm:text-xl font-bold text-text-primary mb-3">
            找不到你的游戏？
          </h2>
          <p className="text-sm text-text-secondary mb-6 max-w-md mx-auto">
            我们持续更新游戏攻略，如果你有想看的游戏，欢迎联系我们
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-light transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            搜索攻略
          </Link>
        </div>
      </section>
    </div>
  );
}
