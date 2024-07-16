import "reflect-metadata";
import "../global.css";
import React from "react";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Playboxd Portfolio by Yan Paroni',
  description: 'A project inspired by Letterboxd and powered by RAWG API.',
  metadataBase: new URL('https://www.linkedin.com/in/yan-paroni/'),
};
interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <meta name="keywords" content="portfolio, frontend, fullstack,nextjs, react,freelance" />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <meta property="og:title" content="Title Here" />
      <meta property="og:description" content="Description Here" />
      <meta property="og:image" content="/thumbnail.png" />
      <body className="newbg" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
