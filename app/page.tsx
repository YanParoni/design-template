'use client'
import { List } from "../src/ui/components/organisms/list";
import { Suspense } from "react";
import ThemeButton from "@ui/components/molecules/theme-button";
import Pagination from "@ui/components/organisms/pagination";
import CardLoadingSkeleton from "@ui/components/organisms/card/card-loading-skeleton";

export default function Home() {
  return (
    <main className="bg-bkg">
      <Suspense fallback={<div style={{ color: 'white' }}>loading...</div>}>
        <ThemeButton />
      </Suspense>
      <Suspense fallback={<CardLoadingSkeleton />}>
        <List />
        <Pagination
        />
      </Suspense>
    </main>
  );
}