import React from 'react';
import Link from 'next/link';

export const Navbar = ({ currentPath }: { currentPath: string }) => {
  return (
    <nav className="bg-primary text-white flex flex-col md:flex-row items-center justify-between p-4 px-6 gap-4 border-b-2 border-primary">
      <Link href="/" className="font-heading text-2xl font-bold tracking-wider w-full md:w-auto text-center md:text-left">
        NCSA CTF
      </Link>
      <div className="hidden md:flex gap-8 font-mono text-sm tracking-widest text-outline-variant">
        <Link 
          href="/" 
          className={`transition-colors ${currentPath === '/' ? 'text-white font-bold border-b-2 border-secondary pb-1' : 'hover:text-white'}`}
        >
          HOME
        </Link>
        <Link 
          href="/news" 
          className={`transition-colors ${currentPath === '/news' ? 'text-white font-bold border-b-2 border-secondary pb-1' : 'hover:text-white'}`}
        >
          NEWS
        </Link>
      </div>
      <div className="w-full md:w-auto">
        <input 
          type="text" 
          placeholder="SEARCH_TERMINAL..." 
          className="bg-transparent border border-secondary text-white font-mono text-xs px-3 py-2 outline-none w-full md:w-64 focus:bg-primary-container transition-colors"
        />
      </div>
    </nav>
  );
};
