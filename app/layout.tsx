import 'reflect-metadata';
import '../global.css'
import Providers from "@app/provider";
import React from "react";
import LayoutContainer from '@ui/components/organisms/layout';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <body className='bg-bkg'>
      <LayoutContainer>
        <Providers>
          {children}
        </Providers>
        </LayoutContainer>
      </body>
    </html>
  );
}