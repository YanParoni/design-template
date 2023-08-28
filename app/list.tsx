'use client'
import * as React from 'react';
import { useGetGames } from '@ui/queries/games';
import { Suspense } from "react";
import Card from '@ui/components/card';

export interface IListProps {
}

export function List(props: IListProps) {
  const { data, isSuccess } = useGetGames()
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '5rem', justifyContent: 'center', flexWrap: 'wrap', width: '80%' }}>

          {data && data.games.map((item: any) => (
            <Card key={item.id} imageUrl={item.background_image} name={item.name} percentage={item.metacritic} />
          ))}

        </div>
  );
}
