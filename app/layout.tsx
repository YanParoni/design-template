import "reflect-metadata";
import "../global.css";
import React from "react";
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Playboxd Portfolio by Yan Paroni',
  description: 'A project inspired by Letterboxd and powered by RAWG API.',
  metadataBase: new URL('https://design-template-ivory.vercel.app/'),
  twitter:{
    card: 'summary_large_image'
  }
};
interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <head>
      <meta name="keywords" content="portfolio, frontend, fullstack,nextjs, react,freelance" />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <meta property="og:type" content="website"/>
      <meta property="og:title" content="Playboxd" />
      <meta property="og:description" content="Portfolio Project inspired by Letterboxd" />
      <meta property="og:image" content="/opengraph-image.png" />
      <meta property="twitter:image" content="/twitter-image.png" />
      <meta property="twitter:description" content="Portfolio Project inspired by Letterboxd" />

      </head>
      <body className="newbg" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
