import React, { useState } from 'react';
import ScoreDisplay from '../molecules/score';
import Link from 'next/link';
import Image from 'next/image';
import { Label } from '../atoms/label';
import { Subheading } from '../atoms/subheading';
import CardInfoContainer from '../atoms/card-info-container';
import ShadowEffect from '../atoms/shadow-effect';
interface ICard {
  id: string;
  imageUrl: string;
  percentage: number;
  name: string;
}

const Card = ({ id, imageUrl, percentage, name }: ICard) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="basis-1/5">
      <Link
        href={{
          pathname: `profile/${id}`,
          query: { id: id },
        }}
      >
        <div 
          className="relative w-56 h-72 flex flex-col justify-center overflow-hidden rounded cursor-pointer bg-gray-900 hover:scale-105 transition-transform duration-200 ease-in-out shadow-md hover:shadow-lg"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={imageUrl}
            alt="Card"
            layout='fill'
            objectFit='cover'
          />
          <ShadowEffect/>
          {isHovered && <ScoreDisplay percentage={percentage} />}
        </div>
      </Link>
      <CardInfoContainer>
        <Label text='Title'/>
        <Subheading text={name} />
      </CardInfoContainer>
    </div>
  );
};

export default Card;
