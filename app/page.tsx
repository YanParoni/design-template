'use client'
import { List } from "./list";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<Loading/>}>
        <List />
      </Suspense>
    </div>
  );
}