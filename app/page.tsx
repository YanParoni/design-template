import { List } from '../src/ui/components/organisms/list';
import { Suspense } from 'react';
import CardLoadingSkeleton from '@ui/components/organisms/card/card-loading-skeleton';
import FiltersAndVisualization from '@ui/components/organisms/filters';

export default function Home() {
  return (
    <main>
      <FiltersAndVisualization />
      <Suspense fallback={<CardLoadingSkeleton />}>
        <List />
      </Suspense>
    </main>
  );
}
