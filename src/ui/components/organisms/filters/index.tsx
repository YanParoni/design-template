'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFilterStore, usePaginationStore } from 'client/store';
import LayoutSelector from '@ui/components/atoms/filters/layout-selector';
import Dropdown from '@ui/components/molecules/dropdown';
import mockedGenres from '@ui/utils/mock-genres';
import mockedPlatforms from '@ui/utils/mock-platforms';
import mockedStores from '@ui/utils/mock-stores';
import SearchInput from '@ui/components/atoms/search-input';

const getAliasByValue = (value, options) => {
  const option = options.find((option) => option.value === value);
  return option ? option.alias : '';
};

const FiltersAndVisualization: React.FC = () => {
  const { genre, platform, store,search, setGenre, setPlatform, setStore, setSearch, resetFilters } = useFilterStore();
  const { currentPage, pageSize, setCurrentPage, setPageSize } = usePaginationStore();
  const [searchTerm, setSearchTerm] = useState(search);
  const router = useRouter();

  const handleSearch = () => {
    resetFilters();
    setCurrentPage(1);
    setPageSize(40); 
    setSearch(searchTerm);
  };

  useEffect(() => {
    const parts = [
      'games',
      'genre', genre ? getAliasByValue(genre, mockedGenres) : 'any',
      'platform', platform ? getAliasByValue(platform, mockedPlatforms) : 'any-platform',
      'store', store ? getAliasByValue(store, mockedStores) : 'any-store',
      'size', pageSize === 40 ? 'large' : 'small',
      'page', currentPage.toString(),
    ];

    if (search) {
      parts.push('search', search);
    }

    router.replace(`/${parts.join('/')}`);
  }, [genre, platform, store, currentPage, pageSize, search, router]);

  return (
    <div className='flex justify-between items-center w-full pt-2 pb-1 border-b border-b-tertiary-bkg' style={{ borderBottomColor: '#624466' }}>
      <p className='font-montserrat font-semibold text-description text-[13px]'>GAMES</p>
      <div className='flex gap-2'>
        <SearchInput onChange={(evt)=> setSearchTerm(evt.target.value)} onClick={handleSearch}/>
        <Dropdown
          label='GENRES'
          options={mockedGenres}
          onSelect={(value) => setGenre(value)}
          selectedValue={genre}
        />
        <Dropdown
          label='PLATFORMS'
          options={mockedPlatforms}
          onSelect={(value) => setPlatform(parseInt(value))}
          selectedValue={platform}

        />
        <Dropdown
          label='STORES'
          options={mockedStores}
          onSelect={(value) => setStore(parseInt(value))}
          selectedValue={store}
        />
     
        <LayoutSelector />
      </div>
    </div>
  );
};

export default FiltersAndVisualization;
