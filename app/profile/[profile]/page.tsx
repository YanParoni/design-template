'use client'
import * as React from 'react';
import {motion} from 'framer-motion'
import { useGameStore } from 'client/store';
interface IAppProps {
    params:any
    searchParams: any
}

const GameProfile = ({params, searchParams}:IAppProps) => {
  const {getGameById }= useGameStore()
  const game = getGameById(+params.profile)
  return <div   style={{color: 'white'}}>oi</div>;
};

export default GameProfile;
