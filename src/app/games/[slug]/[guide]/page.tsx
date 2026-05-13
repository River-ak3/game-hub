import { Metadata } from "next";
import { getGames, getGameMeta, getGuide, getGuidesByGame } from "@/lib/mdx";
import { notFound } from "next/navigation";
import MDXRenderer from "@/components/content/MDXRenderer";
import { Breadcrumb } from "@/components/guide/Breadcrumb";

interface PageProps {
  params: Promise<{ slug: string; guide: string }>;
}

export async function generateStaticParams() {
  const games = getGames();
  return games.flatMap((gameSlug) => {
    const guides = getGuidesByGame(gameSlug);
    return guides.map((g) => ({
      slug: gameSlug,
      guide: g.slug,
    }));
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, guide: guideSlug } = await params;
  const guide = getGuide(slug, guideSlug);
  if (!guide) return { title: "攻略未找到" };

  const seoTitle = guide.frontmatter.seo?.title || guide.frontmatter.title;
  const seoDesc = guide.frontmatter.seo?.description || guide.frontmatter.description;

  return {
    title: seoTitle,
    description: seoDesc,
    keywords: guide.frontmatter.seo?.keywords,
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      type: "article",
      publishedTime: guide.frontmatter.createdAt,
      modifiedTime: guide.frontmatter.updatedAt,
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug, guide: guideSlug } = await params;
  const meta = getGameMeta(slug);
  const guide = getGuide(slug, guideSlug);
  if (!guide || !meta) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb
        items={[
          { label: "全部游戏", href: "/games" },
          { label: meta.title, href: `/games/${slug}` },
          { label: guide.frontmatter.title },
        ]}
      />

      <article className="max-w-4xl mx-auto">
        {/* Guide Header */}
        <header className="mb-8 animate-fade-in">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
              {guide.frontmatter.category}
            </span>
            {guide.frontmatter.difficulty && (
              <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-surface-lighter text-text-secondary border border-border">
                {guide.frontmatter.difficulty === "beginner"
                  ? "入门"
                  : guide.frontmatter.difficulty === "intermediate"
                  ? "进阶"
                  : "高级"}
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            {guide.frontmatter.title}
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            {guide.frontmatter.description}
          </p>
          <div className="flex items-center gap-4 mt-4 text-sm text-text-muted">
            <span>更新于 {guide.frontmatter.updatedAt}</span>
            <span>·</span>
            <span>{meta.title}</span>
          </div>
          <hr className="mt-6 border-border" />
        </header>

        {/* Guide Content */}
        <div className="animate-fade-in animation-delay-100">
          <MDXRenderer source={guide.content} />
        </div>

        {/* Tags */}
        {guide.frontmatter.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {guide.frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg text-xs text-text-muted bg-surface border border-border"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
