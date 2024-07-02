import React from 'react';
import NavigationLinks from '@ui/components/molecules/navbar/navigation-links';
import LoginForm from '@ui/components/molecules/navbar/login-form';
import SignUpModal from '@ui/components/molecules/navbar/sign-up-modal';
import { useAuthStore } from 'client/store';

const DesktopContent: React.FC = () => {

  const { activeState, setActiveState } = useAuthStore();

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

  return (
    <>
        <NavigationLinks
          onSignInClick={handleSignInClick}
          onCreateAccountClick={handleCreateAccountClick}
        />
      {activeState === 'login' && (
        <LoginForm isVisible={true} onCloseClick={handleCloseClick} />
      )}
      {activeState === 'signup' && (
        <SignUpModal isVisible={true} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default DesktopContent;
