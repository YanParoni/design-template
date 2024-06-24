import React from 'react';
import ScoreDisplay from '../../molecules/score';
import Link from 'next/link';
import Image from 'next/image';
import { Subheading } from '../../atoms/subheading';
import CardInfoContainer from '../../atoms/card-info-container';
import ShadowEffect from '../../atoms/shadow-effect';

interface ICard {
  id: string;
  imageUrl: string;
  percentage: number;
  name: string;
  height: string;
  width: string;
  dir: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP === 'production' ? 'https://design-template-ivory.vercel.app' : 'http://localhost:3000';

const Card = ({ id, imageUrl, percentage, name, width, height, dir }: ICard) => {
  return (
    <div className={`flex flex-${dir} cursor-pointer gap-2 rounded-[2px] border-2 border-[transparent] hover:border-[#dd00da] `}>
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
        <div className={`relative ${width} ${height} rounded-[2px] flex flex-row justify-center overflow-hidden `}>
        <Image
            src={imageUrl}
            alt={`${name}-thumb`}
            layout="fill"
            objectFit="cover"
            quality={100}
            className=""
          />          <ShadowEffect />
        </div>
      </Link>
    </div>
  );
};

export default Card;
