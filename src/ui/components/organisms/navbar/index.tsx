"use client";
import React from "react";
import useDeviceDetect from "@ui/hooks/use-device-detect";
import Logo from "@ui/components/atoms/logo";
import useFetchProfile from "@ui/hooks/use-cases/use-fetch-profile";
import ExpandedContent from "@ui/components/molecules/navbar/expanded-content";
import DesktopContent from "@ui/components/molecules/navbar/desktop-content";
import MobileContent from "@ui/components/molecules/navbar/mobile-content";

const Navbar: React.FC = () => {
  const { isMobile } = useDeviceDetect();
  useFetchProfile();

  return (
    <header className="flex flex-col items-center bg-dark-background text-primary-color">
      <nav className="flex h-[40px] w-full max-w-[960px] items-center bg-dark-background px-4 md:px-0 lg:h-[72px]">
        <div className="flex w-full items-center justify-between">
          <Logo />
          <div className="flex space-x-4">
            {isMobile ? <MobileContent /> : <DesktopContent />}
          </div>
        </div>
      </nav>
      <ExpandedContent />
    </header>
  );
};

export default Navbar;
