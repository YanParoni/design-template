import * as React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface BtnNumberPaginationProps {
    title: number;
}

export function BtnNumberPagination ({title}: BtnNumberPaginationProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const page = searchParams.get('page') ?? '1'
  const selected = +page === title ? 'rounded-full  bg-purple-500 w-8 h-8 cursor-pointer text-center': 'rounded-full hover:bg-gray-400 w-8 h-8 cursor-pointer text-center '
  
  const hoverVariants = {
    hover: {
      y: -5, 
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div 
    className={selected}
    whileHover="hover"
    variants={hoverVariants}
    onClick={()=>router.push(`/?page=${Number(title)}`)}
    >
      <button  className='text-primary-color text-center text-md font-medium'>
      {title}
      </button>
    </motion.div>
  );
}
