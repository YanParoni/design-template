import { List } from "../src/ui/components/organisms/list";
import { Suspense } from "react";
import ThemeButton from "@ui/components/molecules/theme-button";

export default function Home() {
  return (
    <main className="bg-bkg">
      <Suspense fallback={<div style={{color: 'white'}}>loading...</div>}>
      <ThemeButton />
      </Suspense>
      <Suspense fallback={<div style={{color: 'white'}}>loading...</div>}>
        <List/>
        </Suspense>
  </main>
  );
}