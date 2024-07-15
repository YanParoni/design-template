import "reflect-metadata";
import React from "react";
import LayoutContainer from "@ui/components/organisms/layout";
import Navbar from "@ui/components/organisms/navbar";
import Providers from "@app/provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
            <link rel="icon" href="/favicon.ico" sizes="any" />

      <section className="bg-bkg">
        <Navbar />
        <LayoutContainer>{children}</LayoutContainer>
      </section>
    </Providers>
  );
}
