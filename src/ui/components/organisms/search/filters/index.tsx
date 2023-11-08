import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import FilterItem from '@ui/components/molecules/search/filters/filter-item'
import GenreContent from '@ui/components/atoms/search/filter/genre-filter-content'
import RatingContent from '@ui/components/atoms/search/filter/rating-filter-content'
import PlatformFilterContent from '@ui/components/atoms/search/filter/platform-filter-content'
import SortFilterSelector from '@ui/components/molecules/search/filters/sort-filter-selector'
import Sort from '@ui/components/molecules/search/filters/sort'
import { useSearchGames } from '@ui/queries/games'
import { useRouter } from 'next/navigation'
import { useFilterStore } from 'client/store'

type Props = {
  isFilterOpen: boolean
}
enum Options {
  Filter,
  Sort,
}

export default function Filter({ isFilterOpen }: Props) {
  const router = useRouter()
  const { refetch } = useSearchGames()
  const reset = useFilterStore().resetFilters
  const [selectedItem, setSelectedItem] = useState<Options>(Options.Filter)

  const handleItemClick = (item: Options) => {
    setSelectedItem(item);
  }

  const handleSearch = async () => {
    router.push('/')
    refetch()
  };

  return (
    <AnimatePresence>
      {isFilterOpen &&
        <motion.div
          key='hero'
          initial={{ height: 0, overflow: 'hidden' }}
          animate={{ height: 'auto', }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className='absolute  flex flex-col cursor-pointer w-[10rem] md:w-72  right-[-2rem] justify-center rounded-md top-12 z-30 bg-bkg-chat backdrop-blur-lg border-purple-500 border-[1px]  shadow-shadow shadow-md '>
          <SortFilterSelector select={handleItemClick} selectedOption={selectedItem} />
          <div
            className='flex flex-row  relative w-[20rem] md:w-[36rem]'
          >
            <motion.div
              animate={{ x: selectedItem === Options.Filter ? 0 : '-100%', opacity: selectedItem === Options.Filter ? 1 : 0 }}
              transition={{ duration: .5, ease: 'easeIn' }}
              className='flex flex-col w-full'>
              <FilterItem title='Genres'>
                <GenreContent />
              </FilterItem>
              <FilterItem title='Metacritic'>
                <RatingContent
                />
              </FilterItem>
              <FilterItem title='Platforms'>
                <PlatformFilterContent />
              </FilterItem>
            </motion.div>
            <motion.div
              transition={{ duration: .5, ease: 'easeIn', }}
              animate={{ x: selectedItem === Options.Sort ? '-100%' : 0, opacity: selectedItem === Options.Sort ? 1 : 0 }}
              className='flex flex-col w-full'>
              <FilterItem title='sort'>
                <Sort />
              </FilterItem>
            </motion.div>
          </div>
          <div className='flex justify-center '>
            <button
              onClick={()=>reset()}
              className='w-full py-2 text-purple-500 border-b-2 border-purple-700 shadow-lg bg-primary-color align-self active:border-purple-500 active:bg-primary-color/80'
            >
              Clear Filters
            </button>
            <button
              onClick={handleSearch}
              className='w-full py-2 text-white bg-purple-500 border-b-2 border-purple-700 shadow-lg align-self bg-purple-330 active:bg-purple-700 active:border-purple-500'>
              Search
            </button>
          </div>
        </motion.div>
      }
    </AnimatePresence>

  )
}


