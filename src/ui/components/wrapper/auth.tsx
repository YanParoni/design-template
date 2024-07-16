import React, { useEffect, useState, useCallback } from "react";
import { useGetProfile } from "@ui/queries/user";
import { useAuthStore, useNavStore } from "client/store";
import jwt from "jsonwebtoken";

interface AuthProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const { data, isLoading, refetch } = useGetProfile(token);
  const { setAuth, setUser, setLoading, setRefetchProfile, setOauth } =
    useAuthStore();
  const { setActiveState } = useNavStore();

  const checkToken = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      const decodedToken = jwt.decode(token) as {
        needsPasswordSetup: boolean;
        oauth: boolean;
      };
      setOauth(decodedToken.needsPasswordSetup, decodedToken.oauth);
      setToken(token);
      refetch();
    } else {
      setAuth(false);
    }
  }, [refetch, setAuth, setLoading, setOauth]);

  useEffect(() => {
    checkToken();
    const handleStorageChange = () => {
      checkToken();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [checkToken, refetch, setRefetchProfile]);

  useEffect(() => {
    if (data) {
      setUser(data.data);
      setAuth(true);
      setLoading(false);
      setActiveState("logged");
    }
  }, [data, setAuth, setLoading, setUser, setActiveState]);

  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
    }
  }, [isLoading, setLoading]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  return <>{children}</>;
};

export default AuthWrapper;
