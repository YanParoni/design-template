"use client";
import React from "react";
import useDeviceDetect from "@ui/hooks/use-device-detect";
import Logo from "@ui/components/atoms/logo";
import ExpandedContent from "@ui/components/molecules/navbar/expanded-content";
import DesktopContent from "@ui/components/molecules/navbar/desktop-content";
import MobileContent from "@ui/components/molecules/navbar/mobile-content";
import ProfileModal from "@ui/components/organisms/navbar/profile-modal";
import ResetPasswordModal from "@ui/components/molecules/navbar/reset-password-modal";

const Navbar: React.FC = () => {
  const { isMobile } = useDeviceDetect();

  return (
    <header className="flex flex-col items-center bg-dark-background text-primary-color">
      <nav className="flex min-h-[45px]  w-full max-w-[960px] items-center bg-dark-background px-4 md:px-0 lg:h-[80px]">
        <div className="flex w-full items-center justify-between pt-2 pb-2">
          <Logo />
          <div className="flex">
            {isMobile ? <MobileContent /> : <DesktopContent />}
          </div>
        </div>
      </nav>
      <ExpandedContent />
      <ProfileModal />
      <ResetPasswordModal />
    </header>
  );
};

export default Navbar;
