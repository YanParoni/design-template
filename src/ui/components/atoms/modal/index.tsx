import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";
interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  children,
  title,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="bg-modal-backdrop fixed inset-0 z-50 flex w-full items-center justify-center bg-opacity-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="rounded-[6px] bg-secondary-bkg shadow-light"
            style={{ padding: "14px 20px 14px", width: "350px" }}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex justify-center pb-2">
                <img alt='playboxd logo' src="/alt-playboxd.svg" />
              </div>
              <h2 className="font-montserrat text-xl text-white">{title}</h2>
              <XMarkIcon
                className="h-5 w-5 scale-110 cursor-pointer fill-description stroke-description hover:fill-tertiary-bkg hover:stroke-white"
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
