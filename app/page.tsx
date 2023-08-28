'use client'
import { List } from "./list";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Suspense fallback={<div>loading..</div>}>
        <List />
      </Suspense>
    </div>
  );
}