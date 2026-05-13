import { MetadataRoute } from "next";
import { getGames, getGameMeta, getGuidesByGame } from "@/lib/mdx";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://game-hub-eta-rose.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const games = getGames();
  const entries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/games`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  for (const slug of games) {
    const meta = getGameMeta(slug);
    const guides = getGuidesByGame(slug);

    if (meta) {
      entries.push({
        url: `${BASE_URL}/games/${slug}`,
        lastModified: new Date(meta.releaseDate),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    for (const guide of guides) {
      entries.push({
        url: `${BASE_URL}/games/${slug}/${guide.slug}`,
        lastModified: new Date(guide.frontmatter.updatedAt),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
