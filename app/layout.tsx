import "reflect-metadata";
import "../global.css";
import React from "react";

export default function RootLayout({ children }) {
  return (
    <html >
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
