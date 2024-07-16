import "reflect-metadata";
import "../../global.css";
import Providers from "@app/provider";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <section className="h-screen w-screen">{children}</section>
    </Providers>
  );
}
