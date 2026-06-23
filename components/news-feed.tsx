"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Article } from "@/types";

const CATEGORIES = ["ALL", "NEWS", "CHALLENGE", "BOOT CAMP", "AWARENESS", "LEARNING"];

export function NewsFeed({ initialArticles }: { initialArticles: Article[] }) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const filteredArticles = initialArticles.filter(article => {
    if (selectedCategory === "ALL") return true;
    return article.categories.some(cat => cat.name.toUpperCase() === selectedCategory);
  });

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ITEMS_PER_PAGE));
  const currentArticles = filteredArticles.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const formatTimeAgo = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date("2026-06-15T12:00:00Z");
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(Math.abs(diffMs) / 60000);
    
    if (diffMins < 60) return `${Math.max(1, diffMins)} นาทีที่แล้ว`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} ชั่วโมงที่แล้ว`;
    return `${Math.floor(diffHours / 24)} วันที่แล้ว`;
  };

  return (
    <>
      {/* Header & Filters */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-8 border-b-4 border-primary pb-4 gap-6">
        <div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold tracking-tighter text-primary">
            ศูนย์รวมข่าวสารความปลอดภัย<br/>
            <span className="uppercase text-3xl md:text-4xl">(CYBER NEWS HUB)</span>
          </h1>
        </div>
        <div className="flex flex-wrap gap-2 font-mono text-xs font-bold uppercase">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`border-2 border-primary px-3 py-1 flex items-center gap-2 transition-colors ${selectedCategory === cat ? 'bg-primary text-white' : 'bg-white text-primary hover:bg-surface-dim'}`}
            >
              <span className={`w-2 h-2 rounded-full ${selectedCategory === cat ? 'bg-white' : 'bg-primary'}`}></span> 
              {cat === "ALL" ? "ทั้งหมด (ALL)" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {currentArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentArticles.map((article, idx) => (
            <div key={`${article.id}-${idx}`} className="border-2 border-primary border-b-8 flex flex-col bg-white hover:-translate-y-1 hover:shadow-[4px_4px_0_0_var(--color-primary)] transition-all group">
              <div className="relative w-full aspect-video border-b-2 border-primary overflow-hidden bg-surface-dim">
                <Badge variant="alert" className="absolute top-3 left-3 z-10 !bg-secondary !text-white !border-none !text-[10px]">
                  #{article.categories[0]?.name || "NEWS"}
                </Badge>
                {article.imageUrl && (
                  <Image 
                    src={article.imageUrl} 
                    alt={article.title} 
                    fill 
                    priority={idx < 3}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-heading text-xl font-bold mb-3 leading-tight line-clamp-2 text-primary">
                  {article.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-on-surface-variant mb-6 line-clamp-3">
                  {article.summary}
                </p>
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-outline-variant">
                  <span className="font-mono text-[10px] text-outline">
                    เผยแพร่เมื่อ: {formatTimeAgo(article.publishedAt)}
                  </span>
                  <Link href={`/report/${article.slug}`} className="font-sans text-xs font-bold text-secondary hover:text-primary transition-colors flex items-center gap-1">
                    อ่านรายละเอียดเพิ่มเติม <span className="text-lg leading-none">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center border-2 border-dashed border-outline-variant mb-12">
          <p className="font-mono text-outline-variant text-lg">NO_DATA_FOUND_FOR_CATEGORY: {selectedCategory}</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 font-mono text-sm font-bold mt-16">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="border-2 border-primary w-8 h-8 flex items-center justify-center hover:bg-surface-dim transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &lt;
          </button>
          
          {[...Array(totalPages)].map((_, i) => {
            const pageNumber = i + 1;
            return (
              <button 
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`border-2 border-primary w-8 h-8 flex items-center justify-center transition-colors ${currentPage === pageNumber ? 'bg-primary text-white' : 'hover:bg-surface-dim'}`}
              >
                {String(pageNumber).padStart(2, '0')}
              </button>
            );
          })}
          
          <button 
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="border-2 border-primary w-8 h-8 flex items-center justify-center hover:bg-surface-dim transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &gt;
          </button>
        </div>
      )}
    </>
  );
}
