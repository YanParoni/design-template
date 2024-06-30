import React from 'react';
import Image from 'next/image'

const GoogleButton: React.FC = () => {
  const handleGoogleLogin = () => {
    const authWindow = window.open('http://localhost:3000/auth/google', '_blank', 'width=500,height=600');

    const authInterval = setInterval(() => {
      if (authWindow?.closed) {
        clearInterval(authInterval);
        window.location.reload();
      }
    }, 1000);
  };
  
  return (
    <button
      className='flex flex-row h-[28px] font-montserrat border-t-2 border-t-[#584a66]  min-w-[57px] gap-2 rounded-[3px] py-[6px] px-2 shadow-[inset_0_1px_0_hsla(0,0%,100%,.05)] bg-secondary-bkg hover:bg-secondary-comp text-description hover:text-comp-description text-[12px]'
      onClick={handleGoogleLogin}
    >
      <Image src={`/google-icon.png`} alt='google icon' width="14" height="14" /> 
      Continue with Google
    </button>
  );
};

export default GoogleButton;
