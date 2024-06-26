import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-dark-background rounded-md"
            style={{ padding: '22px 36px 26px', width: '420px' }}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <div className="flex justify-end">
              <XMarkIcon
                className="w-6 h-6 fill-description stroke-description hover:stroke-white hover:fill-description cursor-pointer"
                onClick={onClose}
              />
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
