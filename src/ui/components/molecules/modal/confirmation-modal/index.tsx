import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Button from "@ui/components/atoms/button";

interface ConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className="z-60 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-80 rounded-lg bg-white p-4 shadow-lg"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
        >
          <XMarkIcon
            className="absolute right-2 top-2 h-5 w-5 cursor-pointer"
            onClick={onCancel}
          />
          <h2 className="mb-4 text-xl font-bold">Discard changes?</h2>
          <p className="mb-4">
            You have unsaved changes, are you sure you want to discard them?
          </p>
          <div className="flex justify-end gap-2">
            <Button
              label="Cancel"
              onClick={onCancel}
              variant="secondary"
              pill
            />
            <Button
              label="Discard"
              onClick={onConfirm}
              variant="primary"
              pill
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmationModal;
