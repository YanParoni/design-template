import { List } from "../src/ui/components/organisms/list";
import { Suspense } from "react";
import ThemeButton from "@ui/components/molecules/theme-button";
import Pagination from "@ui/components/organisms/pagination";
import CardLoadingSkeleton from "@ui/components/organisms/card/card-loading-skeleton";
import SearchInput from "@ui/components/organisms/search";

export default function Home() {
  return (
    <main className="bg-bkg">
        <ThemeButton />
        <SearchInput/>
      <Suspense fallback={<CardLoadingSkeleton />}>
        <List />
        <Pagination
        />
      </Suspense>
    </main>
  );
}