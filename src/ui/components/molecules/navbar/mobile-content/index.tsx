import React from 'react';
import { AcademicCapIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useAuthStore } from 'client/store';


const MobileContent: React.FC = () => {
  const { activeState, setActiveState, isAuthenticated, logout } = useAuthStore();

  const handleSignInClick = () => {
    setTimeout(() => setActiveState('login'), 200);
  };


  const handleCreateAccountClick = () => {
    setActiveState('signup');
  };

  const handleCloseModal = () => {
    setActiveState('default');
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setActiveState('default');
    logout();
  };

  return (
    <div className="flex items-center space-x-4">
      {isAuthenticated ? (
        <UserIcon className="w-6 h-6 text-white cursor-pointer" onClick={handleLogout} />
      ) : (
        <>
          {activeState === 'login' ? (
            <XMarkIcon className="w-6 h-6 text-white cursor-pointer" onClick={handleCloseModal} />
          ) : (
            <UserIcon className="w-6 h-6 text-white cursor-pointer" onClick={handleSignInClick} />
          )}
          <AcademicCapIcon className="w-6 h-6 text-white cursor-pointer" onClick={handleCreateAccountClick} />
        </>
      )}
    </div>
  );
};

export default MobileContent;
