import { NextResponse } from 'next/server';
import { getGames, getGameMeta, getGuidesByGame } from '@/lib/mdx';

export async function GET() {
  const gameSlugs = getGames();

  const games = gameSlugs.map((slug) => {
    const meta = getGameMeta(slug);
    const guides = getGuidesByGame(slug);

    return {
      slug,
      title: meta?.title || slug,
      cover: meta?.cover || '',
      description: meta?.description || '',
      genre: meta?.genre || '',
      releaseDate: meta?.releaseDate || '',
      tags: meta?.tags || [],
      guideCount: guides.length,
      guides: guides.map((g) => ({
        slug: g.slug,
        title: g.frontmatter.title,
        description: g.frontmatter.description,
        category: g.frontmatter.category,
        difficulty: g.frontmatter.difficulty,
        tags: g.frontmatter.tags || [],
        updatedAt: g.frontmatter.updatedAt,
      })),
    };
  });

  return NextResponse.json({
    games,
    total: games.length,
  });
}
