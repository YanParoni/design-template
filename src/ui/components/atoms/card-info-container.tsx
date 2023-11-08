import React from 'react';

interface ICardInfoContainerProps {
  children: React.ReactNode;
  width: string
  dir: string
}

const CardInfoContainer: React.FC<ICardInfoContainerProps> = ({ children, width, dir }) => {
  return (
    <div className={`flex flex-${dir} justify-between gap-2 py-4 px-2 items-center ${width}`}>
      {children}
    </div>
  );
};

export default CardInfoContainer;
