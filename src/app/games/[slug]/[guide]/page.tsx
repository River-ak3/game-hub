import { notFound } from "next/navigation";
import { getGuide, getAllGuides, getGameMeta } from "@/lib/mdx";
import MDXRenderer from "@/components/content/MDXRenderer";
import { Breadcrumb } from "@/components/guide/Breadcrumb";
import { AdSlot } from "@/components/ads/AdSlot";
import type { Metadata } from "next";

const SITE_URL = "https://game-hub-eta-rose.vercel.app";

interface PageProps {
  params: Promise<{ slug: string; guide: string }>;
}

export async function generateStaticParams() {
  return getAllGuides().map((g) => ({
    slug: g.frontmatter.game,
    guide: g.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, guide } = await params;
  const data = getGuide(slug, guide);
  if (!data) return {};
  const game = getGameMeta(slug);
  const fm = data.frontmatter;
  const title = fm.seo?.title || `${fm.title} - ${game?.title || slug} 攻略`;
  const desc = fm.seo?.description || fm.description;
  const url = `${SITE_URL}/games/${slug}/${guide}`;

  return {
    title,
    description: desc,
    keywords: fm.seo?.keywords || fm.tags,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: desc,
      url,
      type: "article",
      publishedTime: fm.updatedAt,
      modifiedTime: fm.updatedAt,
      tags: fm.tags,
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

const difficultyMap: Record<string, { label: string; color: string }> = {
  beginner: { label: "入门", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  intermediate: { label: "进阶", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  advanced: { label: "高级", color: "bg-red-500/20 text-red-400 border-red-500/30" },
};

export default async function GuidePage({ params }: PageProps) {
  const { slug, guide } = await params;
  const data = getGuide(slug, guide);
  if (!data) notFound();

  const game = getGameMeta(slug);
  const fm = data.frontmatter;
  const diff = fm.difficulty ? difficultyMap[fm.difficulty] : null;

  // JSON-LD for article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fm.title,
    description: fm.description,
    url: `${SITE_URL}/games/${slug}/${guide}`,
    datePublished: fm.createdAt,
    dateModified: fm.updatedAt,
    author: {
      "@type": "Organization",
      name: "GameHub",
    },
    publisher: {
      "@type": "Organization",
      name: "GameHub",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/games/${slug}/${guide}`,
    },
    about: {
      "@type": "VideoGame",
      name: game?.title || slug,
    },
    keywords: fm.tags?.join(", "),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb
        items={[
          { label: "首页", href: "/" },
          { label: game?.title || slug, href: `/games/${slug}` },
          { label: fm.title },
        ]}
      />

      <div className="mt-4 sm:mt-6 flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Main Content */}
        <article className="flex-1 min-w-0">
          <header className="mb-6 sm:mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                {fm.category}
              </span>
              {diff && (
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${diff.color}`}>
                  {diff.label}
                </span>
              )}
              {fm.tags?.map((tag: string) => (
                <span key={tag} className="inline-flex px-2 py-0.5 rounded-full text-[10px] bg-surface-lighter text-text-muted">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-primary leading-tight">
              {fm.title}
            </h1>
            {fm.description && (
              <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
                {fm.description}
              </p>
            )}
            <div className="flex items-center gap-4 mt-4 text-xs text-text-muted">
              {fm.updatedAt && <time>更新: {fm.updatedAt}</time>}
              {fm.createdAt && <time>创建: {fm.createdAt}</time>}
            </div>
            <hr className="border-border mt-6" />
          </header>

          <AdSlot slot="in-article" className="mb-6" />

          <MDXRenderer source={data.content} />

          <div className="mt-8">
            <AdSlot slot="footer-banner" />
          </div>
        </article>

        {/* Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="toc-sticky space-y-3">
            {/* Back to games */}
            <a
              href={`/games/${slug}`}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors mb-2"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回{game?.title || slug}攻略列表
            </a>
            {/* TOC Placeholder */}
            <div className="rounded-xl bg-surface border border-border p-4">
              <h3 className="text-xs font-semibold text-text-primary mb-2">目录</h3>
              <p className="text-[11px] text-text-muted leading-relaxed">根据标题自动生成</p>
            </div>
            <AdSlot slot="sidebar" />
          </div>
        </aside>
      </div>
    </div>
  );
}
