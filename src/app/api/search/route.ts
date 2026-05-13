import { NextRequest, NextResponse } from 'next/server';
import { searchGuides } from '@/lib/algolia';
import { getAllGuides } from '@/lib/mdx';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const game = searchParams.get('game') || '';
  const category = searchParams.get('category') || '';
  const limit = parseInt(searchParams.get('limit') || '20', 10);

  // If no query, return all guides (filtered by game/category if specified)
  if (!query.trim()) {
    const allGuides = getAllGuides();
    let filtered = allGuides;

    if (game) {
      filtered = filtered.filter((g) => g.frontmatter.game === game);
    }
    if (category) {
      filtered = filtered.filter(
        (g) => g.frontmatter.category === category
      );
    }

    const results = filtered.slice(0, limit).map((guide) => ({
      objectID: `${guide.frontmatter.game}/${guide.slug}`,
      title: guide.frontmatter.title,
      description: guide.frontmatter.description,
      game: guide.frontmatter.game,
      category: guide.frontmatter.category,
      tags: guide.frontmatter.tags || [],
      difficulty: guide.frontmatter.difficulty,
      slug: guide.slug,
      updatedAt: guide.frontmatter.updatedAt,
    }));

    return NextResponse.json({
      hits: results,
      nbHits: results.length,
      page: 0,
      nbPages: 1,
      hitsPerPage: limit,
      query: '',
    });
  }

  // Use Algolia search if configured, otherwise fallback to local search
  try {
    const algoliaResults = await searchGuides(query);
    if (algoliaResults.length > 0) {
      let filtered = algoliaResults;
      if (game) {
        filtered = filtered.filter((r) => r.game === game);
      }
      if (category) {
        filtered = filtered.filter((r) => r.category === category);
      }
      return NextResponse.json({
        hits: filtered.slice(0, limit),
        nbHits: filtered.length,
        page: 0,
        nbPages: 1,
        hitsPerPage: limit,
        query,
      });
    }
  } catch {
    // Algolia not configured or failed, fallback to local
  }

  // Local fallback: search in all guides
  const allGuides = getAllGuides();
  const lowerQuery = query.toLowerCase();
  const localResults = allGuides.filter((guide) => {
    const matchTitle = guide.frontmatter.title.toLowerCase().includes(lowerQuery);
    const matchDesc = guide.frontmatter.description.toLowerCase().includes(lowerQuery);
    const matchTags = (guide.frontmatter.tags || []).some((t) =>
      t.toLowerCase().includes(lowerQuery)
    );
    const matchGame = guide.frontmatter.game.toLowerCase().includes(lowerQuery);
    return matchTitle || matchDesc || matchTags || matchGame;
  });

  let filtered = localResults;
  if (game) {
    filtered = filtered.filter((g) => g.frontmatter.game === game);
  }
  if (category) {
    filtered = filtered.filter((g) => g.frontmatter.category === category);
  }

  const results = filtered.slice(0, limit).map((guide) => ({
    objectID: `${guide.frontmatter.game}/${guide.slug}`,
    title: guide.frontmatter.title,
    description: guide.frontmatter.description,
    game: guide.frontmatter.game,
    category: guide.frontmatter.category,
    tags: guide.frontmatter.tags || [],
    difficulty: guide.frontmatter.difficulty,
    slug: guide.slug,
    updatedAt: guide.frontmatter.updatedAt,
  }));

  return NextResponse.json({
    hits: results,
    nbHits: results.length,
    page: 0,
    nbPages: 1,
    hitsPerPage: limit,
    query,
  });
}
