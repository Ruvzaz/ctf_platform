import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getArticles } from "@/lib/api";
import { Navbar } from "@/components/ui/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReactionButtons } from "@/components/reaction-buttons";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ReportDetailPage({ params }: { params: any }) {
  // Await params to support both Next.js 14 and 15+ (where params is a Promise)
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Fetch all articles to find related ones
  const allArticles = await getArticles();
  const currentCategoryIds = article.categories.map(c => c.id);
  const relatedArticles = allArticles
    .filter(a => a.id !== article.id)
    .filter(a => a.categories.some(c => currentCategoryIds.includes(c.id)))
    .slice(0, 3);

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Bangkok"
    });
  };

  const isCritical = article.priority === "CRITICAL";

  return (
    <div className="w-full min-h-screen bg-background p-3 md:p-6 lg:p-8">
      <div className="w-full bg-white border-2 border-primary flex flex-col min-h-[calc(100vh-1.5rem)] md:min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-4rem)] shadow-[8px_8px_0_0_var(--color-primary)]">
        
        {/* Navbar */}
        <Navbar currentPath="/news" />

        {/* Content Wrapper */}
        <div className="flex-1 flex flex-col lg:flex-row border-t-2 border-primary">
          
          {/* Main Article Content (Left Column) */}
          <article className="flex-1 p-6 md:p-12 lg:border-r-2 border-primary bg-white">
            <div className="mb-8">
              <Link href="/news" className="font-mono text-sm font-bold text-outline-variant hover:text-primary transition-colors flex items-center gap-2 w-fit border-2 border-transparent hover:border-primary px-3 py-1 -ml-3">
                &larr; BACK_TO_HUB
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {article.categories.map(cat => (
                <Badge key={cat.id} variant={cat.isAlert ? "alert" : "default"} className="font-mono text-xs uppercase !px-3 !py-1">
                  #{cat.name}
                </Badge>
              ))}
              <Badge variant={isCritical ? "alert" : "default"} className="font-mono text-xs uppercase !px-3 !py-1">
                PRIORITY: {article.priority}
              </Badge>
            </div>

            <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tighter text-primary leading-tight mb-10">
              {article.title}
            </h1>

            {article.imageUrl && (
              <div className="relative w-full aspect-video border-2 border-primary border-b-8 mb-12 overflow-hidden bg-surface-dim shadow-[4px_4px_0_0_var(--color-primary)]">
                <Image 
                  src={article.imageUrl} 
                  alt={article.title} 
                  fill 
                  priority
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 70vw"
                />
              </div>
            )}

            <div className="max-w-none font-sans text-lg text-on-surface-variant leading-relaxed 
                            [&>div>p]:mb-6 [&>div>p]:text-xl 
                            [&>div>h1]:font-heading [&>div>h1]:text-4xl [&>div>h1]:font-bold [&>div>h1]:text-primary [&>div>h1]:mb-6 [&>div>h1]:mt-10
                            [&>div>h2]:font-heading [&>div>h2]:text-3xl [&>div>h2]:font-bold [&>div>h2]:text-primary [&>div>h2]:mb-4 [&>div>h2]:mt-8
                            [&>div>h3]:font-mono [&>div>h3]:text-2xl [&>div>h3]:font-bold [&>div>h3]:text-secondary [&>div>h3]:mb-4 [&>div>h3]:mt-6
                            [&>div>ul]:list-disc [&>div>ul]:ml-8 [&>div>ul]:mb-6 [&>div>ul>li]:mb-2
                            [&>div>ol]:list-decimal [&>div>ol]:ml-8 [&>div>ol]:mb-6 [&>div>ol>li]:mb-2
                            [&>div>a]:text-secondary [&>div>a]:font-bold [&>div>a]:underline [&>div>a]:decoration-2 [&>div>a]:underline-offset-4
                            [&>div>strong]:text-primary [&>div>strong]:font-black
                            [&>div>blockquote]:border-l-8 [&>div>blockquote]:border-secondary [&>div>blockquote]:pl-6 [&>div>blockquote]:py-2 [&>div>blockquote]:bg-surface-dim [&>div>blockquote]:font-mono [&>div>blockquote]:text-primary [&>div>blockquote]:mb-6">
              {article.content ? (
                // แสดงเนื้อหา HTML ที่ถูกจัดรูปมาแล้ว
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              ) : (
                <>
                  {/* Fallback ถ้าไม่มี content ให้แสดง summary เป็นเกริ่นนำ */}
                  <p className="text-xl font-medium border-l-4 border-secondary pl-6 py-4 bg-surface-dim mb-8">
                    {article.summary}
                  </p>
                  <div className="border-2 border-dashed border-outline-variant p-10 text-center text-outline">
                    <p className="font-mono">[ RESTRICTED_CONTENT_AREA ]</p>
                    <p className="font-sans text-sm mt-2">Full report details require Level 3 Clearance or higher.</p>
                  </div>
                </>
              )}
            </div>
          </article>

          {/* Sidebar Meta Data (Right Column) */}
          <aside className="w-full lg:w-80 xl:w-96 bg-surface-bright flex flex-col">
            <div className="p-6 md:p-8 border-b-2 border-primary bg-primary text-white">
              <h3 className="font-mono text-sm tracking-widest text-outline-variant mb-2">CLASSIFICATION</h3>
              <p className="font-heading text-3xl font-bold uppercase text-secondary">
                {article.priority} LEVEL
              </p>
            </div>
            
            <div className="p-6 md:p-8 flex flex-col gap-10 flex-1">
              <div>
                <h3 className="font-mono text-xs font-bold text-outline uppercase mb-3 border-b-2 border-primary pb-2">Reporting Officer</h3>
                <div className="flex items-center gap-4 mt-4">
                  <div className="w-12 h-12 bg-primary text-white flex items-center justify-center font-heading font-bold text-2xl border-2 border-primary shadow-[4px_4px_0_0_var(--color-primary)]">
                    {article.author.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-primary text-lg">{article.author.name}</p>
                    <p className="font-mono text-xs text-outline font-bold">ID: {String(article.author.id).slice(0, 8).padStart(4, '0')}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-mono text-xs font-bold text-outline uppercase mb-3 border-b-2 border-primary pb-2">Timestamp</h3>
                <p className="font-mono text-sm font-bold text-on-surface-variant bg-white border-2 border-primary p-3 inline-block shadow-[4px_4px_0_0_var(--color-primary)] mt-2">
                  {formatTime(article.publishedAt)}
                </p>
              </div>

              {relatedArticles.length > 0 && (
                <div className="flex-1 mt-8">
                  <h3 className="font-mono text-xs font-bold text-outline uppercase mb-3 border-b-2 border-primary pb-2">Related Intel</h3>
                  <div className="flex flex-col gap-3 mt-4">
                    {relatedArticles.map((rel) => (
                      <Link 
                        key={rel.id} 
                        href={`/report/${rel.slug}`}
                        className="block bg-white border-2 border-primary p-3 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--color-primary)] transition-all group"
                      >
                        <div className="flex gap-2 items-start mb-2">
                           <span className="text-[10px] font-mono bg-surface-dim text-primary border border-primary px-1 py-0.5 whitespace-nowrap">
                             {formatTime(rel.publishedAt).split(' ')[0]}
                           </span>
                        </div>
                        <h4 className="font-heading font-bold text-primary group-hover:text-secondary transition-colors text-sm leading-tight line-clamp-2">
                          {rel.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-auto pt-8">
                <h3 className="font-mono text-xs font-bold text-outline uppercase mb-3 border-b-2 border-primary pb-2">Operator Feedback</h3>
                <ReactionButtons 
                  articleDocumentId={article.documentId || article.id} 
                  initialLikes={article.likes || 0}
                  initialHearts={article.hearts || 0}
                />
              </div>
            </div>
          </aside>

        </div>

        {/* Footer */}
        <footer className="bg-[#1d1f1f] text-outline-variant p-6 md:p-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono border-t-2 border-primary mt-auto">
          <div className="font-heading text-xl font-bold text-secondary tracking-widest mb-6 md:mb-0">
            NCSA CTF
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6 md:mb-0">
            <Link href="#" className="hover:text-white transition-colors">TERMINAL_ACCESS</Link>
            <Link href="#" className="hover:text-white transition-colors">PRIVACY_PROTOCOL</Link>
            <Link href="#" className="hover:text-white transition-colors">ENCRYPTION_STANDARDS</Link>
          </div>
          <div className="text-center md:text-right text-[10px] md:text-xs text-outline">
            &copy; 2026 NCSA CTF. ALL RIGHTS RESERVED.
          </div>
        </footer>

      </div>
    </div>
  );
}
