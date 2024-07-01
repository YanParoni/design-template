import { useEffect, useState } from 'react';
import { useAuthStore } from 'client/store';
import { getProfile } from '@ui/queries/user';

const useFetchProfile = () => {
  const [user, setUser] = useState(null);
  const { isAuthenticated, login, logout } = useAuthStore();
  const [activeState, setActiveState] = useState<'default' | 'login' | 'signup' | 'logged'>('default');

  useEffect(() => {
    const token = localStorage.getItem('accessToken')

    const fetchProfile = async () => {
      if (token) {
        try {
          const profile = await getProfile(token);
          setUser(profile);
          login(token, profile);
          setActiveState('logged');
        } catch (error) {
          console.error('Failed to fetch profile', error);
          logout();
          setActiveState('default');
        }
      }
    };

    if ( token) {
      fetchProfile();
    }
  }, [isAuthenticated, login, logout]);

  return { user, activeState, setActiveState };
};

export default useFetchProfile;
