'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@ui/components/atoms/button';
import Input from '@ui/components/atoms/input';
import GoogleButton from '@ui/components/atoms/google-button';
import { XMarkIcon } from '@heroicons/react/24/solid';
import Modal from '@ui/components/organisms/modal';

const Navbar: React.FC = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [showNavigation, setShowNavigation] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSignInClick = () => {
    setShowNavigation(false);
    setTimeout(() => setIsLoginVisible(true), 200); 
  };

  const handleCloseClick = () => {
    setIsLoginVisible(false);
    setTimeout(() => setShowNavigation(true), 200);
  };
  const handleCreateAccountClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  return (
    <header className="bg-dark-background text-primary-color flex justify-center">
      <nav className="max-w-[960px] w-full px-4 md:px-0 bg-dark-background h-[72px] flex items-center">
        <div className="flex justify-between items-center w-full">
          <div className="text-white tracking-wide text-[24px] font-montserrat font-semibold cursor-pointer">
            Playboxd
          </div>
          <div className="flex space-x-4">
            <AnimatePresence>
              {showNavigation && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex space-x-4"
                >
                  <motion.a
                    href="#"
                    className="font-montserrat font-semibold text-description hover:text-white text-[14px]"
                    onClick={handleSignInClick}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    SIGN IN
                  </motion.a>
                  <motion.a
                    href="#"
                    className="font-montserrat font-semibold text-description hover:text-white text-[14px]"
                    onClick={handleCreateAccountClick}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    CREATE ACCOUNT
                  </motion.a>
                  <motion.a
                    href="#"
                    className="font-montserrat font-semibold text-description hover:text-white text-[14px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    GAMES
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {isLoginVisible && (
                <motion.div
                  className="flex space-x-4 items-end"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <XMarkIcon
                    className="w-6 h-6 fill-description stroke-description hover:stroke-white hover:fill-description"
                    onClick={handleCloseClick}
                  />
                  <div className="w-[120px]">
                    <Input
                      label="Username"
                      variant="primary"
                      onChange={(e) => { }}
                    />
                  </div>
                  <div className="w-[120px]">
                    <Input
                      label="Password"
                      variant="primary"
                      onChange={(e) => {  }}
                    />
                  </div>
                  <div className="flex flex-col justify-end">
                    <Button
                      label="sign in"
                      variant="primary"
                      onClick={() => console.log('hello')}
                    />
                  </div>
                  <div className="flex items-center justify-center">
        <h1 className="text-description text-center">---- or ----</h1>
      </div>
                  <GoogleButton />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
      <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
        <h2 className="text-white text-xl font-montserrat mb-4">Create Account</h2>
      </Modal>
    </header>
  );
};

export default Navbar;
