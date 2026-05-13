import Link from "next/link";
import type { GuideContent } from "@/types/content";

interface GuideCardProps {
  guide: GuideContent;
  gameSlug: string;
}

const difficultyMap: Record<string, { label: string; color: string }> = {
  beginner: { label: "入门", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  intermediate: { label: "进阶", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  advanced: { label: "高级", color: "bg-red-500/20 text-red-400 border-red-500/30" },
};

export function GuideCard({ guide, gameSlug }: GuideCardProps) {
  const fm = guide.frontmatter;
  const diff = fm.difficulty ? difficultyMap[fm.difficulty] : null;

  return (
    <Link
      href={`/games/${gameSlug}/${guide.slug}`}
      className="group block min-h-[44px]"
    >
      <div className="rounded-xl bg-surface border border-border p-4 sm:p-5 card-glow h-full">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <h3 className="text-sm sm:text-base font-semibold text-text-primary group-hover:text-primary transition-colors line-clamp-1 flex-1">
            {fm.title}
          </h3>
          {diff && (
            <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium border shrink-0 ${diff.color}`}>
              {diff.label}
            </span>
          )}
        </div>

        {fm.description && (
          <p className="text-xs sm:text-sm text-text-secondary line-clamp-2 mb-3">
            {fm.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-text-muted">
          {fm.category && (
            <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary font-medium">
              {fm.category}
            </span>
          )}
          {fm.updatedAt && <span>{fm.updatedAt}</span>}
        </div>

        {fm.tags && fm.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {fm.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-surface-lighter text-text-muted">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
