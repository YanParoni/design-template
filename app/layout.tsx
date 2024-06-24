import 'reflect-metadata';
import '../global.css'
import Providers from "@app/provider";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <body className='bg-bkg '  >
     <div className="min-h-screen bg-bkg text-primary-color flex justify-center ">
      <div className="max-w-[960px] w-full px-4 md:px-0 ">
        <Providers>
          {children}
        </Providers>
        </div>
        </div>
      </body>
    </html>

  );
}