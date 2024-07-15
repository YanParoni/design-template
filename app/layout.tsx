import "reflect-metadata";
import "../global.css";
import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
