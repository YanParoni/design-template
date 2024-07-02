import React from 'react';
import NavigationLinks from '@ui/components/molecules/navbar/navigation-links';
import LoginForm from '@ui/components/molecules/navbar/login-form';
import SignUpModal from '@ui/components/molecules/navbar/sign-up-modal';
import { UserIcon } from '@heroicons/react/24/solid';
import { useAuthStore } from 'client/store';


const DesktopContent: React.FC = () => {
  const { activeState, setActiveState, isAuthenticated, logout, user } = useAuthStore();

  const handleSignInClick = () => {
    setTimeout(() => setActiveState('login'), 200);
  };

  const handleCloseClick = () => {
    setTimeout(() => setActiveState('default'), 300);
  };

  const handleCreateAccountClick = () => {
    setActiveState('signup');
  };

  const handleCloseModal = () => {
    setActiveState('default');
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    logout();
    setActiveState('default');
  };
  
  return (
    <>
      {activeState === 'default' && (
        <NavigationLinks
          onSignInClick={handleSignInClick}
          onCreateAccountClick={handleCreateAccountClick}
          isVisible={activeState === 'default'}
        />
      )}
      {activeState === 'login' && <LoginForm isVisible={true} onCloseClick={handleCloseClick} />}
      {activeState === 'signup' && <SignUpModal isVisible={true} onClose={handleCloseModal} />}
      {isAuthenticated && (
        <div className="flex items-center space-x-4">

          <UserIcon className="w-6 h-6 text-white cursor-pointer" onClick={handleLogout} />
          <button className="text-white" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </>
  );
};

export default DesktopContent;
