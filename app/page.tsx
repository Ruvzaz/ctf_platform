import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/ui/navbar";

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-background p-3 md:p-6 lg:p-8">
      <div className="w-full bg-white border-2 border-primary flex flex-col min-h-[calc(100vh-1.5rem)] md:min-h-[calc(100vh-3rem)] lg:min-h-[calc(100vh-4rem)] shadow-[8px_8px_0_0_var(--color-primary)]">
        <Navbar currentPath="/" />
        
        <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden bg-surface">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <Image 
                src="/images/cyber_map.png" 
                alt="Cyber Map Background" 
                fill 
                className="object-cover"
                priority
             />
          </div>
          
          <div className="relative z-10 flex flex-col items-center text-center max-w-4xl border-4 border-primary bg-white p-8 md:p-16 shadow-[8px_8px_0_0_var(--color-primary)] hover:shadow-[12px_12px_0_0_var(--color-primary)] transition-shadow duration-300">
            <Badge variant="alert" className="mb-6 !text-sm !bg-primary !text-white border-none">
              SYSTEM_STATUS: SECURE
            </Badge>
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-primary uppercase mb-6 leading-[1.1]">
              Defend The <br/><span className="text-secondary">Digital Frontier</span>
            </h1>
            <p className="font-sans text-lg md:text-xl text-on-surface-variant mb-10 max-w-2xl font-bold">
              Real-time surveillance, threat intelligence, and zero-day vulnerability reporting for high-stakes enterprise environments.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link href="/news" className="w-full sm:w-auto">
                <Button className="w-full text-lg !px-8 !py-4 font-heading tracking-widest shadow-[4px_4px_0_0_var(--color-primary)] active:shadow-none hover:-translate-y-1 transition-all !bg-secondary hover:!bg-red-800">
                  ACCESS INTELLIGENCE HUB
                </Button>
              </Link>
              <Button variant="secondary" className="w-full sm:w-auto text-lg !px-8 !py-4 font-heading tracking-widest shadow-[4px_4px_0_0_var(--color-primary)] active:shadow-none hover:-translate-y-1 transition-all">
                REQUEST CLEARANCE
              </Button>
            </div>
            
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 w-full border-t-4 border-primary pt-10">
              <div className="flex flex-col items-center">
                <span className="font-mono text-4xl md:text-5xl font-bold text-secondary">99.9%</span>
                <span className="font-sans text-xs md:text-sm uppercase font-bold text-on-surface-variant mt-2 tracking-widest">Uptime</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-mono text-4xl md:text-5xl font-bold text-primary">0-DAY</span>
                <span className="font-sans text-xs md:text-sm uppercase font-bold text-on-surface-variant mt-2 tracking-widest">Detection</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-mono text-4xl md:text-5xl font-bold text-primary">24/7</span>
                <span className="font-sans text-xs md:text-sm uppercase font-bold text-on-surface-variant mt-2 tracking-widest">Monitoring</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-mono text-4xl md:text-5xl font-bold text-primary">A.I.</span>
                <span className="font-sans text-xs md:text-sm uppercase font-bold text-on-surface-variant mt-2 tracking-widest">Driven</span>
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="bg-[#1d1f1f] text-outline-variant p-6 md:p-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono border-t-2 border-primary z-20">
          <div className="font-heading text-xl font-bold text-secondary tracking-widest mb-6 md:mb-0">
            BIT-SHIELD
          </div>
          <div className="text-center md:text-right text-[10px] md:text-xs text-outline">
            &copy; 198X-2024 BIT-SHIELD TACTICAL SYSTEMS. ALL RIGHTS RESERVED.
          </div>
        </footer>
      </div>
    </div>
  );
}
