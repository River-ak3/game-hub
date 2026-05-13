import Link from "next/link";
import type { GuideFrontmatter } from "@/types/content";

interface GuideCardProps {
  gameSlug: string;
  guide: {
    slug: string;
    frontmatter: GuideFrontmatter;
  };
  index: number;
}

const difficultyConfig = {
  beginner: { label: "入门", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  intermediate: { label: "进阶", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  advanced: { label: "高级", color: "bg-red-500/20 text-red-400 border-red-500/30" },
};

export function GuideCard({ gameSlug, guide, index }: GuideCardProps) {
  const { slug, frontmatter } = guide;
  const difficulty = frontmatter.difficulty
    ? difficultyConfig[frontmatter.difficulty]
    : null;

  return (
    <Link
      href={`/games/${gameSlug}/${slug}`}
      className="block animate-fade-in"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="group rounded-xl bg-surface border border-border p-5 card-glow">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base font-semibold text-text-primary group-hover:text-primary transition-colors line-clamp-1">
            {frontmatter.title}
          </h3>
          {difficulty && (
            <span
              className={`shrink-0 inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${difficulty.color}`}
            >
              {difficulty.label}
            </span>
          )}
        </div>

        <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 mb-4">
          {frontmatter.description}
        </p>

        <div className="flex items-center gap-3 text-xs text-text-muted">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-lighter">
            {frontmatter.category}
          </span>
          <span>
            {new Date(frontmatter.updatedAt).toLocaleDateString("zh-CN")}
          </span>
        </div>
      </div>
    </Link>
  );
}
