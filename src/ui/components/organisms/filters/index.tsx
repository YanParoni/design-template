'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFilterStore, usePaginationStore } from 'client/store';
import LayoutSelector from '@ui/components/atoms/filters/layout-selector';
import Dropdown from '@ui/components/atoms/filters/dropdown';
import mockedGenres from '@ui/utils/mock-genres'
import mockedPlatforms from '@ui/utils/mock-platforms';
import mockedStores from '@ui/utils/mock-stores';

const FiltersAndVisualization: React.FC = () => {
  const { search, setSearch, resetFilters, genres, platforms, stores } = useFilterStore();
  const { currentPage, pageSize, setPageSize } = usePaginationStore();

  const router = useRouter();

  useEffect(() => {
    const query = {
      genres: genres.join(','),
      platforms: platforms.join(','),
      stores: stores.join(','),
      search: search,
      page: currentPage.toString(),
      page_size: pageSize.toString(),
    };

    const queryString = new URLSearchParams(query).toString();
    router.replace(`?${queryString}`);
  }, [genres, platforms, stores, search, currentPage, pageSize, router]);

  return (
    <div className='flex justify-between items-center w-full pt-2  border-b' style={{ borderBottomColor: '#624466' }}>
      <p className='font-montserrat font-semibold text-[#ab96b7] text-[13px] '>GAMES</p>
      <div className='flex gap-2'>
        <Dropdown
        label='GENRES'
        options={mockedGenres}
        onSelect={()=>console.log('hello')}
        />
           <Dropdown
        label='PLATFORMS'
        options={mockedPlatforms}
        onSelect={()=>console.log('hello')}
        />
                  <Dropdown
        label='STORES'
        options={mockedGenres}
        onSelect={()=>console.log('hello')}
        />
        <LayoutSelector />
      </div>
    </div>
  );
};

export default FiltersAndVisualization;
