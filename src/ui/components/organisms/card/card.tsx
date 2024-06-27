import './styles.css';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ShadowEffect from '../../atoms/shadow-effect';

interface ICard {
  id: string;
  imageUrl: string;
  name: string;
  height: string;
  width: string;
  dir: string;
  rating: number;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_REACT_APP === 'production'
    ? 'https://design-template-ivory.vercel.app'
    : 'http://localhost:3000';

const Card = React.memo(
  ({ id='', imageUrl='', name='', width='', height, dir, rating }: ICard) => {
    const [hovered, setHovered] = useState(false);

    return (
      <>
        <div
          className={`flex flex-${dir} cursor-pointer gap-2 rounded-[3px] relative hover:ring-2  hover:ring-inset hover:ring-accent-theme `}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {hovered && (
            <div className="speech down">
              <div className="flex flex-row items-center gap-1">
                <p className="font-normal">
                  {name} 
                </p >
                <p className="font-bold">
                {rating}
                </p>
              </div>
            </div>
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
              className={` relative ${width} ${height} rounded-[4px] flex flex-row justify-center overflow-hidden border-2 border-[transparent] `}
            >
              {imageUrl ?
              <Image
                src={imageUrl}
                alt={`${name}-thumb`}
                layout="fill"
                objectFit="cover"
                quality={100}
                className=" "
              />: <></>
            }
              <ShadowEffect />
            </div>
          </Link>
        </div>
      </>
    );
  }
);

Card.displayName = 'Card';

export default Card;
