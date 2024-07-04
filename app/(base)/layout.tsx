import 'reflect-metadata';
import '../../global.css';
import Providers from '@app/provider';
import React from 'react';
import LayoutContainer from '@ui/components/organisms/layout';
import Navbar from '@ui/components/organisms/navbar';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bkg">
        <Providers>
          <Navbar />
          <LayoutContainer>{children}</LayoutContainer>
        </Providers>
      </body>
    </html>
  );
}
