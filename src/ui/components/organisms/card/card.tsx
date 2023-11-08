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
  dir: string
}
const BASE_URL = process.env.NEXT_PUBLIC_REACT_APP === 'production' ? 'https://design-template-ivory.vercel.app' : 'http://localhost:3000'

const Card = ({ id, imageUrl, percentage, name, width, height, dir }: ICard) => {
  return (
    <div className={`flex flex-${dir} cursor-pointer gap-2  bg-bkg-chat/70  rounded-lg  backdrop-blur-sm  shadow-md hover:shadow-lg   hover:scale-105 transition-transform duration-200 ease-in-out `}>
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
          className={`relative ${width} ${height} flex
           flex-row  justify-center 
           overflow-hidden 
           rounded-t-lg
          `}
        >
          <Image
            style={{objectFit: 'cover'}}
            src={imageUrl}
            alt={`${name}-thumb`}
            sizes="((max-width: 600px) 300px, 700px)"
            fill={true}
            priority
          />
          <ShadowEffect />
        </div>
      </Link>
      <CardInfoContainer width={width} dir='col'>
        <Subheading text={name} />
        <div className='flex justify-between shrink-0'>
          <ScoreDisplay percentage={percentage} />
        </div>
      </CardInfoContainer>
    </div>
  );
};

export default Card;
