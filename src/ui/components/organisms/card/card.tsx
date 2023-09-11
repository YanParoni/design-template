import React  from 'react';
import ScoreDisplay from '../../molecules/score';
import Link from 'next/link';
import Image from 'next/image';
import { Subheading } from '../../atoms/subheading';
import CardInfoContainer from '../../atoms/card-info-container';
import ShadowEffect from '../../atoms/shadow-effect';
import Metacritic from '../../../../../public/metacritic.svg'
interface ICard {
  id: string;
  imageUrl: string;
  percentage: number;
  name: string;
  height: string;
  width: string;
  dir: string
}

const Card = ({ id, imageUrl, percentage, name ,width, height,dir}: ICard) => {
  return (
    <div className={`flex flex-${dir} gap-2`}>
      <Link
        href={{
          pathname: `profile/${id}`,
          query: { id: id },
        }}
      >
        <div 
          className={`relative ${width} ${height} flex
           flex-row  justify-center 
           overflow-hidden rounded 
           cursor-pointer bg-gray-900 
           hover:scale-105 transition-transform
           duration-200 ease-in-out
           shadow-md hover:shadow-lg`}
        >
          <Image
            src={imageUrl}
            alt="Card"
            layout='fill'
            objectFit='cover'
          />
          <ShadowEffect/>
        </div>
      </Link>
      <CardInfoContainer width={width} dir={dir}>
  
        <Subheading text={name} />
        <div className='flex shrink-0 justify-between'>
        <Image src={Metacritic} alt="Card"
            width={30}
            height={30}
             />
        <ScoreDisplay percentage={percentage} />
        </div>
      </CardInfoContainer>
    </div>
  );
};

export default Card;
