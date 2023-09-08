import React from 'react';

interface ICardInfoContainerProps {
  children: React.ReactNode;
  width: string
  dir: string
}

const CardInfoContainer: React.FC<ICardInfoContainerProps> = ({ children, width, dir }) => {
  const flexDirection = dir ==='col'? 'row':'col'
  return (
    <div className={`flex flex-${flexDirection} justify-between gap-2 mt-3 items-center ${width}`}>
      {children}
    </div>
  );
};

export default CardInfoContainer;
