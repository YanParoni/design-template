import React from 'react';
import Image from 'next/image'
interface GoogleButtonProps{
  onClick: (e: React.MouseEvent) => void;
}
const GoogleButton: React.FC<GoogleButtonProps> = ({onClick}) => {
  
  return (
    <button
      className='flex flex-row h-[32px] font-montserrat border-t-2 border-t-[#584a66]  min-w-[57px] gap-2 rounded-[3px] py-[6px] px-2 shadow-[inset_0_1px_0_hsla(0,0%,100%,.05)] bg-secondary-bkg hover:bg-secondary-comp text-description hover:text-comp-description text-[12px]'
      onClick={onClick}
    >
      <Image src={`/google-icon.png`} alt='google icon' width="14" height="14" /> 
      Continue with Google
    </button>
  );
};

export default GoogleButton;
