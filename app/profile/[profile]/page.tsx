'use client'
import * as React from 'react';
import { useGameStore } from 'client/store';
interface IAppProps {
    searchParams: any
}

const GameProfile = ({ searchParams }:IAppProps) => {
  const {getGameById}= useGameStore()
  const game = getGameById(+searchParams.id)
  return <div  className='text-primary-color'>{JSON.stringify(game)}</div>;
};

export default GameProfile;
