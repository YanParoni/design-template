import React from 'react';
import NavigationLinks from '@ui/components/molecules/navbar/navigation-links';
import LoginForm from '@ui/components/molecules/navbar/login-form';
import SignUpModal from '@ui/components/molecules/navbar/sign-up-modal';
import { useAuthStore } from 'client/store';
import UserDropdown from '../user-dropdown';

const DesktopContent: React.FC = () => {

  const { activeState, setActiveState, logout, } = useAuthStore();

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
      {activeState === 'login' && (
        <LoginForm isVisible={true} onCloseClick={handleCloseClick} />
      )}
      {activeState === 'signup' && (
        <SignUpModal isVisible={true} onClose={handleCloseModal} />
      )}
      <UserDropdown/>
    </>
  );
};

export default DesktopContent;
