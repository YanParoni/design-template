'use client'
import * as React from 'react';
import Card from '@ui/components/organisms/card/card';
import { motion } from 'framer-motion';
import SkeletonContainer from '@app/loading';
import { useSearchGames } from "@ui/queries/games";

export function List() {
  const {isLoading,data} = useSearchGames()
  if (isLoading) return <SkeletonContainer/>;
  
  return (
    <div className='flex flex-col justify-center'>
    <motion.div 
    className='flex flex-col flex-wrap content-center justify-center p-20 w-100 gap-11 gap-y-12 md:flex-row'
    initial={{opacity: 0, y: 30}} 
    animate={{opacity: 1, y:0}} 
    exit={{opacity: 0, y: 30}}
    >
       {data.results && data.results.map((item: any)=> { 
        return(
          <Card
          key={item.id}
          id={item.id}
          imageUrl={item.background_image}
          name={item.name}
          percentage={item.metacritic}
          width='w-72'
          height='h-60'
          dir='col'
          {...item}
          />
      )})}   
    </motion.div>
     </div>
  );
}
