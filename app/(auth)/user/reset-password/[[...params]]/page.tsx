'use client';
import React, { useState, useEffect } from 'react';
import Input from '@ui/components/atoms/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRequestReset, useResetPassword, useValidateToken } from '@ui/queries/auth';

const ResetPassword = () => {
  const router = useRouter();
  const [firstPass, setFirstPass] = useState('');
  const [secondPass, setSecondPass] = useState('');
  const search = useSearchParams();
  const [token, setToken] = useState('');
  const { mutateAsync: validateToken } = useValidateToken();
  const { mutateAsync: resetPassword } = useResetPassword();

  useEffect(() => {
    const tokenFromUrl = search.get('token');
    if (!tokenFromUrl) {
      alert('Invalid or expired token');
      return router.push('/games');
    }
    setToken(tokenFromUrl);

    const validate = async () => {
      try {
        const response = await validateToken(tokenFromUrl);
        if (!response.valid) {
          alert(response.message);
          router.push('/games');
        }
      } catch (error) {
        console.error('Error validating token', error);
        alert('Invalid or expired token');
        router.push('/games');
      }
    };

    validate();
  }, [router, search, validateToken]);

  const handleSubmit = async () => {
    if (firstPass !== secondPass) {
      alert('Passwords do not match');
      return;
    }

    try {
      await resetPassword({ token, newPassword: secondPass });
      alert('Password reset successfully');
      router.push('/sign-in');
    } catch (error) {
      console.error('Error resetting password', error);
      alert('Failed to reset password');
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center sm:items-center">
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 rounded-lg bg-[#775677] sm:h-80 sm:w-[495px] sm:justify-start sm:gap-4 sm:p-6">
        <div className="flex flex-col sm:px-8">
          <h1 className="text-center text-xl font-bold text-white sm:mb-4 sm:text-2xl">Reset password</h1>
          <div className="flex flex-col items-center gap-8 sm:gap-2 sm:p-2">
            <p className="text-balance max-w-sm px-10 text-center text-xs text-[#e7cbed] sm:text-base">
              {`Reset the Letterboxd password for `}
            </p>
            <div className="w-2/3 pb-4 pt-2">
              <Input
                label="New Password"
                variant="primary"
                value={firstPass}
                onChange={(e) => setFirstPass(e.target.value)}
              />
              <Input
                label="Confirm Password"
                variant="primary"
                value={secondPass}
                onChange={(e) => setSecondPass(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="absolute bottom-0 mt-2 h-11 w-full rounded-b-lg bg-accent-theme py-2 text-xs font-bold text-comp-description shadow-light transition duration-200 hover:bg-accent-theme-comp sm:h-14 sm:border-t-[2px] sm:border-t-[#f481f2] sm:text-[16px]"
        >
          RESET PASSWORD
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
