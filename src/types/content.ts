// Content type definitions

export interface GameMeta {
  slug: string;
  title: string;
  cover: string;
  description: string;
  genre: string;
  releaseDate: string;
  tags: string[];
}

export interface GuideFrontmatter {
  title: string;
  description: string;
  cover?: string;
  game: string;
  category: string;
  tags: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  updatedAt: string;
  createdAt: string;
  order?: number;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export interface GuideContent {
  slug: string;
  frontmatter: GuideFrontmatter;
  content: string;
}

export interface AlgoliaRecord {
  objectID: string;
  title: string;
  description: string;
  game: string;
  category: string;
  tags: string[];
  difficulty?: string;
  slug: string;
  updatedAt: string;
}
