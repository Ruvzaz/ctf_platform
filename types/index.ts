export interface Category {
  id: string;
  name: string;      // e.g., "MALWARE", "ZERO-DAY"
  isAlert?: boolean; // If true, use the Security Red styling
}

export interface Author {
  id: string;
  name: string;      // e.g., "GHOST_PROTOCOL"
  role?: string;
  avatarUrl?: string;
}

export interface Article {
  id: string;
  documentId?: string; // Strapi v5 uses documentId
  title: string;
  slug: string;
  summary: string;
  content?: string;
  imageUrl?: string; // New field for the 16:9 image
  publishedAt: string; // ISO 8601 String
  author: Author;
  categories: Category[];
  priority: "CRITICAL" | "HIGH" | "NORMAL";
  likes?: number;
  hearts?: number;
}

// Note: According to Vercel best practices (server-serialization), 
// we should map raw Strapi responses to these clean, flattened interfaces 
// before passing them from Server Components to Client Components.
