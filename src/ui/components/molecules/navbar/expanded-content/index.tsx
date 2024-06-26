import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from '@ui/components/molecules/navbar/login-form';
import SignUpModal from '@ui/components/molecules/navbar/sign-up-modal';
import { useAuthStore } from 'client/store';
import useDeviceDetect from '@ui/hooks/use-device-detect';


const ExpandedContent: React.FC = () => {
  const { activeState, setActiveState } = useAuthStore();
  const { isMobile } = useDeviceDetect();

  const handleCloseClick = () => {
    setTimeout(() => setActiveState('default'), 300);
  };

  const handleCloseModal = () => {
    setActiveState('default');
  };

  return (
    <AnimatePresence>
      {isMobile && activeState !== 'default' && (
        <motion.div
          className="w-full flex flex-col items-center justify-start bg-dark-background z-50 pb-5"
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          transition={{ duration: 0 }}
        >
          {activeState === 'login' && <LoginForm isVisible={true} onCloseClick={handleCloseClick} />}
          {activeState === 'signup' && <SignUpModal isVisible={true} onClose={handleCloseModal} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExpandedContent;
