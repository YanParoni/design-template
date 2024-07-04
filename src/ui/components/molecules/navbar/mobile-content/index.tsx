import React from 'react';
import {
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { useAuthStore } from 'client/store';
import UserLockIcon from '@ui/components/atoms/navbar/user-lock-icon';
import { KeyIcon,  } from '@heroicons/react/24/solid';

const MobileContent: React.FC = () => {
  const { activeState, setActiveState, isAuthenticated, logout } =
    useAuthStore();

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
        <UserIcon
          className="w-5 h-5 text-white cursor-pointer"
          onClick={handleLogout}
        />
      ) : (
        <>
          {activeState === 'login' ? (
            <XMarkIcon
              className="w-5 h-5 text-white cursor-pointer"
              onClick={handleCloseModal}
            />
          ) : (
            <>
              <UserLockIcon
                className="w-7 h-w-7 fill-white cursor-pointer"
                onClick={handleSignInClick}
              />
            </>
          )}
          <KeyIcon
            className="w-5 h-w-5 fill-white cursor-pointer"
            onClick={handleCreateAccountClick}
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-w-5 stroke-white cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </>
      )}
    </div>
  );
};

export default MobileContent;
