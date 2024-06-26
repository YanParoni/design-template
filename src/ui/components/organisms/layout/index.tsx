import React from 'react';

interface LayoutContainerProps {
  children: React.ReactNode;
}

const LayoutContainer: React.FC<LayoutContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen  bg-bkg text-primary-color flex justify-center">
      <div className="max-w-[960px] pt-7 w-full px-4 md:px-0">
        {children}
      </div>
    </div>
  );
};

export default LayoutContainer;
