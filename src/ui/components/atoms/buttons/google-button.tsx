import React from "react";
import Image from "next/image";

interface GoogleButtonProps {
  onClick: () => void;
  variant?: "primary" | "secondary";
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ onClick, variant = "primary" }) => {
  const baseStyles = "flex items-center justify-center w-full h-[32px] min-w-[57px] gap-2 rounded-[3px] px-2 py-[6px] font-montserrat shadow-[inset_0_1px_0_hsla(0,0%,100%,.05)]";
  const primaryStyles = "border-t-secondary-border text-[12px] bg-secondary-bkg text-description hover:bg-secondary-comp hover:text-comp-description border-t-[1px]";
  const secondaryStyles = "text-dark-purple text-[12px] bg-light-purple ";

  const buttonStyles = variant === "secondary" ? secondaryStyles : primaryStyles;

  return (
    <button
      className={`${baseStyles} ${buttonStyles}`}
      onClick={onClick}
    >
      <Image
        src={`/google-icon.png`}
        alt="google icon"
        width="16"
        height="16"
        quality={100}
      />
      <span>Continue with Google</span>
    </button>
  );
};

export default GoogleButton;
