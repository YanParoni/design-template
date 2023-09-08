import 'reflect-metadata';
import '../global.css'
import Providers from "@app/provider";
import React from "react";
import Chat from '@ui/components/templates/chat';
 
export const metadata = {
  openGraph: {
    title: 'Portfolio project',
    description: 'Yan Paroni portfolio project ',
    url: 'https://design-template-ivory.vercel.app/',
    images: [
      {
        url: require('../public/thumbnail.png'), 
        width: 800,
        height: 600,
      },
      {
        url: require('../public/thumbnail.png'), 
        width: 1800,
        height: 1600,
        alt: 'Portfolio project',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <body className='bg-bkg' >
        <Providers>
          {children}
        <Chat/>
        </Providers>
      </body>
    </html>

  );
}