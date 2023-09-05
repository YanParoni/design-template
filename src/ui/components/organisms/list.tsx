'use client'
import * as React from 'react';
import { iocContainer } from '../../../ioc';
import { IGamesGateway } from '@infra/gateways/contracts/games';
import { useQuery } from "@tanstack/react-query";
import Card from '@ui/components/organisms/card';
import { motion } from 'framer-motion';
import { useGameStore } from 'client/store';

async function getGames() {
  const gateway = iocContainer.get<IGamesGateway>('GamesGateway');
   const response = await gateway.getGames()
   useGameStore.getState().setGames(response)
   return response
}

export function List() {

  const {  data, isLoading, error } = useQuery({
    queryKey: ["getGames"],
    queryFn: () => getGames(),
  });
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y:0}} exit={{opacity: 0, y: 30}} id='oi' className='flex flex-wrap justify-center content-center flex-col gap-10 md:flex-row p-20'>
       {data  && data.games.map((item: any)=> { 
        return(
          <Card
          key={item.id}
          id={item.id}
          imageUrl={item.background_image}
          name={item.name}
          percentage={item.metacritic}
          {...item}
          />
      )})} 
    </motion.div>
  );
}
