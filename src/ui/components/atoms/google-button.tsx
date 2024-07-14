import React from "react";
import Image from "next/image";

interface GoogleButtonProps {
  onClick: () => void;
}
const GoogleButton: React.FC<GoogleButtonProps> = ({ onClick }) => {
  return (
    <button
      className="grid h-[32px] min-w-[57px] grid-cols-[auto,1fr] gap-2 rounded-[3px] border-t-[1px] border-t-[#584a66] bg-secondary-bkg px-2 py-[6px] font-montserrat text-[12px] text-description shadow-[inset_0_1px_0_hsla(0,0%,100%,.05)] hover:bg-secondary-comp hover:text-comp-description"
      onClick={onClick}
    >
      <div className="flex items-center justify-center">
        <Image
          src={`/google-icon.png`}
          alt="google icon"
          width="14"
          height="14"
        />
      </div>
      <span className="self-center">Continue with Google</span>
    </button>
  );
};

export default GoogleButton;
