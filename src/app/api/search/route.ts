import { NextRequest, NextResponse } from "next/server";
import { getAllGuides, getGameMeta } from "@/lib/mdx";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q")?.toLowerCase().trim();

  if (!query) {
    return NextResponse.json({ results: [], total: 0 });
  }

  // Fallback: search against local content when Algolia is not configured
  const allGuides = getAllGuides();
  const results = allGuides
    .filter((guide) => {
      const meta = getGameMeta(guide.frontmatter.game);
      const searchableText = [
        guide.frontmatter.title,
        guide.frontmatter.description,
        guide.frontmatter.category,
        guide.frontmatter.game,
        meta?.title,
        ...(guide.frontmatter.tags || []),
        ...(guide.frontmatter.seo?.keywords || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    })
    .map((guide) => {
      const meta = getGameMeta(guide.frontmatter.game);
      return {
        slug: guide.slug,
        gameSlug: guide.frontmatter.game,
        title: guide.frontmatter.title,
        description: guide.frontmatter.description,
        category: guide.frontmatter.category,
        difficulty: guide.frontmatter.difficulty,
        gameTitle: meta?.title || guide.frontmatter.game,
        tags: guide.frontmatter.tags,
      };
    });

  return NextResponse.json({ results, total: results.length });
}
