import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { GuideContent, GuideFrontmatter, GameMeta } from '@/types/content';

const CONTENT_DIR = path.join(process.cwd(), 'content/guides');

/**
 * Get all game directories
 */
export function getGames(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('_'))
    .map((d) => d.name);
}

/**
 * Load game metadata from _meta.json
 */
export function getGameMeta(gameSlug: string): GameMeta | null {
  const metaPath = path.join(CONTENT_DIR, gameSlug, '_meta.json');
  if (!fs.existsSync(metaPath)) return null;
  const raw = fs.readFileSync(metaPath, 'utf-8');
  return JSON.parse(raw) as GameMeta;
}

/**
 * Get all guides for a specific game
 */
export function getGuidesByGame(gameSlug: string): GuideContent[] {
  const gameDir = path.join(CONTENT_DIR, gameSlug);
  if (!fs.existsSync(gameDir)) return [];

  return fs
    .readdirSync(gameDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const filePath = path.join(gameDir, filename);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);

      return {
        slug,
        frontmatter: data as GuideFrontmatter,
        content,
      };
    })
    .sort((a, b) => (a.frontmatter.order ?? 999) - (b.frontmatter.order ?? 999));
}

/**
 * Get a single guide by game + slug
 */
export function getGuide(
  gameSlug: string,
  guideSlug: string
): GuideContent | null {
  const filePath = path.join(CONTENT_DIR, gameSlug, `${guideSlug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return {
    slug: guideSlug,
    frontmatter: data as GuideFrontmatter,
    content,
  };
}

/**
 * Get all guides across all games (for search indexing)
 */
export function getAllGuides(): GuideContent[] {
  const games = getGames();
  return games.flatMap((game) => getGuidesByGame(game));
}
