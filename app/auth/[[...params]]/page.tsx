"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
const AuthSuccess: React.FC = () => {
  const search = useSearchParams();

  useEffect(() => {
    const token = search.get("token");
    localStorage.setItem("token", token as string);
    window.opener.postMessage({ token }, window.location.origin);
    window.close();
  }, []);

  return <div className="z-100 absolute h-screen w-screen bg-white"></div>;
};

export default AuthSuccess;
