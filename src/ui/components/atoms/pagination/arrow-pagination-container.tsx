'use client'
import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useRouter, useSearchParams } from 'next/navigation'
import { usePaginationStore,useGameStore } from 'client/store';
import { motion } from 'framer-motion';

interface ArrowPaginationContainerProps {
  children: React.ReactNode
}

const scaleVariants = {
  hover: {
    scale: 1.3,
    transition: { duration: 0.3 },
  },
};

export function ArrowPaginationContainer({ children }: ArrowPaginationContainerProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const count = useGameStore().games.count;
  const nextPage = usePaginationStore.getState().currentPage
  const page = parseInt(searchParams.get('page') || '1', 10);

  const totalPages = Math.ceil(count /20);


  const isAtFirstPage = page <= 1;
  const isAtLastPage = page >= totalPages;

  return (
    <div className='flex flex-row gap-4'>
      {!isAtFirstPage && (
        <motion.div
          whileHover="hover"
          variants={scaleVariants}
        >
          <ChevronLeftIcon
            className="h-8 cursor-pointer fill-purple-600 stroke-purple-600"
            onClick={() => {
              router.push(`/?page=${page - 1}`);
            }}
          />
        </motion.div>
      )}
      {children}
      {!isAtLastPage && (
        <motion.div
          whileHover="hover"
          variants={scaleVariants}
        >
          <ChevronRightIcon
            className="h-8 cursor-pointer fill-purple-500 stroke-purple-500"
            onClick={() => {
              if (nextPage === page) return;
              router.push(`/?page=${page + 1}`);
            }}
          />
        </motion.div>
      )}
    </div>
  )
}
