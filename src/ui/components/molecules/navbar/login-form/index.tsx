// src/components/molecules/login-form.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@ui/components/atoms/button';
import Input from '@ui/components/atoms/input';
import GoogleButton from '@ui/components/atoms/google-button';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useLogin } from '@ui/queries/auth'; 
import { useAuthStore } from 'client/store';
interface LoginFormProps {
  onCloseClick: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onCloseClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutateAsync } = useLogin();
  const { activeState, setActiveState } = useAuthStore();

  const handleLogin = async () => {
    try {
      await mutateAsync({ email, password });
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleGoogleLogin = () => {
    const authWindow = window.open('http://localhost:3000/auth/google', '_blank', 'width=500,height=600');

    const authInterval = setInterval(() => {
      if (authWindow?.closed) {
        clearInterval(authInterval);
        window.location.reload();
      }
    }, 1000);
  };

  return (
    <AnimatePresence>
      {activeState === 'login' && (
        <motion.div
          className="flex flex-col  lg:flex-row  space-x-2 space-y-2  lg:space-y-0 items-start lg:items-end px-8 lg:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <XMarkIcon
            className="hidden lg:block w-5 h-5  cursor-pointer fill-description stroke-description hover:stroke-white hover:fill-description"
            onClick={onCloseClick}
          />
          <div className="w-screen pr-6 lg:pr-0 lg:w-[150px]">
            <Input label="Username" variant="primary" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="w-screen pr-6 lg:pr-0 lg:w-[150px]">
            <Input forgottenLabel type='password' label="Password" variant="primary" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className='flex flex-row py-2 pr-4  lg:py-0 justify-between  w-screen lg:w-fit lg:gap-2'>
            <div className="flex flex-col justify-end">
              <Button label="sign in" variant="primary" onClick={handleLogin} />
            </div>
            <div className="flex items-center justify-center">
              <h1 className="text-description text-center">---or---</h1>
            </div>
            <GoogleButton onClick={handleGoogleLogin} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoginForm;
