'use client';
import React from 'react';
import useDeviceDetect from '@ui/hooks/use-device-detect';
import Logo from '@ui/components/atoms/logo';
import useFetchProfile from '@ui/hooks/use-cases/use-fetch-profile';
import ExpandedContent from '@ui/components/molecules/navbar/expanded-content';
import DesktopContent from '@ui/components/molecules/navbar/desktop-content';
import MobileContent from '@ui/components/molecules/navbar/mobile-content';

const Navbar: React.FC = () => {
  const { isMobile } = useDeviceDetect();
  useFetchProfile();

  return (
    <header className="bg-dark-background text-primary-color flex flex-col items-center">
      <nav className="max-w-[960px] w-full px-4 md:px-0 bg-dark-background h-[72px] flex items-center">
        <div className="flex justify-between items-center w-full">
          <Logo />
          <div className="flex space-x-4">
            {isMobile ? (
              <MobileContent  />
            ) : (
              <DesktopContent  />
            )}
          </div>
        </div>
      </nav>
      <ExpandedContent />
    </header>
  );
};

export default Navbar;
