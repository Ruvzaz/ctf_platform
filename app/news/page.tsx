import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";
import { NewsFeed } from "@/components/news-feed";
import { getArticles } from "@/lib/api";

export default async function NewsHub() {
  const articles = await getArticles();

  // Duplicate the first article to make it 6 for a perfect 3x2 grid matching the UI mockup initially
  // We only do this if there's exactly 5 mock articles, to retain the UI layout feeling
  const displayArticles = articles.length === 5 ? [...articles, { ...articles[0], id: "art-006" }] : articles;

  return (
    <div className="w-full min-h-screen bg-background p-3 md:p-6 lg:p-8">
      <div className="w-full bg-white border-2 border-primary flex flex-col min-h-[calc(100vh-1.5rem)] md:min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-4rem)] shadow-[8px_8px_0_0_var(--color-primary)]">
        
        {/* Navbar */}
        <Navbar currentPath="/news" />

        {/* Content Wrapper */}
        <div className="flex-1 p-6 md:p-12">
          
          {/* Alert Banner Marquee */}
          <div className="border-2 border-dashed border-secondary bg-white overflow-hidden mb-10 relative flex items-center h-16 group cursor-default">
            <div className="flex w-max animate-marquee gap-12 group-hover:[animation-play-state:paused] pr-12">
              {[...Array(100)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="relative w-8 h-8">
                    <Image 
                      src="/images/logo_transparent.png" 
                      alt="Logo" 
                      fill
                      sizes="32px"
                      className="object-contain mix-blend-multiply" 
                    />
                  </div>
                  <span className="font-heading font-bold text-primary tracking-widest uppercase opacity-80">
                    BIT-SHIELD TACTICAL ALERT
                  </span>
                </div>
              ))}
            </div>
          </div>

          <NewsFeed initialArticles={displayArticles} />

        </div>

        {/* Footer */}
        <footer className="bg-[#1d1f1f] text-outline-variant p-6 md:p-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono border-t-2 border-primary mt-auto">
          <div className="font-heading text-xl font-bold text-secondary tracking-widest mb-6 md:mb-0">
            BIT-SHIELD
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-6 md:mb-0">
            <Link href="#" className="hover:text-white transition-colors">TERMINAL_ACCESS</Link>
            <Link href="#" className="hover:text-white transition-colors">PRIVACY_PROTOCOL</Link>
            <Link href="#" className="hover:text-white transition-colors">ENCRYPTION_STANDARDS</Link>
            <Link href="#" className="hover:text-white transition-colors">API_DOCS</Link>
          </div>
          <div className="text-center md:text-right text-[10px] md:text-xs text-outline">
            &copy; 198X-2024 BIT-SHIELD TACTICAL SYSTEMS. ALL RIGHTS RESERVED.
          </div>
        </footer>

      </div>
    </div>
  );
}
