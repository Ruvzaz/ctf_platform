import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";
import { getArticles } from "@/lib/api";

export default async function LandingPage() {
  const articles = await getArticles();
  
  // Use backend articles primarily, limited to 3 latest news
  const displayArticles = articles.slice(0, 3);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="w-full min-h-screen flex flex-col relative overflow-x-hidden">
      <Navbar currentPath="/" />
      
      <main className="flex-grow pt-16 pb-16 px-8 max-w-[1280px] mx-auto w-full flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full flex flex-col items-center justify-center text-center mb-16 relative">
          <div className="z-10 flex flex-col items-center">
            <div className="w-[480px] md:w-[768px] mb-6 flex items-center justify-center transition-all duration-150 mx-auto">
              {/* Replace with actual image or keep the original logo */}
              <div className="relative w-452 h-110 mb-4">
                <Image
                  src="/images/259.1.png"
                  alt="NCSA CTF Flag Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <h1 className="thai-pixel text-4xl md:text-6xl font-bold text-[var(--color-primary)] mb-4 max-w-4xl leading-tight">
              ปกป้องโลกไซเบอร์ของคุณ
            </h1>
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-[var(--color-secondary)] mb-6">
              ศูนย์กลางข่าวสารการแข่งขัน NCSA x CTF
            </h2>
            <p className="font-sans text-[var(--color-on-surface-variant)] max-w-2xl mb-8 text-sm md:text-base">
              อัปเดตทุกสมรภูมิ CTF, ผลการแข่งขัน, และกิจกรรมฝึกอบรมเพื่อนักรบไซเบอร์ไทย จาก สกมช.
            </p>
            <div className="flex gap-4">
              <Link href="/news">
                <button className="bg-[var(--color-secondary)] text-white font-mono text-xl uppercase px-12 py-4 border-2 border-[var(--color-secondary)] pixel-border pixel-border-hover transition-all duration-100 font-bold hover:bg-[var(--color-secondary-container)] cursor-pointer">
                  รับชมข่าวสาร
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Modules Grid */}
        <section className="w-full max-w-5xl">
          <h3 className="font-heading text-2xl font-bold text-[var(--color-primary)] border-b-4 border-[var(--color-primary)] pb-2 mb-8 uppercase tracking-widest">
            ข่าวสารล่าสุด (Latest NEWS)
          </h3>
          
          {displayArticles && displayArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayArticles.map((article) => (
                <Link 
                  key={article.id}
                  href={`/report/${article.slug}`}
                  className="group bg-white border-2 border-[var(--color-primary)] p-6 pixel-border pixel-border-hover transition-all duration-150 flex flex-col items-start text-left relative"
                >
                  <div className="mb-4 w-full">
                    {/* First category as the top badge */}
                    {article.categories && article.categories.length > 0 ? (
                      <span className={`${article.categories[0].isAlert ? 'bg-[var(--color-secondary)]' : 'bg-[var(--color-primary)]'} text-white font-mono text-[10px] px-2 py-1 uppercase font-bold tracking-widest`}>
                        {article.categories[0].name.replace(/\s+/g, '_')}
                      </span>
                    ) : (
                      <span className="bg-[var(--color-primary)] text-white font-mono text-[10px] px-2 py-1 uppercase font-bold tracking-widest">
                        NEWS_UPDATE
                      </span>
                    )}
                  </div>
                  
                  <div className="w-full mb-4">
                    <div className="aspect-video w-full bg-[var(--color-surface-container)] border-2 border-[var(--color-primary)] relative overflow-hidden flex items-center justify-center">
                      {article.imageUrl ? (
                        <Image 
                          src={article.imageUrl} 
                          alt={article.title} 
                          fill 
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-[var(--color-primary)] font-mono text-xs opacity-50">NO_IMAGE_DATA</span>
                      )}
                      <div className="absolute inset-0 bg-[var(--color-secondary)] opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 flex-grow">
                    <h4 className="thai-pixel text-xl font-bold text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors leading-tight">
                      {article.title}
                    </h4>
                    <p className="font-sans text-sm text-[var(--color-on-surface-variant)] mb-4 line-clamp-2">
                      {article.summary || article.content?.substring(0, 100) + '...'}
                    </p>
                  </div>
                  
                  <div className="mt-auto w-full flex justify-between items-center">
                    <span className="font-mono text-[10px] text-[var(--color-outline)]">
                      {formatDate(article.publishedAt)}
                    </span>
                    <span className="font-mono text-[12px] font-bold text-[var(--color-secondary)] flex items-center gap-1">
                      อ่านรายละเอียดเพิ่มเติม
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center border-2 border-dashed border-[var(--color-outline)]">
              <span className="font-mono text-[var(--color-outline)] text-sm">NO_NEWS_ARTICLES_LOADED</span>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-[var(--color-tertiary)] border-t-4 border-double border-[var(--color-primary)] mt-auto">
        <div className="font-heading text-xl text-[var(--color-secondary)] font-bold">NCSA x CTF</div>
        <div className="font-mono text-sm text-[var(--color-on-tertiary)] text-center md:text-right">
          &copy; 2026 NCSA CTF. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}
