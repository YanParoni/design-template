import 'reflect-metadata';
import '../global.css';
import React from 'react';
import Providers from "@app/provider";


export default function RootLayout({ children }) {

  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
