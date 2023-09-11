'use client'
import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useRouter, useSearchParams } from 'next/navigation'
import { usePaginationStore } from 'client/store';
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
  const nextPage = usePaginationStore.getState().currentPage
  const page = searchParams.get('page') ?? '1'
  return (
    <div className='flex flex-row gap-4'>
      <motion.div
        whileHover="hover"
        variants={scaleVariants}
      >
        <ChevronLeftIcon className=" h-8 fill-purple-600 stroke-purple-600 cursor-pointer " onClick={() => {
          if (+page < 2) return
          router.push(`/?page=${Number(page) - 1}`)
        }}
        />
      </motion.div>
      {children}
      <motion.div
        whileHover="hover"
        variants={scaleVariants}
        >
        <ChevronRightIcon className=" h-8 fill-purple-500 stroke-purple-500 cursor-pointer" onClick={() => {
          if(nextPage===+page) return 
          router.push(`/?page=${Number(page) + 1}`)
        }
        } />
      </motion.div>
    </div>
  )
}
