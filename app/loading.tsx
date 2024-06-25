'use client'
import * as React from 'react';
import { motion } from 'framer-motion';
import CardLoadingSkeleton from '@ui/components/organisms/card/card-loading-skeleton';

const SkeletonContainer = () => {
  const skeletons = Array(20).fill(null); 
  return (
    <div className='flex flex-col justify-center'>
      <motion.div
        className='flex flex-wrap w-100 justify-center content-center flex-col gap-11 gap-y-12 md:flex-row p-20'
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
      >
        {skeletons.map((_, index) => (
          <CardLoadingSkeleton key={index} />
        ))}
      </motion.div>
    </div>
  );
};

export default SkeletonContainer;
