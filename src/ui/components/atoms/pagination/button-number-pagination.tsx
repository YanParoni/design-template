import * as React from 'react';
import {  useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface BtnNumberPaginationProps {
  title: number;
  isActive: boolean;
}

export function BtnNumberPagination({ title, isActive }: BtnNumberPaginationProps) {
  const router = useRouter()

  const selected = isActive
    ? 'rounded-full bg-purple-500 w-8 h-8 cursor-pointer text-center'
    : 'rounded-full hover:bg-gray-400 w-8 h-8 cursor-pointer text-center '

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
      onClick={() => router.push(`/?page=${Number(title)}`)}
    >
      <button className='font-medium text-center text-primary-color text-md'>
        {title}
      </button>
    </motion.div>
  );
}
