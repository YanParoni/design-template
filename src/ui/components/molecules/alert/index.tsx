import React, { useEffect } from 'react';
import { useAlertStore } from 'client/store';

const Alert: React.FC = () => {
  const { message, type, isVisible, hideAlert } = useAlertStore();

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        hideAlert();
      }, 3000); 

      return () => clearTimeout(timer);
    }
  }, [isVisible, hideAlert]);

  if (!isVisible) return null;

  return (
    <div className={`fixed top-4 left-4 z-50 p-4 rounded-lg shadow-lg ${type === 'success' ? 'bg-green-200 border-green-600 text-green-600' : 'bg-red-200 border-red-600 text-red-600'}`}>
      <p className="font-bold">{type === 'success' ? 'Success' : 'Error'}</p>
      <p>{message}</p>
    </div>
  );
};

export default Alert;
