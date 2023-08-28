'use client'
import Providers from "client";
import React from "react";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{backgroundColor: '#121212'}}>
        <div >
      <Providers>
        {children}
        </Providers>
        </div>
        </body>
    </html>
  );
}