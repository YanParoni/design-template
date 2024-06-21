import 'reflect-metadata';
import '../global.css'
import Providers from "@app/provider";
import React from "react";
import Chat from '@ui/components/templates/chat';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <body className='bg-bkg '  >
     <div className="min-h-screen bg-bkg text-primary-color flex justify-center items-center">
      <div className="w-full max-w-5xl mx-5 md:mx-9 lg:mx-12 xl:mx-auto">
        <Providers>
          {children}
        <Chat/>
        </Providers>
        </div>
        </div>
      </body>
    </html>

  );
}