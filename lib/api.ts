import { Article } from "@/types";
import mockArticles from "@/mocks/articles.json";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

function extractStrapiContent(attrs: any): string {
  const raw = attrs.content || attrs.body || attrs.detail || attrs.description;
  if (!raw) return "";
  
  if (typeof raw === "string") return raw.replace(/\n/g, '<br/>');
  
  // รองรับ Strapi v5 Blocks (Rich Text แบบใหม่ที่เป็น Array)
  if (Array.isArray(raw)) {
    try {
      return raw.map((block: any) => {
        const renderChildren = (children: any[]): string => {
          if (!children) return '';
          return children.map((c: any): string => {
            if (c.type === 'link') {
              return `<a href="${c.url}">${renderChildren(c.children)}</a>`;
            }
            let text = c.text || '';
            // แปลงการขึ้นบรรทัดใหม่ (Shift+Enter) เป็น <br/>
            text = text.replace(/\n/g, '<br/>');
            if (c.bold) text = `<strong>${text}</strong>`;
            if (c.italic) text = `<em>${text}</em>`;
            if (c.underline) text = `<u>${text}</u>`;
            if (c.strikethrough) text = `<s>${text}</s>`;
            if (c.code) text = `<code class="bg-surface-dim border border-primary px-2 py-0.5 text-sm font-mono">${text}</code>`;
            return text;
          }).join('');
        };

        if (block.type === 'paragraph') {
          return `<p>${renderChildren(block.children)}</p>`;
        }
        if (block.type === 'heading') {
          const level = block.level || 2;
          return `<h${level}>${renderChildren(block.children)}</h${level}>`;
        }
        if (block.type === 'list') {
          const items = block.children?.map((li: any) => `<li>${renderChildren(li.children)}</li>`).join('');
          return block.format === 'ordered' ? `<ol>${items}</ol>` : `<ul>${items}</ul>`;
        }
        if (block.type === 'quote') {
          return `<blockquote>${renderChildren(block.children)}</blockquote>`;
        }
        return "";
      }).join('\n');
    } catch (e) {
      return "";
    }
  }
  
  return "";
}

export async function getArticles(): Promise<Article[]> {
  if (!STRAPI_API_TOKEN || STRAPI_API_TOKEN === "your_secure_api_token_here") {
    console.warn("⚠️ STRAPI_API_TOKEN is missing or default. Falling back to mock data.");
    return mockArticles as Article[];
  }

  try {
    const isDev = process.env.NODE_ENV === 'development';
    const res = await fetch(`${API_URL}/api/articles?populate=*`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      cache: isDev ? 'no-store' : 'force-cache',
      ...(isDev ? {} : { next: { revalidate: 180, tags: ['articles'] } })
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch articles: ${res.statusText}`);
    }

    const json = await res.json();
    
    const articles: Article[] = json.data.map((item: any) => {
      const attrs = item.attributes || item; 
      
      let imageUrl = attrs.imageUrl || ""; 
      const imageObj = attrs.image?.data?.attributes || attrs.image;
      if (imageObj?.url) {
        imageUrl = imageObj.url.startsWith('http') 
          ? imageObj.url 
          : `${API_URL}${imageObj.url}`;
      }

      let categories: any[] = [];
      const catsObj = attrs.categories?.data || attrs.categories;
      if (Array.isArray(catsObj)) {
        categories = catsObj.map((c: any) => ({
          id: c.id || c.documentId,
          name: c.attributes?.name || c.name || "UNCLASSIFIED",
          isAlert: c.attributes?.isAlert || c.isAlert || false
        }));
      }

      const authorObj = attrs.author?.data?.attributes || attrs.author;
      const author = authorObj ? {
        id: attrs.author?.data?.id || attrs.author?.id || "auth-unknown",
        name: authorObj.name || "SYSTEM"
      } : { id: "auth-unknown", name: "SYSTEM" };

      return {
        id: item.documentId || item.id,
        documentId: item.documentId || item.id,
        title: attrs.title,
        slug: attrs.slug,
        summary: attrs.summary,
        content: extractStrapiContent(attrs),
        imageUrl,
        publishedAt: attrs.publishedAt || new Date().toISOString(),
        author,
        categories,
        priority: attrs.priority || "NORMAL",
        likes: attrs.likes || 0,
        hearts: attrs.hearts || 0
      };
    });

    return articles;
  } catch (error: any) {
    console.warn("⚠️ Strapi API is unavailable or unauthorized. Falling back to mock data.");
    console.warn("➡️ Details:", error?.message || error);
    return mockArticles as Article[]; 
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!STRAPI_API_TOKEN || STRAPI_API_TOKEN === "your_secure_api_token_here") {
    const article = mockArticles.find(a => a.slug === slug);
    return article ? (article as Article) : null;
  }

  try {
    const isDev = process.env.NODE_ENV === 'development';
    const res = await fetch(`${API_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      cache: isDev ? 'no-store' : 'force-cache',
      ...(isDev ? {} : { next: { revalidate: 180, tags: ['articles'] } })
    });

    if (!res.ok) throw new Error(`Failed to fetch article: ${res.statusText}`);

    const json = await res.json();
    if (!json.data || json.data.length === 0) return null;

    const item = json.data[0];
    const attrs = item.attributes || item; 
    
    let imageUrl = attrs.imageUrl || ""; 
    const imageObj = attrs.image?.data?.attributes || attrs.image;
    if (imageObj?.url) {
      imageUrl = imageObj.url.startsWith('http') ? imageObj.url : `${API_URL}${imageObj.url}`;
    }

    let categories: any[] = [];
    const catsObj = attrs.categories?.data || attrs.categories;
    if (Array.isArray(catsObj)) {
      categories = catsObj.map((c: any) => ({
        id: c.id || c.documentId,
        name: c.attributes?.name || c.name || "UNCLASSIFIED",
        isAlert: c.attributes?.isAlert || c.isAlert || false
      }));
    }

    const authorObj = attrs.author?.data?.attributes || attrs.author;
    const author = authorObj ? {
      id: attrs.author?.data?.id || attrs.author?.id || "auth-unknown",
      name: authorObj.name || "SYSTEM"
    } : { id: "auth-unknown", name: "SYSTEM" };

    return {
      id: item.documentId || item.id,
      documentId: item.documentId || item.id,
      title: attrs.title,
      slug: attrs.slug,
      summary: attrs.summary,
      content: extractStrapiContent(attrs),
      imageUrl,
      publishedAt: attrs.publishedAt || new Date().toISOString(),
      author,
      categories,
      priority: attrs.priority || "NORMAL",
      likes: attrs.likes || 0,
      hearts: attrs.hearts || 0
    };
  } catch (error) {
    console.warn("⚠️ Error fetching single article:", error);
    const article = mockArticles.find(a => a.slug === slug);
    return article ? (article as Article) : null;
  }
}
