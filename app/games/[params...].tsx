'use client'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useFilterStore } from 'client/store';
import { List } from '@ui/components/organisms/list';
import mockedPlatforms from '@ui/utils/mock-platforms';
import mockedGenres from '@ui/utils/mock-genres';
import mockedStores from '@ui/utils/mock-stores';
import FiltersAndVisualization from '@ui/components/organisms/filters';

const GamesPage = () => {
  const router = useRouter();
  const { params = [] } = router.query;
  const filterStore = useFilterStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const paramsMap = new Map();
    for (let i = 0; i < params.length; i += 2) {
      paramsMap.set(params[i], params[i + 1]);
    }

    const genres = paramsMap.has('genre') ? [paramsMap.get('genre')] : [];
    const platforms = paramsMap.has('platform')
      ? [mockedPlatforms.find(p => p.alias === paramsMap.get('platform'))?.value]
      : [];
    const stores = paramsMap.has('store') ? [paramsMap.get('store')] : [];

    filterStore.setGenres(genres.filter(Boolean));
    filterStore.setPlatforms(platforms.filter(Boolean));
    filterStore.setStores(stores.filter(Boolean));

    setLoading(false);
  }, [params]);

  if (loading) return <div>Loading...</div>;

  return <main>      
  <FiltersAndVisualization />
  <List />
</main>;
};

export default GamesPage;
