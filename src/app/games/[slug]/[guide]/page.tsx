import { notFound } from "next/navigation";
import { getGuide, getAllGuides, getGameMeta } from "@/lib/mdx";
import MDXRenderer from "@/components/content/MDXRenderer";
import { Breadcrumb } from "@/components/guide/Breadcrumb";
import { AdSlot } from "@/components/ads/AdSlot";
import type { Metadata } from "next";

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

  return {
    title,
    description: desc,
    keywords: fm.seo?.keywords || fm.tags,
    openGraph: {
      title,
      description: desc,
      type: "article",
      publishedTime: fm.updatedAt,
      tags: fm.tags,
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
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

          {/* In-article Ad (after header, before content) */}
          <AdSlot slot="in-article" className="mb-6" />

          {/* MDX Content */}
          <MDXRenderer source={data.content} />

          {/* Footer Ad */}
          <div className="mt-8">
            <AdSlot slot="footer-banner" />
          </div>
        </article>

        {/* Sidebar - Hidden on mobile, visible on lg+ */}
        <aside className="hidden lg:block w-80 shrink-0">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-xl bg-surface border border-border p-5">
              <h3 className="text-sm font-semibold text-text-primary mb-3">目录</h3>
              <p className="text-xs text-text-muted">自动根据标题生成</p>
            </div>
            <AdSlot slot="sidebar" />
          </div>
        </aside>
      </div>
    </div>
  );
}
