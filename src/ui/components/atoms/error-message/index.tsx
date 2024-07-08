import './styles.css'
import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="sp right">
      <XMarkIcon className="h-4 w-4 text-red-400 inline-block mr-1" />
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
