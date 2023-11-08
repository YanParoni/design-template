'use client'
import React, { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import Filter from './filters';
import SeuComponente from './searchIcon';
import { useFilterStore } from 'client/store';
import { useSearchGames } from '@ui/queries/games';

const SearchInput: React.FC = () => {
  const { search, setSearch, resetFilters } = useFilterStore();
  const [isFocused, setIsFocused] = useState(false);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const { refetch } = useSearchGames()

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };

  const handleFilterOpen = (): void => {
    setFilterOpen(!isFilterOpen);
  };

  const handleSearchClick = () => {
    resetFilters()
    refetch();
  }

  return (
    <div className='flex justify-center w-full gap-4 '>
      <div className='relative flex items-center w-full h-12 gap-4 px-2 mx-16 rounded-lg md:w-5/12 bg-bkg-chat'>
        <MagnifyingGlassIcon
          onClick={handleSearchClick}
          className='cursor-pointer' width={24} height={24} />
        <div className='flex flex-col w-full'>
          <div className='relative flex flex-row'>
            <input
              className='w-full bg-transparent outline-none focus:border-none'
              type='text'
              placeholder='Search'
              value={search}
              onChange={handleInputChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <div onClick={handleFilterOpen} className="cursor-pointer items-center w-[1.9rem] h-[1.9rem]  hover:scale-110 transition-transform duration-200 ease-in-out">
              <SeuComponente isAnimationActive={isFilterOpen} />
            </div>
            <Filter
              isFilterOpen={isFilterOpen}
            />
          </div>
          {isFocused && (
            <motion.div
              initial={{ width: 0, left: 0 }}
              animate={{ width: '95%', left: 0 }}
              exit={{ width: 0, left: '50%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className='w-full bg-purple-600 h-[2px] '
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
