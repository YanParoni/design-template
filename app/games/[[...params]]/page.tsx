'use client';
import React from 'react';
import List from '@ui/components/organisms/list';
import FiltersAndVisualization from '@ui/components/organisms/filters';
import useUrlSync from '@ui/hooks/use-sync-url';

const GamesPage = () => {
  const loading = useUrlSync();

  if (loading) return <div>Loading...</div>;
  
  return (
    <>
      <FiltersAndVisualization />
      <List />
    </>
  );
};

export default GamesPage;
