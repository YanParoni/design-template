'use client'
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
const AuthSuccess: React.FC = () => {
  const search = useSearchParams();

  useEffect(() => {
    const token = search.get('token')
    localStorage.setItem('accessToken', token as string);
    window.opener.postMessage({ token }, window.location.origin);
    window.close()
  }, []);

  return (
    <div className='w-screen h-screen bg-white'>
    </div>
  );
};

export default AuthSuccess;
