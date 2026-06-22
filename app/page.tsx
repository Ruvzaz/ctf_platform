import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";
import { getArticles } from "@/lib/api";
import mockArticles from "@/mocks/articles.json";
import { Article } from "@/types";

export default async function LandingPage() {
  const articles = await getArticles();
  
  // Merge live database articles with mock articles as a fallback to ensure we always have 3 columns filled
  let displayArticles: Article[] = [...articles];
  if (displayArticles.length < 3) {
    const fallbackArticles = (mockArticles as Article[]).filter(
      (mock) => !displayArticles.some(art => art.title === mock.title || art.slug === mock.slug)
    );
    displayArticles = [...displayArticles, ...fallbackArticles].slice(0, 3);
  }

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="w-full min-h-screen bg-[#020813] text-white relative overflow-x-hidden flex flex-col justify-between">
      {/* Cyber Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 210, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 210, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Cyber Map Overlay */}
      <div className="absolute inset-0 opacity-15 pointer-events-none z-0">
         <Image 
            src="/images/cyber_map.png" 
            alt="Cyber Map Background" 
            fill 
            className="object-cover"
            priority
         />
      </div>

      {/* Tactical Military HUD Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block select-none font-mono text-[10px] text-red-500/40">
        {/* Left Side */}
        <div className="absolute left-10 top-1/4 tracking-widest">
          <div>TARGET 02</div>
          <div className="w-16 h-[1px] bg-red-500/20 my-1"></div>
          {/* Target Crosshair */}
          <div className="relative w-8 h-8 flex items-center justify-center border border-red-500/30 rounded-full my-2 animate-pulse">
            <span className="absolute w-2 h-[1px] bg-red-500/50"></span>
            <span className="absolute h-2 w-[1px] bg-red-500/50"></span>
          </div>
        </div>
        <div className="absolute left-8 top-12 tracking-widest text-sky-500/30">
          GRID O-07
        </div>
        <div className="absolute left-8 bottom-1/4 tracking-widest">
          <div>TARGET O-18</div>
          <div className="text-red-500/20">GRID D-07</div>
          <div className="text-red-600/50 font-bold mt-1">RED = THREAT</div>
        </div>

        {/* Right Side */}
        <div className="absolute right-10 top-1/3 tracking-widest text-right">
          <div>TARGET 03</div>
          <div className="text-red-600/60 font-bold">ACTIVE HOSTILITY</div>
          <div className="w-24 h-[1px] bg-red-500/20 my-1 inline-block"></div>
        </div>
        <div className="absolute right-12 bottom-1/3 tracking-widest text-right text-slate-500/40">
          <div>GRID 9-07</div>
        </div>
        {/* Decorative corner element */}
        <div className="absolute right-8 bottom-8 text-sky-400/20 flex items-center gap-1.5 animate-pulse">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2v20M2 12h20" strokeWidth="0.5"/>
            <circle cx="12" cy="12" r="8" strokeWidth="0.5"/>
          </svg>
        </div>
      </div>

      <div className="z-10 w-full">
        <Navbar currentPath="/" />
        
        <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-12 relative">
          
          {/* Main Hero Card */}
          <div className="relative z-10 flex flex-col w-full max-w-5xl border border-sky-400/20 bg-[#040c18]/90 shadow-[0_0_50px_rgba(0,210,255,0.08)] mb-16 mt-6">
            
            {/* Top red header banner */}
            <div className="w-full bg-[#bc0000] text-white px-4 py-2.5 text-xs font-mono font-bold tracking-widest border-b border-[#bc0000] flex justify-between items-center">
              <span>SYSTEM_STATUS: SECURE</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              </div>
            </div>
            
            {/* Inner Content Container */}
            <div className="p-6 md:p-12 flex flex-col items-center text-center">
              
              {/* Flag image centered above text */}
              <div className="relative w-48 h-28 mb-4">
                <Image
                  src="/images/259.1.png"
                  alt="NCSA CTF Flag Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              
              {/* Headings */}
              <h1 className="font-heading text-2xl md:text-4xl font-bold tracking-tight text-white mb-2 leading-tight">
                ปลดล็อกศักยภาพไซเบอร์:
              </h1>
              <h2 className="font-heading text-xl md:text-3xl font-bold tracking-tight text-white mb-4 leading-tight">
                ศูนย์กลางข่าวสารการแข่งขัน NCSA x CTF ระดับชาติ
              </h2>
              
              {/* Paragraph */}
              <p className="font-sans text-xs md:text-sm text-sky-200/60 mb-8 max-w-2xl font-medium leading-relaxed">
                อัปเดตทุกสมรภูมิ CTF, ผลการแข่งขัน, และกิจกรรมฝึกอบรมเพื่อนักรบไซเบอร์ไทย จาก สกมช.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-10 max-w-lg">
                <Link href="/news" className="w-full sm:w-auto flex-1">
                  <button className="w-full text-xs md:text-sm px-6 py-3 font-heading tracking-widest bg-[#bc0000] text-white border border-[#bc0000] hover:bg-red-700 hover:border-red-700 transition-all font-bold uppercase rounded-none cursor-pointer">
                    ติดตามความเคลื่อนไหวล่าสุด
                  </button>
                </Link>
                <button className="w-full sm:w-auto flex-1 text-xs md:text-sm px-6 py-3 font-heading tracking-widest bg-white text-black border border-white hover:bg-slate-100 transition-all font-bold uppercase rounded-none cursor-pointer">
                  ดูตารางการแข่งขัน
                </button>
              </div>
              
              {/* Stats Section */}
              <div className="w-full border-t border-sky-950/60 pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-left">
                
                {/* Stats 1 */}
                <div className="flex items-center gap-3">
                  <div className="bg-[#bc0000]/15 border border-[#bc0000]/40 text-[#bc0000] p-2.5 w-12 h-12 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-heading text-xl font-bold text-white leading-none">15,000+</div>
                    <div className="font-mono text-[9px] font-bold text-sky-400 uppercase tracking-wider mt-0.5">TOTAL PARTICIPANTS</div>
                    <div className="font-sans text-[9px] text-sky-200/40">(ผู้เข้าร่วมทั้งหมดในการแข่งขัน)</div>
                  </div>
                </div>

                {/* Stats 2 */}
                <div className="flex items-center gap-3">
                  <div className="bg-sky-500/10 border border-sky-500/30 text-sky-400 p-2.5 w-12 h-12 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-heading text-xl font-bold text-white leading-none">2,500+</div>
                    <div className="font-mono text-[9px] font-bold text-sky-400 uppercase tracking-wider mt-0.5">MISSIONS DEPLOYED</div>
                    <div className="font-sans text-[9px] text-sky-200/40">(ภารกิจที่ถูกปล่อย)</div>
                  </div>
                </div>

                {/* Stats 3 */}
                <div className="flex items-center gap-3">
                  <div className="bg-[#bc0000]/15 border border-[#bc0000]/40 text-[#bc0000] p-2.5 w-12 h-12 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-heading text-xl font-bold text-white leading-none">40,000+</div>
                    <div className="font-mono text-[9px] font-bold text-sky-400 uppercase tracking-wider mt-0.5">HOURS OF CHALLENGES</div>
                    <div className="font-sans text-[9px] text-sky-200/40">(ชั่วโมงในการทดสอบ)</div>
                  </div>
                </div>

                {/* Stats 4 */}
                <div className="flex items-center gap-3">
                  <div className="bg-sky-500/10 border border-sky-500/30 text-sky-400 p-2.5 w-12 h-12 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-heading text-xl font-bold text-white leading-none">500+</div>
                    <div className="font-mono text-[9px] font-bold text-sky-400 uppercase tracking-wider mt-0.5">CYBER WARRIORS</div>
                    <div className="font-sans text-[9px] text-sky-200/40">(จำนวนนักรบไซเบอร์ระดับชาติ)</div>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Latest News Section */}
          <div className="w-full max-w-5xl z-10 mb-16">
            <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-2.5 h-5 bg-[#bc0000]"></span>
              ข่าวล่าสุด (LATEST NEWS)
            </h3>
            
            {/* Grid of news articles */}
            {displayArticles && displayArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {displayArticles.map((article, index) => (
                  <div 
                    key={article.id} 
                    className="relative bg-[#040c18]/90 border border-sky-950/60 p-4 hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(255,0,0,0.08)] transition-all duration-300 flex flex-col group"
                  >
                    {/* Index Number Badge */}
                    <div className="absolute top-0 left-0 bg-[#bc0000] text-white w-8 h-8 font-heading font-bold flex items-center justify-center text-sm z-20">
                      {index + 1}
                    </div>
                    
                    {/* Image Container */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden mb-4 border border-sky-950/40">
                      {article.imageUrl && (
                        <Image 
                          src={article.imageUrl} 
                          alt={article.title} 
                          fill 
                          priority={index === 0}
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      )}
                    </div>
                    
                    {/* Title */}
                    <h4 className="font-heading text-sm md:text-base font-bold text-white mb-4 line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                      {article.title}
                    </h4>
                    
                    {/* Footer Info inside card */}
                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-sky-950/30 text-[10px]">
                      {/* Category tags bracketed */}
                      <div className="flex flex-wrap gap-1">
                        {article.categories && article.categories.map((cat, catIdx) => (
                          <span 
                            key={cat.id || catIdx} 
                            className={`font-mono font-bold ${cat.isAlert ? 'text-[#bc0000]' : 'text-sky-400'}`}
                          >
                            [{cat.name}]
                          </span>
                        ))}
                      </div>
                      
                      {/* Date formatted */}
                      <span className="font-mono text-sky-200/40 font-medium">
                        {formatDate(article.publishedAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center border border-dashed border-sky-950/60">
                <span className="font-mono text-sky-200/30 text-xs">NO_NEWS_ARTICLES_LOADED</span>
              </div>
            )}
          </div>

        </main>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#01060e]/95 border-t border-sky-950/50 py-8 px-6 text-center z-10 flex flex-col items-center gap-3">
        <div className="font-heading text-lg font-bold tracking-widest">
          <span className="text-sky-400">NCSA</span> <span className="text-red-500">CTF</span>
        </div>
        <div className="text-[10px] font-mono text-sky-200/40 uppercase tracking-widest">
          &copy; 2024 NCSA CTF. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}
