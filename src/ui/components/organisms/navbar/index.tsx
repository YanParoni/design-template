'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useDeviceDetect from '@ui/hooks/use-device-detect';
import Logo from '@ui/components/atoms/logo';
import NavigationLinks from '@ui/components/molecules/navigation-links';
import LoginForm from '@ui/components/molecules/login-form';
import SignUpModal from '@ui/components/molecules/sign-up-modal';
import { AcademicCapIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useAuthStore } from 'client/store';
import { getProfile } from '@ui/queries/user';

const Navbar: React.FC = () => {
  const [user, setUser] = useState()
  const [activeState, setActiveState] = useState<'default' | 'login' | 'signup'| 'logged'>('default');
  const { isMobile } = useDeviceDetect();
  const { isAuthenticated, login, logout } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      login(token);
      const fetchProfile = async () => {
        try {
          const profile = await getProfile(token);
          console.log(profile); 
          setUser(profile)
          setActiveState('logged');
        } catch (error) {
          console.error('Failed to fetch profile', error);
          logout();
          setActiveState('default');
        }
      };
      fetchProfile()
      setActiveState('logged')
    }
  }, [ ]);

   useEffect(()=>{
    console.log(user)
   },[user])
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
    setActiveState('default');
    logout();
  };

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem('accessToken', token);
    login(token);
    setActiveState('logged');
  };



  const renderExpandedContent = () => (
    <AnimatePresence>
      {isMobile && activeState !== 'default' && (
        <motion.div
          className="w-full flex flex-col items-center justify-start bg-dark-background z-50 pb-5"
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          transition={{ duration: 0 }}
        >
          {activeState === 'login' && <LoginForm isVisible={true} onCloseClick={handleCloseClick} onLoginSuccess={handleLoginSuccess} />}
          {activeState === 'signup' && <SignUpModal isVisible={true} onClose={handleCloseModal} />}
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderDesktopContent = () => (
    <>
      {activeState === 'default' && (
        <NavigationLinks
          onSignInClick={handleSignInClick}
          onCreateAccountClick={handleCreateAccountClick}
          isVisible={activeState === 'default'}
        />
      )}
      {activeState === 'login' && (
        <LoginForm isVisible={true} onCloseClick={handleCloseClick} onLoginSuccess={handleLoginSuccess} />
      )}
      {activeState === 'signup' && <SignUpModal isVisible={true} onClose={handleCloseModal} />}
      {isAuthenticated && (
        <div className="flex items-center space-x-4">
          <button className="text-white" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </>
  );

  const renderMobileIcons = () => (
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
  
  return (
    <header className="bg-dark-background text-primary-color flex flex-col items-center">
      <nav className="max-w-[960px] w-full px-4 md:px-0 bg-dark-background h-[72px] flex items-center">
        <div className="flex justify-between items-center w-full">
          <Logo />
          <div className="flex space-x-4">
            {isMobile ? renderMobileIcons() : renderDesktopContent()}
          </div>
        </div>
      </nav>
      {renderExpandedContent()}
    </header>
  );
};

export default Navbar;
