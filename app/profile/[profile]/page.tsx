'use client'
import * as React from 'react';
import { useGameStore } from 'client/store';
interface IAppProps {
    searchParams: any
}

const GameProfile = ({ searchParams }:IAppProps) => {
  const {getGameById,games }= useGameStore()
  const game = getGameById(+searchParams.id)
  console.log(game, searchParams,games)
  return <div  className='text-primary-color'>{JSON.stringify(game)}</div>;
};

export default GameProfile;
