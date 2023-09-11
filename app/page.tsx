'use client'
import { List } from "../src/ui/components/organisms/list";
import { Suspense } from "react";
import ThemeButton from "@ui/components/molecules/theme-button";
import Pagination from "@ui/components/organisms/pagination";
import CardLoadingSkeleton from "@ui/components/organisms/card/card-loading-skeleton";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const page = searchParams['page'] ?? '1'
  const per_page = searchParams['per_page'] ?? '20'
  const start = (Number(page) - 1) * Number(per_page)

  return (
    <main className="bg-bkg">
      <Suspense fallback={<div style={{color: 'white'}}>loading...</div>}>
      <ThemeButton />
      </Suspense>
      <Suspense fallback={<CardLoadingSkeleton/>}>
        <List />
        <Pagination   
        hasNextPage={true}
        hasPrevPage={start > 0}
        />
        </Suspense>
  </main>
  );
}