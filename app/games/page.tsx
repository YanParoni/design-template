'use client';
import React, { useEffect } from 'react';
import { useFilterStore } from 'client/store';
import { List } from '@ui/components/organisms/list';
import FiltersAndVisualization from '@ui/components/organisms/filters';

const GamesIndexPage = () => {
  const filterStore = useFilterStore();

  useEffect(() => {
    filterStore.resetFilters();
  }, []);

  return (
    <main>
      <FiltersAndVisualization />
      <List />
    </main>
  );
};

export default GamesIndexPage;
