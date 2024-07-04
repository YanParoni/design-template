import './styles.css';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ShadowEffect from '../../atoms/shadow-effect';
import CardActions from '@ui/components/molecules/card/card-actions';
import { useAuthStore } from 'client/store';

interface ICard {
  id: string;
  imageUrl: string;
  name: string;
  height: string;
  dir: string;
  rating: number;
  liked?: boolean;
  played?: boolean;
  isLarge: boolean;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_REACT_APP === 'production'
    ? 'https://design-template-ivory.vercel.app'
    : 'http://localhost:3001';

const Card = React.memo(
  ({
    id = '',
    imageUrl = '',
    name = '',
    height,
    dir,
    rating,
    liked,
    played,
    isLarge,
  }: ICard) => {
    const [hovered, setHovered] = useState(false);
    const { isAuthenticated } = useAuthStore();
    const [isPlayed, setIsPlayed] = useState(played);

    useEffect(() => {
      setIsPlayed(played);
    }, [played]);

    return (
      <>
        <div
          className={`flex flex-${dir} cursor-pointer gap-2 rounded-[4px] relative ring-1 ring-inset ${
            isAuthenticated
              ? isPlayed
                ? 'hover:ring-accent-theme'
                : 'hover:ring-white/80'
              : 'hover:ring-accent-theme'
          } lg:ring-[1px] hover:ring-2 hover:ring-inset ring-white/10`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {hovered && (
            <div className="speech down">
              <div className="flex flex-row items-center gap-1">
                <p className="font-normal">{name}</p>
                <p className="font-bold">{rating}</p>
              </div>
            </div>
          )}
          {isAuthenticated && (
            <CardActions
              hovered={hovered}
              liked={liked}
              setIsPlayed={setIsPlayed}
              played={isPlayed}
              gameId={id}
              isLarge={isLarge}
            />
          )}
          <Link
            as={{
              pathname: `${BASE_URL}/profile/${id}`,
              query: { name },
            }}
            href={{
              pathname: `${BASE_URL}/profile/${id}`,
              query: { name },
            }}
          >
            <div
              className={`relative w-full ${height} rounded-[4px] flex flex-row justify-center overflow-hidden border-2 border-[transparent]`}
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={`${name}-thumb`}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                />
              ) : (
                <></>
              )}
              <ShadowEffect />
            </div>
          </Link>
        </div>
      </>
    );
  }
);

Card.displayName = 'Card';

export default Card
