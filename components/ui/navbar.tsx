import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Navbar = ({ currentPath }: { currentPath: string }) => {
  return (
    <nav className="sticky top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-[var(--color-primary)] border-b-2 border-[var(--color-secondary)] shadow-[4px_4px_0px_0px_rgba(188,0,0,1)]">
      <div className="font-heading text-[24px] font-bold tracking-tighter text-[var(--color-on-primary)] flex-1 flex items-center">
        NCSA x CTF
      </div>
      <div className="hidden md:flex gap-6 justify-center">
        <Link 
          href="/" 
          className={`font-heading text-[18px] px-2 pb-1 transition-colors duration-75 hover:bg-[var(--color-secondary)] hover:text-white ${currentPath === '/' ? 'text-[var(--color-on-primary)] border-b-4 border-[var(--color-secondary-container)]' : 'text-[var(--color-on-primary-fixed-variant)]'}`}
        >
          HOME
        </Link>
        <Link 
          href="/news" 
          className={`font-heading text-[18px] px-2 pb-1 transition-colors duration-75 hover:bg-[var(--color-secondary)] hover:text-white ${currentPath === '/news' ? 'text-[var(--color-on-primary)] border-b-4 border-[var(--color-secondary-container)]' : 'text-[var(--color-on-primary-fixed-variant)]'}`}
        >
          NEWS
        </Link>
      </div>
      <div className="text-[var(--color-on-primary)] flex-1 flex justify-end">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 cursor-pointer hover:text-[var(--color-secondary)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </nav>
  );
};
