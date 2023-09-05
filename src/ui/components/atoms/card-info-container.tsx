import React from 'react';

interface ICardInfoContainerProps {
  children: React.ReactNode;
}

const CardInfoContainer: React.FC<ICardInfoContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col mt-2 w-56">
      {children}
    </div>
  );
};

export default CardInfoContainer;
