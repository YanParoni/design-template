'use client'
import Link from "next/link";
import { List } from "./list";
import { Suspense } from "react";
import dynamic from 'next/dynamic'

export default function Home() {
  return (
    <div>
            <Suspense fallback={<div>loading..</div>}>

 
      <List/>

      </Suspense>
      </div>

  );
}