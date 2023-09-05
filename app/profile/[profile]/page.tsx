'use client'
import * as React from 'react';
import { useGameStore } from 'client/store';
interface IAppProps {
    params:any
    searchParams: any
}

const GameProfile = ({params, searchParams}:IAppProps) => {
  const {getGameById }= useGameStore()
  console.log(params, searchParams, getGameById)
  return <div   style={{color: 'white'}}>oi</div>;
};

export default GameProfile;
