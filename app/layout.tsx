import type { Metadata } from "next";
import { Space_Grotesk, Work_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Bit-Shield Tactical",
  description: "High-stakes cybersecurity reporting terminal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${workSans.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-on-surface bg-background">
        {children}
      </body>
    </html>
  );
}
