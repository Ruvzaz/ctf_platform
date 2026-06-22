import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Navbar = ({ currentPath }: { currentPath: string }) => {
  return (
    <nav className="bg-[#040c18]/80 text-white flex flex-col md:flex-row items-center justify-between p-4 px-6 gap-4 border-b border-cyan-950/50 backdrop-blur-md z-30 relative">
      <Link href="/" className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start">
        <div className="relative h-12 w-28 md:w-32">
          <Image
            src="/images/259.1.png"
            alt="NCSA CTF Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </Link>
      <div className="flex gap-8 font-heading text-base font-medium tracking-wide">
        <Link 
          href="/" 
          className={`transition-colors duration-200 ${currentPath === '/' ? 'text-sky-400 font-bold border-b border-sky-400 pb-0.5' : 'text-sky-400/80 hover:text-sky-300'}`}
        >
          Home
        </Link>
        <Link 
          href="/news" 
          className={`transition-colors duration-200 ${currentPath === '/news' ? 'text-red-500 font-bold border-b border-red-500 pb-0.5' : 'text-red-500/80 hover:text-red-400'}`}
        >
          News
        </Link>
      </div>
      <div className="w-full md:w-auto">
        <input 
          type="text" 
          placeholder="SEARCH_TERMINAL..." 
          className="bg-[#030914]/90 border border-sky-950/60 text-sky-400/80 font-mono text-xs px-4 py-2 outline-none w-full md:w-64 focus:border-sky-500/80 focus:text-sky-300 focus:bg-[#040e1c] transition-all rounded-none"
        />
      </div>
    </nav>
  );
};
