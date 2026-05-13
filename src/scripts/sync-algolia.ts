/**
 * Algolia Index Sync Script
 * Usage: npm run algolia:sync
 *
 * Reads all MDX guides from content/guides/ and syncs them to Algolia.
 */
import { syncGuidesToAlgolia } from '../lib/algolia';

async function main() {
  console.log('🔄 Syncing guides to Algolia...');

  const result = await syncGuidesToAlgolia();

  if (result.success) {
    console.log(`✅ Successfully indexed ${result.indexed} guides`);
  } else {
    console.error(`❌ Sync failed: ${result.error}`);
    process.exit(1);
  }
}

main();
