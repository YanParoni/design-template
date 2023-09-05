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
      <body className='bg-bkg' >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>

  );
}