import "reflect-metadata";
import "../global.css";
import React from "react";

export default function RootLayout({ children }) {
  return (
    <html >
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
