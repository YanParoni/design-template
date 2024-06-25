'use client';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useFilterStore, usePaginationStore } from 'client/store';
import List from '@ui/components/organisms/list';
import FiltersAndVisualization from '@ui/components/organisms/filters';
import mockedPlatforms from '@ui/utils/mock-platforms';
import mockedGenres from '@ui/utils/mock-genres';
import mockedStores from '@ui/utils/mock-stores';
import { buildUrl } from '@ui/components/atoms/filters/links';

const GamesPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const filterStore = useFilterStore();
  const paginationStore = usePaginationStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const paramsArray = pathname.split('/').slice(2); // Ignora "games"
    const params: Record<string, string> = {};

    for (let i = 0; i < paramsArray.length; i += 2) {
      params[paramsArray[i]] = paramsArray[i + 1];
    }

    const { genre, platform, store, size, page } = params;

    if (genre) {
      const genreObj = mockedGenres.find((g) => g.alias === genre);
      if (genreObj) filterStore.setGenre(genreObj.value);
    } else {
      filterStore.setGenre(null);
    }

    if (platform) {
      const platformObj = mockedPlatforms.find((p) => p.alias === platform);
      if (platformObj) filterStore.setPlatform(platformObj.value);
    } else {
      filterStore.setPlatform(null);
    }

    if (store) {
      const storeObj = mockedStores.find((s) => s.alias === store);
      if (storeObj) filterStore.setStore(storeObj.value);
    } else {
      filterStore.setStore(null);
    }

    if (size) {
      paginationStore.setPageSize(size === 'large' ? 40 : 12);
    }

    if (page) {
      paginationStore.setCurrentPage(Number(page));
    } else {
      paginationStore.setCurrentPage(1);
    }

    console.log('Processed params:', { genre, platform, store, size, page });
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      const filters = {
        genre: filterStore.genre,
        platform: filterStore.platform,
        store: filterStore.store,
        pageSize: paginationStore.pageSize,
        currentPage: paginationStore.currentPage,
      };

      const newUrl = buildUrl(filters);
      if (newUrl !== pathname) {
        router.replace(newUrl);
      }
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <main>
      <FiltersAndVisualization />
      <List />
    </main>
  );
};

export default GamesPage;
