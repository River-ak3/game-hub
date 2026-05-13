/**
 * Algolia Search Integration
 *
 * Provides utilities for syncing guide content to Algolia and performing searches.
 * Uses Algolia v5 searchClient API (no initIndex needed).
 *
 * Prerequisites:
 * - Set NEXT_PUBLIC_ALGOLIA_APP_ID and ALGOLIA_ADMIN_API_KEY in .env.local
 */

import { AlgoliaRecord } from '@/types/content';
import { getAllGuides } from './mdx';

const APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '';
const API_KEY = process.env.ALGOLIA_ADMIN_API_KEY || '';
const INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || 'gamehub_guides';

/**
 * Check if Algolia is properly configured
 */
export function isAlgoliaConfigured(): boolean {
  return !!(APP_ID && API_KEY);
}

/**
 * Prepare all guides as Algolia records
 */
export function prepareGuideRecords(): AlgoliaRecord[] {
  const guides = getAllGuides();
  return guides.map((guide) => ({
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
}

/**
 * Sync all guides to Algolia index
 * Run via: npm run algolia:sync
 */
export async function syncGuidesToAlgolia(): Promise<{
  success: boolean;
  indexed: number;
  error?: string;
}> {
  if (!isAlgoliaConfigured()) {
    return { success: false, indexed: 0, error: 'Algolia not configured (missing APP_ID or ADMIN_API_KEY)' };
  }

  try {
    const { searchClient } = await import('algoliasearch');
    const client = searchClient(APP_ID, API_KEY);

    const records = prepareGuideRecords();
    await client.replaceAllObjects({ indexName: INDEX_NAME, objects: records as unknown as Record<string, unknown>[] });

    await client.setSettings({
      indexName: INDEX_NAME,
      indexSettings: {
        searchableAttributes: ['title', 'description', 'tags', 'category', 'game'],
        attributesToHighlight: ['title', 'description'],
        attributesToRetrieve: [
          'objectID', 'title', 'description', 'game',
          'category', 'tags', 'difficulty', 'slug', 'updatedAt',
        ],
        customRanking: ['desc(updatedAt)'],
      },
    });

    return { success: true, indexed: records.length };
  } catch (error) {
    return {
      success: false,
      indexed: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Search guides (client-side)
 */
export async function searchGuides(query: string): Promise<AlgoliaRecord[]> {
  if (!APP_ID || !query.trim()) return [];

  try {
    const { searchClient } = await import('algoliasearch');
    const client = searchClient(APP_ID, '');
    const { hits } = await client.searchSingleIndex({
      indexName: INDEX_NAME,
      searchParams: { query, hitsPerPage: 20 },
    });
    return (hits as unknown as AlgoliaRecord[]) || [];
  } catch {
    return [];
  }
}
