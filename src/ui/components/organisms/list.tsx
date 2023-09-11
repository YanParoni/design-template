'use client'
import * as React from 'react';
import { iocContainer } from '../../../ioc';
import { IGamesGateway } from '@infra/gateways/contracts/games';
import { useQuery } from "@tanstack/react-query";
import Card from '@ui/components/organisms/card/card';
import { motion } from 'framer-motion';
import { useGameStore, usePaginationStore } from 'client/store';
import { useSearchParams } from 'next/navigation';
import SkeletonContainer from '@app/loading';

async function getGames(currentPage: string) {
  const gateway = iocContainer.get<IGamesGateway>('GamesGateway');
   const response = await gateway.getGames(currentPage)
   useGameStore.getState().setGames(response)
   return response
}

export function List() {
  const searchParams = useSearchParams()
  
  const page = searchParams.get('page') ?? '1'
  const {  data, isLoading, error } = useQuery({
    queryKey: ["getGames", page],
    queryFn: () => getGames(page),
    refetchOnWindowFocus:false,
    refetchOnMount:false
  });
  if (isLoading) return <SkeletonContainer/>;
  if (error) return "An error has occurred: " + error.message;
  usePaginationStore.getState().setCurrentPage(data.next)
  return (
    <div className='flex flex-col justify-center'>
    <motion.div 
    className='flex flex-wrap w-100 justify-center content-center flex-col gap-11 gap-y-12 md:flex-row p-20'
    initial={{opacity: 0, y: 30}} 
    animate={{opacity: 1, y:0}} 
    exit={{opacity: 0, y: 30}}
    >
       {data  && data.games.map((item: any)=> { 
        return(
          <Card
          key={item.id}
          id={item.id}
          imageUrl={item.background_image}
          name={item.name}
          percentage={item.metacritic}
          width='w-72'
          height='h-72'
          dir='col'
          {...item}
          />
      )})}  
    </motion.div>
     </div>
  );
}
