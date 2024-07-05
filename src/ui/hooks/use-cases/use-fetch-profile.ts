import { useEffect, useState } from "react";
import { useAuthStore } from "client/store";
import { getProfile } from "@ui/queries/user";

const useFetchProfile = () => {
  const [user, setUser] = useState(null);
  const { isAuthenticated, login, logout, setActiveState } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const fetchProfile = async () => {
      if (token) {
        try {
          const profile = await getProfile(token);
          setUser(profile);
          login(token, profile);
          setActiveState("logged");
        } catch (error) {
          console.error("Failed to fetch profile", error);
          logout();
          setActiveState("default");
        }
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [isAuthenticated, login, logout, setActiveState]);

  return { user };
};

export default useFetchProfile;
